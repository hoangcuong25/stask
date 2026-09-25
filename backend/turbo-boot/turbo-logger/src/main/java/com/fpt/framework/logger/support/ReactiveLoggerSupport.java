package com.fpt.framework.logger.support;

import com.fpt.framework.utility.MethodPointcuts;
import lombok.Getter;
import org.aopalliance.aop.Advice;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.aop.Pointcut;
import org.springframework.aop.PointcutAdvisor;
import org.springframework.aop.framework.AopInfrastructureBean;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.core.Ordered;
import org.springframework.core.ReactiveAdapter;
import org.springframework.core.ReactiveAdapterRegistry;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


public abstract class ReactiveLoggerSupport<A extends Annotation> implements Ordered, MethodInterceptor, PointcutAdvisor, AopInfrastructureBean {

    public static final String LOG_START = "###START: %s";

    public static final String LOG_END = "###END: %s";
    @Getter
    private final Pointcut pointcut;

    private final Class<A> annotationPointcut;

    @Getter
    private int order;

    private ApplicationContext applicationContext;


    public ReactiveLoggerSupport(Class<A> annotationPointcut, ApplicationContext applicationContext) {
        this.order = Ordered.HIGHEST_PRECEDENCE;
        this.applicationContext = applicationContext;
        this.annotationPointcut = annotationPointcut;
        this.pointcut = buildPointcut();
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
    public Object invoke(MethodInvocation mi) {
        Method method = mi.getMethod();
        Class<?> type = method.getReturnType();
        ReactiveAdapter adapter = ReactiveAdapterRegistry.getSharedInstance().getAdapter(type);
        if (MethodPointcuts.isMultiValue(type, adapter)) {
            return Flux.deferContextual(contextView -> ((Flux<?>) processWithLog(mi, method))
                    .doOnNext(data -> this.traceReturnData(method, data))
                    .doOnComplete(() -> logEnd(method)).doAfterTerminate(MDC::clear)
            );
        } else {
            return Mono.deferContextual(contextView -> ((Mono<?>) processWithLog(mi, method))
                    .doOnNext(data -> this.traceReturnData(method, data))
                    .doOnSuccess(s -> logEnd(method)).doAfterTerminate(MDC::clear)
            );
        }
    }

    private <T> T processWithLog(MethodInvocation mi, Method method) {
        logStart(method);
        this.traceArguments(mi, method);
        return MethodPointcuts.proceed(mi);
    }

    private Pointcut buildPointcut() {
        return MethodPointcuts.forAnnotations(findBootPackage(), this.annotationPointcut);
    }

    protected void logStart(Method method) {
        writeLog(method, LOG_START.formatted(method.getName()));
    }

    protected void logEnd(Method method) {
        writeLog(method, LOG_END.formatted(method.getName()));
    }

    protected abstract void writeLog(Method method, String message);

    protected Logger getLog(Method method) {
        Logger log = LoggerFactory.getLogger(method.getDeclaringClass());
        return log;
    }

    protected void traceArguments(MethodInvocation mi, Method method) {
        Logger log = this.getLog(method);
        if (log.isTraceEnabled()) {
            List<String> args = Arrays.stream(mi.getArguments()).map(r -> {
                        if (r == null) {
                            return "null";
                        }
                        return r.toString();
                    }
            ).collect(Collectors.toList());
            log.trace("%s (%s)".formatted(method.getName(), String.join(",", args)));
        }
    }

    protected void traceReturnData(Method method, Object data) {
        Logger log = this.getLog(method);
        if (log.isTraceEnabled()) {
            log.trace("%s() Return Data:[%s]".formatted(
                    method.getName(), data));
        }
    }
}
