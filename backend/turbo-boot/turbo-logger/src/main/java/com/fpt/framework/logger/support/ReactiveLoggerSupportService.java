package com.fpt.framework.logger.support;

import org.aopalliance.intercept.MethodInvocation;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.lang.reflect.Method;

@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.REACTIVE)
public class ReactiveLoggerSupportService extends ReactiveLoggerSupport<Service> {

    public ReactiveLoggerSupportService(ApplicationContext applicationContext) {
        super(Service.class, applicationContext);
    }

    @Override
    protected void writeLog(Method method, String message) {
        this.getLog(method).debug(message);
    }
}