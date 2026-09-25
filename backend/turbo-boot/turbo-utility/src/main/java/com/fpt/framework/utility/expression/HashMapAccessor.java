package com.fpt.framework.utility.expression;

import org.springframework.expression.AccessException;
import org.springframework.expression.EvaluationContext;
import org.springframework.expression.PropertyAccessor;
import org.springframework.expression.TypedValue;

import java.util.HashMap;

public class HashMapAccessor implements PropertyAccessor {

    @Override
    public Class<?>[] getSpecificTargetClasses() {
        return new Class[]{HashMap.class};
    }

    @Override
    public boolean canRead(EvaluationContext context, Object target, String name) throws AccessException {
        return ((HashMap<?, ?>) target).containsKey(name);
    }

    @Override
    public TypedValue read(EvaluationContext context, Object target, String name) throws AccessException {
        return new TypedValue(((HashMap<?, ?>) target).get(name));
    }

    @Override
    public boolean canWrite(EvaluationContext context, Object target, String name) throws AccessException {
        return true;
    }

    @Override
    public void write(EvaluationContext context, Object target, String name, Object newValue) throws AccessException {
        ((HashMap<Object, Object>) target).put(name, newValue);
    }
}