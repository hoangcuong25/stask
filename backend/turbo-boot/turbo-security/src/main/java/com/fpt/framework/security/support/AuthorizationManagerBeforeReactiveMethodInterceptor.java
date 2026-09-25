package com.fpt.framework.security.support;

import com.fpt.framework.security.model.PermissionScope;
import com.fpt.framework.security.model.UserPrincipal;
import com.fpt.framework.security.support.annotation.HasPermission;
import com.fpt.framework.utility.MethodPointcuts;
import com.fpt.framework.utility.ReflectionFieldUtility;
import com.fpt.framework.utility.expression.ExpressionEvaluation;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
import org.aopalliance.aop.Advice;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.apache.commons.lang3.StringUtils;
import org.reactivestreams.Publisher;
import org.springframework.aop.Pointcut;
import org.springframework.aop.PointcutAdvisor;
import org.springframework.aop.framework.AopInfrastructureBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.ReactiveAdapter;
import org.springframework.core.ReactiveAdapterRegistry;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authorization.method.AuthorizationInterceptorsOrder;
import org.springframework.util.Assert;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.context.Context;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Getter
@Log4j2
public class AuthorizationManagerBeforeReactiveMethodInterceptor implements Ordered, MethodInterceptor,
        PointcutAdvisor, AopInfrastructureBean {

    private static final Pattern MATCHER_REGEX_PARAM = Pattern.compile("\\(\\s*'(?<resource>[^',]+)'\\s*,\\s*'(?<action>[^',]+)'");

    private final Pointcut pointcut;

    @Autowired
    private AuthorizationService authorizationService;

    @Setter
    private int order;

    public static AuthorizationManagerBeforeReactiveMethodInterceptor preAuthorize() {
        AuthorizationManagerBeforeReactiveMethodInterceptor interceptor
                = new AuthorizationManagerBeforeReactiveMethodInterceptor(
                MethodPointcuts.forAnnotations(PreAuthorize.class, HasPermission.class));
        interceptor.setOrder(AuthorizationInterceptorsOrder.PRE_AUTHORIZE.getOrder());
        return interceptor;
    }

    public AuthorizationManagerBeforeReactiveMethodInterceptor(Pointcut pointcut) {
        this.order = AuthorizationInterceptorsOrder.FIRST.getOrder();
        Assert.notNull(pointcut, "pointcut cannot be null");
        this.pointcut = pointcut;
    }

    @Override
    public Object invoke(MethodInvocation mi) throws Exception {
        Method method = mi.getMethod();
        Class<?> type = method.getReturnType();
        ReactiveAdapter adapter = ReactiveAdapterRegistry.getSharedInstance().getAdapter(type);
        AuthorizationContext.AuthorPolicy authorPolicy = getAuthorPolicy(mi);
        String resource = authorPolicy.getResource();
        String action = authorPolicy.getAction();

        if (null == resource) {
            return MethodPointcuts.proceed(mi);
        }
        Object result;
        Mono<List<PermissionScope>> permissionScopes = authorizationService.getPermissionScopes(resource, action);
        if (MethodPointcuts.isMultiValue(type, adapter)) {
            result = processFluxWithPermit(mi, permissionScopes, authorPolicy);
        } else {
            result = processMonoWithPermit(mi, permissionScopes, authorPolicy);
        }
        return adapter != null ? adapter.fromPublisher((Publisher<?>) result) : result;
    }

    private Object buildSecurityExpressionContext(MethodInvocation mi) {
        Method method = mi.getMethod();
        var parameters = method.getParameters();
        Object[] args = mi.getArguments();
        Map<String, Object> context = new HashMap<>();
        for (int i = 0, length = parameters.length; i < length; i++) {
            context.put(parameters[i].getName(), args[i]);
        }
        return context;
    }

    private String resolveParameterSecurityExpression(Object securityContext, String rawParam) {
        if (rawParam == null) {
            return rawParam;
        }
        if (rawParam.startsWith("#")) {
            rawParam = rawParam.replaceAll("#", "");
            Object eval = ExpressionEvaluation.evaluate(securityContext, rawParam);
            return eval.toString();
        }
        return rawParam;
    }

    private String resolveAuthorParameter(Object securityContext, String expression) {
        if (StringUtils.isBlank(expression)) {
            return expression;
        }
        String regex = "(?<=['\\s])[^'\\s]+(?=['\\s])";
        expression = expression.trim();
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(expression);

        StringBuffer result = new StringBuffer();
        if (expression.contains(" ")) {
            while (matcher.find()) {
                String word = matcher.group();

                String convertedWord = resolveParameterSecurityExpression(securityContext, word);

                matcher.appendReplacement(result, convertedWord);
            }
            matcher.appendTail(result);
        } else {
            result.append(resolveParameterSecurityExpression(securityContext, expression));
        }

        return result.toString();
    }

    private AuthorizationContext.AuthorPolicy getAuthorPolicy(MethodInvocation mi) {
        var method = mi.getMethod();
        PreAuthorize preAuthorize = method.getDeclaredAnnotation(PreAuthorize.class);
        HasPermission hasPermission = AnnotationUtils.findAnnotation(method, HasPermission.class);
        AuthorizationContext.AuthorPolicy authorPolicy = new AuthorizationContext.AuthorPolicy();
        boolean autoFilter = true;
        String resource = null;
        String action = null;
        String postAuthor = null;
        boolean autoPostAuthor = false;
        if (null != hasPermission) {
            resource = hasPermission.resource();
            action = hasPermission.action();
            autoFilter = hasPermission.autoFilter();
            postAuthor = hasPermission.postAuthor();
            autoPostAuthor = hasPermission.autoPostFilter();
        } else if (null != preAuthorize) {
            String expression = preAuthorize.value();
            Matcher matcher = MATCHER_REGEX_PARAM.matcher(expression);
            if (matcher.find()) {
                resource = matcher.group("resource");
                action = matcher.group("action");
            }
        }
        Object securityExpressionContext = buildSecurityExpressionContext(mi);
        resource = resolveAuthorParameter(securityExpressionContext, resource);
        action = resolveAuthorParameter(securityExpressionContext, action);
        postAuthor = resolveAuthorParameter(securityExpressionContext, postAuthor);


        authorPolicy.setResource(resource);
        authorPolicy.setAction(action);
        authorPolicy.setPostAuthor(postAuthor);

        authorPolicy.setAutoFilter(autoFilter);
        authorPolicy.setAutoPostAuthor(autoPostAuthor);
        return authorPolicy;
    }

    private Flux<?> processFluxWithPermit(MethodInvocation mi, Mono<List<PermissionScope>> permissionScopes,
                                          AuthorizationContext.AuthorPolicy authorPolicy) {

        return AuthenticationContext.currentUserPrincipal()
                .zipWith(permissionScopes)
                .switchIfEmpty(Mono.error(new AccessDeniedException("Access Denied")))
                .flatMapMany(zip -> {
                    UserPrincipal userPrincipal = zip.getT1();
                    List<PermissionScope> scopes = zip.getT2();
                    if (scopes.isEmpty()) {
                        return Mono.error(new AccessDeniedException("Access Denied"));
                    }
                    var flux = Flux.defer(() -> MethodPointcuts.proceed(mi));
                    if (authorPolicy.isAutoPostAuthor() || StringUtils.isNotBlank(authorPolicy.getPostAuthor())) {
                        flux = flux.filter(data -> isAllowAccessData(data, authorPolicy, scopes, userPrincipal));
                    }
                    return flux;
                }).contextWrite(context -> setCurrentAuthorPolicy(authorPolicy, context));
    }

    private Mono<?> processMonoWithPermit(MethodInvocation mi, Mono<List<PermissionScope>> permissionScopes,
                                          AuthorizationContext.AuthorPolicy authorPolicy) {



        return AuthenticationContext.currentUserPrincipal()
                .zipWith(permissionScopes)
                .switchIfEmpty(Mono.error(new AccessDeniedException("Access Denied")))
                .flatMap(zip -> {
                        UserPrincipal userPrincipal = zip.getT1();
                        List<PermissionScope> scopes = zip.getT2();
                        if (scopes.isEmpty()) {
                            return Mono.error(new AccessDeniedException("Access Denied"));
                        }
                        return Mono.defer(() -> MethodPointcuts.proceed(mi))
                                .doOnNext(data -> verifyAccessData(data, authorPolicy, scopes, userPrincipal));
                }).contextWrite(context -> setCurrentAuthorPolicy(authorPolicy, context));
    }

    private void verifyAccessData(Object object, AuthorizationContext.AuthorPolicy authorPolicy,
                                  List<PermissionScope> scopes, UserPrincipal userPrincipal) {
        String postAuthor = authorPolicy.getPostAuthor();
        if (StringUtils.isNotBlank(postAuthor)) {
            boolean isAllowed = (Boolean) ExpressionEvaluation.evaluate(object, postAuthor);
            if (isAllowed) {
                return;
            }
        }
        if (authorPolicy.isAutoPostAuthor()) {
            if (checkHasPermissionInScope(object, scopes, userPrincipal)) {
                return;
            }
            throw new AccessDeniedException("Not allow access this resource");
        }
    }

    private boolean isAllowAccessData(Object object, AuthorizationContext.AuthorPolicy authorPolicy,
                                      List<PermissionScope> scopes, UserPrincipal userPrincipal) {
        String postAuthor = authorPolicy.getPostAuthor();
        if (StringUtils.isNotBlank(postAuthor)) {
            boolean isAllowed = (Boolean) ExpressionEvaluation.evaluate(object, postAuthor);
            return isAllowed;
        }
        if (authorPolicy.isAutoPostAuthor()) {
            if (checkHasPermissionInScope(object, scopes, userPrincipal)) {
                return true;
            }
        }

        return true;
    }

    private static boolean checkHasPermissionInScope(Object object, List<PermissionScope> scopes, UserPrincipal userPrincipal) {
        for (PermissionScope permissionScope : scopes) {
            try {
                Object targetValue = ReflectionFieldUtility.getValueField(object, permissionScope.getTarget());
                boolean isAllowed = permissionScope.hasPermit(permissionScope.getTarget(),
                        String.valueOf(targetValue), userPrincipal);
                if (isAllowed) {
                    return true;
                }
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        }
        return false;
    }

    private Context setCurrentAuthorPolicy(AuthorizationContext.AuthorPolicy authorPolicy, Context context) {
        return AuthorizationContext.setCurrentAuthorPolicy(authorPolicy, context);
    }


    @Override
    public Advice getAdvice() {
        return this;
    }
}
