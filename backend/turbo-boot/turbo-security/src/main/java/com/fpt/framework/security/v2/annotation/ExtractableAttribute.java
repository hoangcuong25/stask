package com.fpt.framework.security.v2.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ExtractableAttribute {
	String name() default "";

	String property() default "";

	boolean deep() default false;

	boolean includeNull() default false;
}
