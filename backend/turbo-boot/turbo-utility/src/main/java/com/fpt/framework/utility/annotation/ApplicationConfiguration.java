package com.fpt.framework.utility.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(ApplicationConfigurations.class)
public @interface ApplicationConfiguration {

    String application();

    String[] basePackages() default {};

}
