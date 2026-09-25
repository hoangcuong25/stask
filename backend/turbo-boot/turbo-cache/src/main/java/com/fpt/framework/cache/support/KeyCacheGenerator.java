package com.fpt.framework.cache.support;

import com.fpt.framework.cache.annotation.MemoryCacheable;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.util.StringUtils;

import java.lang.reflect.Method;

public class KeyCacheGenerator implements KeyGenerator {

    public Object generate(Object target, Method method, Object... params) {
        return target.getClass().getSimpleName() + "_"
                + method.getName() + "_"
                + StringUtils.arrayToDelimitedString(params, "_");
    }
    protected boolean isUserCache(Method method) {
        MemoryCacheable memoryCacheable = method.getDeclaredAnnotation(MemoryCacheable.class);
        if (null != memoryCacheable && memoryCacheable.userCache()) {
            return true;
        }
        return false;
    }

}
