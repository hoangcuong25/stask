package com.fpt.framework.data.dql.annotation;

import com.fpt.framework.data.dql.configuration.DqlAutoConfiguration;
import org.springframework.context.annotation.Import;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(DqlAutoConfiguration.class)
public @interface EnableDqlQuery {
}
