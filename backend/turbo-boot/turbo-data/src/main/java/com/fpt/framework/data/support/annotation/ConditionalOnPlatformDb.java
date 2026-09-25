package com.fpt.framework.data.support.annotation;

import com.fpt.framework.data.support.OnPlatformDbCondition;
import org.springframework.context.annotation.Conditional;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Conditional(OnPlatformDbCondition.class)
public @interface ConditionalOnPlatformDb {
	String[] value(); // One or more platform names, e.g., "mongodb", {"mysql","clickhouse"}
}
