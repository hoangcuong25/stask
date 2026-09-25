package com.fpt.framework.security.support;

import com.fpt.framework.security.support.annotation.IgnoreSecureAutoFilter;
import com.fpt.framework.utility.MethodPointcuts;
import lombok.Getter;
import lombok.Setter;
import org.aopalliance.aop.Advice;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.reactivestreams.Publisher;
import org.springframework.aop.Pointcut;
import org.springframework.aop.PointcutAdvisor;
import org.springframework.aop.framework.AopInfrastructureBean;
import org.springframework.core.Ordered;
import org.springframework.core.ReactiveAdapter;
import org.springframework.core.ReactiveAdapterRegistry;
import org.springframework.security.authorization.method.AuthorizationInterceptorsOrder;
import org.springframework.util.Assert;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.lang.reflect.Method;
import java.util.regex.Pattern;

@Getter
public class AuthorizationManagerBetweenReactiveMethodInterceptor implements Ordered, MethodInterceptor,
        PointcutAdvisor, AopInfrastructureBean {

    private static final Pattern MATCHER_REGEX_PARAM = Pattern.compile("\\(\\s*'(?<resource>[^',]+)'\\s*,\\s*'(?<action>[^',]+)'");

    private final Pointcut pointcut;

    @Setter
    private int order;

    public static AuthorizationManagerBetweenReactiveMethodInterceptor betweenAuthorize() {
        AuthorizationManagerBetweenReactiveMethodInterceptor interceptor
                = new AuthorizationManagerBetweenReactiveMethodInterceptor(
                MethodPointcuts.forAnnotations(IgnoreSecureAutoFilter.class));
        interceptor.setOrder(AuthorizationInterceptorsOrder.PRE_AUTHORIZE.getOrder());
        return interceptor;
    }

    public AuthorizationManagerBetweenReactiveMethodInterceptor(Pointcut pointcut) {
        this.order = AuthorizationInterceptorsOrder.FIRST.getOrder();
        Assert.notNull(pointcut, "pointcut cannot be null");
        this.pointcut = pointcut;
    }

    @Override
    public Object invoke(MethodInvocation mi) throws Exception {
        Method method = mi.getMethod();
        Class<?> type = method.getReturnType();
        ReactiveAdapter adapter = ReactiveAdapterRegistry.getSharedInstance().getAdapter(type);

        Object result;
        if (MethodPointcuts.isMultiValue(type, adapter)) {
            result = AuthorizationContext.currentAuthorPolicy().flatMapMany(authorPolicy -> {
                authorPolicy.setAutoFilter(false);
                return Flux.defer(() -> MethodPointcuts.proceed(mi));
            });
        } else {
            result = AuthorizationContext.currentAuthorPolicy().map(authorPolicy -> {
                authorPolicy.setAutoFilter(false);
                return Mono.defer(() -> MethodPointcuts.proceed(mi));
            });
        }
        return adapter != null ? adapter.fromPublisher((Publisher<?>) result) : result;
    }


    @Override
    public Advice getAdvice() {
        return this;
    }
}
