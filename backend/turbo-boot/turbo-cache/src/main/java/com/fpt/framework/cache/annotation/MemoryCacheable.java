package com.fpt.framework.cache.annotation;


import org.springframework.aot.hint.annotation.Reflective;
import org.springframework.core.annotation.AliasFor;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@Reflective
@CoreCacheable(expire = @CoreCacheable.ExpireConfig(expireAfterWrite = 1))
public @interface MemoryCacheable {
    @AliasFor(annotation = CoreCacheable.class)
    boolean userCache() default false;

    @AliasFor(annotation = CoreCacheable.class)
    CoreCacheable.ExpireConfig expire() default @CoreCacheable.ExpireConfig(expireAfterWrite = 1);
}
