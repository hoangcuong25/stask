package com.fpt.framework.utility;

import lombok.Getter;
import org.aopalliance.aop.Advice;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.aop.Pointcut;
import org.springframework.aop.PointcutAdvisor;
import org.springframework.aop.framework.AopInfrastructureBean;
import org.springframework.beans.BeansException;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.Ordered;
import org.springframework.core.ReactiveAdapter;
import org.springframework.core.ReactiveAdapterRegistry;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.Map;


public class ReactiveMethodContextSupport<A extends Annotation> implements Ordered, MethodInterceptor,
        PointcutAdvisor, AopInfrastructureBean, ApplicationContextAware {

    @Getter
    private Pointcut pointcut;

    @Getter
    private int order;

    private ApplicationContext applicationContext;

    public ReactiveMethodContextSupport() {
        this.order = HIGHEST_PRECEDENCE;
    }

    @Override
    public Advice getAdvice() {
        return this;
    }

    private String findBootPackage() {
        Map<String, Object> annotatedBeans = applicationContext.getBeansWithAnnotation(SpringBootApplication.class);
        return annotatedBeans.isEmpty() ? null : annotatedBeans.values().toArray()[0].getClass().getPackageName();
    }

    @Override
    public Object invoke(MethodInvocation mi) throws Throwable {
        Method method = mi.getMethod();
        Class<?> type = method.getReturnType();
        ReactiveAdapter adapter = ReactiveAdapterRegistry.getSharedInstance().getAdapter(type);

        if (MethodPointcuts.isMultiValue(type, adapter)) {
            return Flux.defer(() -> MethodPointcuts.proceed(mi))
                    .contextWrite(context -> MethodPointcutContext.appendCurrentMethod(method, context));
        } else {
            return Mono.defer(() -> MethodPointcuts.proceed(mi))
                    .contextWrite(context -> MethodPointcutContext.appendCurrentMethod(method, context));
        }
    }

    private Pointcut buildPointcut() {
        return MethodPointcuts.forPackage(findBootPackage());
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
        this.pointcut = buildPointcut();
    }
}
