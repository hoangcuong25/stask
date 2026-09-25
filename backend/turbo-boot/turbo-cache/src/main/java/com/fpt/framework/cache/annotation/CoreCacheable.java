package com.fpt.framework.cache.annotation;


import org.springframework.aot.hint.annotation.Reflective;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.concurrent.TimeUnit;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@Reflective
public @interface CoreCacheable {

    boolean userCache() default false;

    ExpireConfig expire();


    @Target({ElementType.TYPE, ElementType.METHOD})
    @Retention(RetentionPolicy.RUNTIME)
    @Inherited
    @Documented
    @Reflective
    public @interface ExpireConfig {
        long expireAfterWrite();
        TimeUnit unit() default TimeUnit.MINUTES;
    }
}
