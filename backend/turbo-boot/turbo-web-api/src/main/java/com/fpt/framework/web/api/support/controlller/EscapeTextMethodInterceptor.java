package com.fpt.framework.web.api.support.controlller;

import com.fpt.framework.web.api.support.annotation.EscapeText;
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
import org.springframework.util.Assert;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.regex.Pattern;

@Getter
public class EscapeTextMethodInterceptor implements Ordered, MethodInterceptor, PointcutAdvisor, AopInfrastructureBean {

    private final Pointcut pointcut;

    @Setter
    private int order;

    public static EscapeTextMethodInterceptor escapeText() {
        EscapeTextMethodInterceptor interceptor = new EscapeTextMethodInterceptor(
                MethodPointcuts.forArgAnnotations(EscapeText.class));
        interceptor.setOrder(Ordered.LOWEST_PRECEDENCE);
        return interceptor;
    }

    public EscapeTextMethodInterceptor(Pointcut pointcut) {
        Assert.notNull(pointcut, "pointcut cannot be null");
        this.pointcut = pointcut;
        this.order = Ordered.LOWEST_PRECEDENCE;
    }

    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        Method method = invocation.getMethod();
        Object[] args = invocation.getArguments();
        Annotation[][] parameterAnnotations = method.getParameterAnnotations();
        escapeTextArguments(args,parameterAnnotations);
        Publisher<?> publisher = MethodPointcuts.proceed(invocation);
        return publisher;
    }

    private void escapeTextArguments(Object[] args, Annotation[][] parameterAnnotations) {
        for (int i = 0; i < args.length; i++) {
            if (parameterAnnotations[i] != null) {
                for (Annotation annotation : parameterAnnotations[i]) {
                    if (annotation.annotationType().equals(EscapeText.class) && args[i] instanceof String) {
                        args[i] = escapeSpecialCharacters((String) args[i]);
                    }
                }
            }
        }
    }

    private String escapeSpecialCharacters(String input) {
        if (input == null) {
            return null;
        }
        return Pattern.quote(input);
    }

    @Override
    public Advice getAdvice() {
        return this;
    }

}
