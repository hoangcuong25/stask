package com.fpt.framework.utility;

import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.Map;

public class ReflectionFieldUtility {

    public static Object getValueField(Object object, String fieldName) throws IllegalAccessException {
        if (object instanceof Map<?,?> map) {
            return map.get(fieldName);
        }
        Field field = ReflectionUtils.findField(object.getClass(), fieldName);
        field.setAccessible(true);
        return field.get(object);
    }
}
