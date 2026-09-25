package com.fpt.framework.utility;

import org.springframework.core.type.AnnotationMetadata;

public class AnnotationUtility {

    public static <T> Object getAttributes(Class<?> clazz, Class<T> annotationTarget, String key) {
       return AnnotationMetadata.introspect(clazz).getAnnotationAttributes(annotationTarget.getName()).get(key);
    }
}
