package com.fpt.framework.security.v2.support;

import com.fpt.framework.security.support.AuthenticationContext;
import com.fpt.framework.security.support.AuthorizationContext;
import com.fpt.framework.security.v2.annotation.Can;
import com.fpt.framework.security.v2.model.AuthzRequest;
import com.fpt.framework.utility.MethodPointcuts;
import com.fpt.framework.utility.ReactiveApplication;
import com.fpt.framework.utility.expression.ExpressionEvaluation;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.aopalliance.aop.Advice;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.apache.commons.lang3.StringUtils;
import org.reactivestreams.Publisher;
import org.springframework.aop.Pointcut;
import org.springframework.aop.PointcutAdvisor;
import org.springframework.aop.framework.AopInfrastructureBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.Ordered;
import org.springframework.core.ReactiveAdapter;
import org.springframework.core.ReactiveAdapterRegistry;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authorization.method.AuthorizationInterceptorsOrder;
import org.springframework.util.Assert;
import reactor.core.publisher.Mono;
import reactor.util.context.Context;

import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Getter
public class AuthzMethodInterceptor implements Ordered, MethodInterceptor, PointcutAdvisor, AopInfrastructureBean {

	private static final Pattern VARIABLE_REF = Pattern.compile("#(\\w+)");

	private final Pointcut pointcut;

	@Autowired
	@Lazy
	private AuthorizationV2Service authzService;

	@Autowired
	@Lazy
	private ReactiveApplication reactiveApplication;

	@Autowired
	@Lazy
	private List<AttributeExtractor<?>> attributeExtractors = new ArrayList<>();

	@Autowired
	@Lazy
	private PermissionQueryResolver queryResolver;

	@Setter
	private int order;

	public AuthzMethodInterceptor(Pointcut pointcut) {
		this.order = AuthorizationInterceptorsOrder.FIRST.getOrder();
		Assert.notNull(pointcut, "pointcut cannot be null");
		this.pointcut = pointcut;
	}

	public static AuthzMethodInterceptor checkPermission() {
		AuthzMethodInterceptor interceptor = new AuthzMethodInterceptor(MethodPointcuts.forAnnotations(Can.class));
		interceptor.setOrder(AuthorizationInterceptorsOrder.PRE_AUTHORIZE.getOrder());
		return interceptor;
	}

	static void validateParameterNames(Method method, String... expressions) {
		Set<String> referenced = referencedVariables(expressions);
		referenced.remove("result");
		referenced.remove("this");

		if (referenced.isEmpty() || method.getParameterCount() == 0) {
			return;
		}

		boolean namesPresent = true;
		for (Parameter parameter : method.getParameters()) {
			if (!parameter.isNamePresent()) {
				namesPresent = false;
				break;
			}
		}

		requireParameterNames(namesPresent, method);
	}

	static void requireParameterNames(boolean namesPresent, Method method) {
		if (!namesPresent) {
			throw new IllegalStateException(
					"@Can expression references method parameters by name but parameter names are not present "
							+ "in bytecode. Compile with -parameters (method: " + method + ")");
		}
	}

	static Set<String> referencedVariables(String... expressions) {
		Set<String> names = new HashSet<>();
		for (String expression : expressions) {
			if (StringUtils.isBlank(expression)) {
				continue;
			}
			Matcher matcher = VARIABLE_REF.matcher(expression);
			while (matcher.find()) {
				names.add(matcher.group(1));
			}
		}
		return names;
	}

	@Override
	public Object invoke(MethodInvocation mi) throws Throwable {
		Method method = mi.getMethod();
		Class<?> type = method.getReturnType();
		ReactiveAdapter adapter = ReactiveAdapterRegistry.getSharedInstance().getAdapter(type);

		Can annotation = findCanAnnotation(mi);
		if (annotation == null) {
			return MethodPointcuts.proceed(mi);
		}

		String annotationApp = annotation.application();
		String action = annotation.action();
		String resourcePattern = annotation.resource();
		String objectIdExpr = annotation.objectId();
		String attrsExpr = annotation.attributes();
		boolean autoFilter = annotation.autoFilter();
		boolean postCheck = annotation.postCheck();

		validateParameterNames(method, resourcePattern, objectIdExpr, attrsExpr);

		Map<String, Object> securityContext = buildSecurityExpressionContext(mi);

		Mono<String> applicationMono = resolveApplication(annotationApp, mi.getMethod());

		Mono<String> resourceMono = applicationMono.flatMap(app -> {
			String resolvedResource = resolveParameter(securityContext, resourcePattern);
			String fullResource = buildFullResource(app, resolvedResource);
			log.debug("@Can: app={}, resource={}, action={}, autoFilter={}, objectId={}, postCheck={}",
					app, fullResource, action, autoFilter, objectIdExpr, postCheck);
			return Mono.just(fullResource);
		});

		AuthorizationContext.AuthorPolicy policy = new AuthorizationContext.AuthorPolicy();
		policy.setAction(action);
		policy.setAutoFilter(autoFilter);
		policy.setAutoPostAuthor(false);

		boolean filterAsGuard = autoFilter && StringUtils.isBlank(objectIdExpr);
		AuthzFilterContext.PreBuiltFilter filterHolder = filterAsGuard ? new AuthzFilterContext.PreBuiltFilter() : null;

		Object result = applicationMono.zipWith(resourceMono)
				.flatMap(tuple -> {
					String application = tuple.getT1();
					String fullResource = tuple.getT2();

					policy.setResource(fullResource);

					if (StringUtils.isBlank(objectIdExpr)) {
						if (autoFilter) {
							return processActionOnlyWithFilter(mi, application, action, fullResource, filterHolder);
						}
						return processActionOnly(mi, application, action, fullResource);
					} else {
						if (postCheck) {
							return processDataAwarePostCheck(mi, application, action, fullResource,
									objectIdExpr, attrsExpr, securityContext);
						} else {
							return processDataAwarePreCheck(mi, application, action, fullResource,
									objectIdExpr, attrsExpr, securityContext);
						}
					}
				})
				.contextWrite(ctx -> {
					Context withPolicy = AuthorizationContext.setCurrentAuthorPolicy(policy, ctx);
					return filterHolder != null ? AuthzFilterContext.set(filterHolder, withPolicy) : withPolicy;
				});

		return adapter != null ? adapter.fromPublisher((Publisher<?>) result) : result;
	}

	private Can findCanAnnotation(MethodInvocation mi) {
		Can annotation = AnnotationUtils.findAnnotation(mi.getMethod(), Can.class);
		if (annotation != null) {
			return annotation;
		}

		Class<?> targetClass = mi.getThis() != null
				? mi.getThis().getClass()
				: mi.getMethod().getDeclaringClass();
		return AnnotationUtils.findAnnotation(targetClass, Can.class);
	}

	private Mono<String> resolveApplication(String manualApplication, Method interceptedMethod) {
		if (StringUtils.isNotBlank(manualApplication)) {
			log.debug("Using manual application: {}", manualApplication);
			return Mono.just(manualApplication);
		}

		if (reactiveApplication != null) {
			String packageName = interceptedMethod.getDeclaringClass().getPackageName();
			return Mono.just(reactiveApplication.applicationUnique(packageName));
		}

		return Mono.just("default");
	}

	private String buildFullResource(String application, String resource) {
		if (StringUtils.isBlank(resource)) {
			return resource;
		}

		String prefix = application + ".";
		if (resource.startsWith(prefix)) {
			log.debug("Resource already has application prefix: {}", resource);
			return resource;
		}

		String fullResource = prefix + resource;
		log.debug("Built full resource: {} + {} = {}", application, resource, fullResource);
		return fullResource;
	}

	private Map<String, Object> buildSecurityExpressionContext(MethodInvocation mi) {
		Method method = mi.getMethod();
		var parameters = method.getParameters();
		Object[] args = mi.getArguments();
		Map<String, Object> context = new HashMap<>();

		for (int i = 0, length = parameters.length; i < length; i++) {
			context.put(parameters[i].getName(), args[i]);
		}

		context.put("this", mi.getThis());

		return context;
	}

	private String resolveParameter(Map<String, Object> securityContext, String expression) {
		if (StringUtils.isBlank(expression)) {
			return expression;
		}

		if (!expression.contains("#")) {
			return expression;
		}

		Object eval;
		try {
			eval = ExpressionEvaluation.evaluate(securityContext, securityContext, expression);
		} catch (Exception e) {
			throw new AccessDeniedException(
					"Access denied: failed to resolve @Can expression '" + expression + "': " + e.getMessage(), e);
		}
		return eval != null ? eval.toString() : "";
	}

	private Mono<?> processActionOnly(
			MethodInvocation mi,
			String application,
			String action,
			String objectType
	) {
		AuthzRequest request = AuthzRequest.actionOnly(
				application, action, objectType
		);

		return authzService.requirePermission(request)
				.then(Mono.defer(() -> MethodPointcuts.proceed(mi)));
	}

	private Mono<?> processActionOnlyWithFilter(
			MethodInvocation mi,
			String application,
			String action,
			String objectType,
			AuthzFilterContext.PreBuiltFilter filterHolder
	) {
		Method method = mi.getMethod();
		return AuthenticationContext.currentUserPrincipal()
				.switchIfEmpty(Mono.error(new AccessDeniedException(
						"Access denied: @Can(autoFilter=true) requires an authenticated principal")))
				.flatMap(principal -> queryResolver
						.buildFilterCriteria(application, objectType, action, principal.getUniqueName())
						.switchIfEmpty(Mono.error(new AccessDeniedException(
								"Access denied: @Can(autoFilter=true) but no PermissionQueryResolver produced "
										+ "criteria for " + objectType + " — configure a real resolver"))))
				.onErrorMap(e -> !(e instanceof AccessDeniedException),
						e -> new AccessDeniedException(
								"Access denied: failed to build filter criteria for " + objectType
										+ ": " + e.getMessage(), e))
				.flatMap(criteria -> {
					filterHolder.setCriteria(criteria);
					return Mono.defer(() -> MethodPointcuts.proceed(mi));
				})
				.doFinally(signal -> {
					if (filterHolder.getCriteria() != null && !filterHolder.isConsumed()) {
						log.warn("@Can(autoFilter=true) on {}.{} built filter criteria but no query consumed it "
										+ "via ReactivePermissionV2Query.authorizeQuery — data may be UNFILTERED",
								method.getDeclaringClass().getSimpleName(), method.getName());
					}
				});
	}

	private Mono<?> processDataAwarePostCheck(
			MethodInvocation mi,
			String application,
			String action,
			String resource,
			String objectIdExpr,
			String attrsExpr,
			Map<String, Object> securityContext
	) {
		return Mono.defer(() -> MethodPointcuts.proceed(mi))
				.flatMap(result -> {
					Map<String, Object> resultContext = new HashMap<>(securityContext);
					resultContext.put("result", result);

					String objectId = resolveParameter(resultContext, objectIdExpr);
					Map<String, String> attributes = resolveAttributesFromResult(resultContext, attrsExpr);

					log.debug("Post-check resolved: objectId={}, attributes={}", objectId, attributes);

					AuthzRequest request = AuthzRequest.dataAware(
							application, action, resource, objectId, attributes
					);

					return authzService.requirePermission(request)
							.thenReturn(result);
				});
	}

	private Mono<?> processDataAwarePreCheck(
			MethodInvocation mi,
			String application,
			String action,
			String resource,
			String objectIdExpr,
			String attrsExpr,
			Map<String, Object> securityContext
	) {
		String objectId = resolveParameter(securityContext, objectIdExpr);
		Map<String, String> attributes = resolveAttributes(securityContext, attrsExpr);

		log.debug("Pre-check resolved: objectId={}, attributes={}", objectId, attributes);

		AuthzRequest request = AuthzRequest.dataAware(
				application, action, resource, objectId, attributes
		);

		return authzService.requirePermission(request)
				.then(Mono.defer(() -> MethodPointcuts.proceed(mi)));
	}

	private Map<String, String> resolveAttributes(Map<String, Object> securityContext, String expression) {
		if (StringUtils.isBlank(expression)) {
			return Map.of();
		}

		return evaluateAttributesExpression(securityContext, expression);
	}

	private Map<String, String> resolveAttributesFromResult(Map<String, Object> contextWithResult, String expression) {
		if (StringUtils.isBlank(expression)) {
			Object result = contextWithResult.get("result");
			if (result != null) {
				Map<String, String> autoExtracted = autoExtractAttributes(result);
				log.debug("Auto-extracted {} attributes from result: {}", autoExtracted.size(), autoExtracted.keySet());
				return autoExtracted;
			}
			return Map.of();
		}

		return evaluateAttributesExpression(contextWithResult, expression);
	}

	private Map<String, String> evaluateAttributesExpression(Map<String, Object> context, String expression) {
		Object value;
		try {
			value = ExpressionEvaluation.evaluate(context, context, expression);
		} catch (Exception e) {
			throw new AccessDeniedException(
					"Access denied: failed to resolve @Can attributes expression '" + expression + "': "
							+ e.getMessage(), e);
		}

		if (!(value instanceof Map<?, ?> map)) {
			throw new AccessDeniedException(
					"Access denied: @Can attributes expression must evaluate to a Map, got "
							+ (value == null ? "null" : value.getClass().getSimpleName())
							+ ": " + expression);
		}

		Map<String, String> result = new HashMap<>();
		map.forEach((k, v) -> result.put(String.valueOf(k), v != null ? v.toString() : ""));
		return result;
	}

	@SuppressWarnings("unchecked")
	private Map<String, String> autoExtractAttributes(Object result) {
		Map<String, String> attributes = new HashMap<>();

		try {
			List<AttributeExtractor<?>> supportedExtractors = attributeExtractors.stream()
					.filter(extractor -> extractor.supports(result))
					.sorted(Comparator.comparingInt(AttributeExtractor::getOrder))
					.toList();

			if (supportedExtractors.isEmpty()) {
				log.debug("No AttributeExtractor found for type: {}", result.getClass().getSimpleName());
				return attributes;
			}

			for (AttributeExtractor extractor : supportedExtractors) {
				try {
					Map<String, String> extracted = extractor.extract(result);
					if (extracted != null && !extracted.isEmpty()) {
						attributes.putAll(extracted);
						log.trace("Extractor {} extracted {} attributes",
								extractor.getClass().getSimpleName(), extracted.size());
					}
				} catch (Exception e) {
					log.warn("Extractor {} failed for type {}: {}",
							extractor.getClass().getSimpleName(),
							result.getClass().getSimpleName(),
							e.getMessage());
				}
			}

			log.debug("Auto-extracted {} attributes from {} using {} extractors: {}",
					attributes.size(),
					result.getClass().getSimpleName(),
					supportedExtractors.size(),
					attributes.keySet());

		} catch (Exception e) {
			log.warn("Failed to auto-extract attributes from result: {}", result.getClass().getSimpleName(), e);
		}

		return attributes;
	}

	@Override
	public Advice getAdvice() {
		return this;
	}
}
