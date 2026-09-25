package com.fpt.framework.logger.support;

import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Method;

@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.REACTIVE)
public class ReactiveLoggerSupportRestController extends ReactiveLoggerSupport<RestController> {

    public ReactiveLoggerSupportRestController(ApplicationContext applicationContext) {
        super(RestController.class, applicationContext);
    }


    @Override
    protected void writeLog(Method method, String message) {
        this.getLog(method).info(message);
    }
}