package com.fpt.framework.security.v2.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Can {
	String application() default "";

	String resource();

	String action();

	String objectId() default "";

	String attributes() default "";

	boolean autoFilter() default false;

	boolean postCheck() default false;
}
