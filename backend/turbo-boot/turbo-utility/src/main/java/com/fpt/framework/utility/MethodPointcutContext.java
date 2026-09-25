package com.fpt.framework.utility;

import lombok.Data;
import reactor.core.publisher.Mono;
import reactor.util.context.Context;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MethodPointcutContext {
    public static final String METHOD_POINTCUT_CONTEXT_KEY = "Method-Pointcut-execution";

    public static Mono<MethodStack> currentMethodStack() {
        return Mono
                .deferContextual(Mono::just)
                .filter(ct -> ct.hasKey(METHOD_POINTCUT_CONTEXT_KEY)).map(ct
                        -> ct.get(METHOD_POINTCUT_CONTEXT_KEY)).cast(MethodStack.class);
    }

    public static Context appendCurrentMethod(Method method, Context context) {
        List<Method> existing = context.hasKey(METHOD_POINTCUT_CONTEXT_KEY)
                ? context.<MethodStack>get(METHOD_POINTCUT_CONTEXT_KEY).getStack()
                : List.of();

        List<Method> newList = new ArrayList<>(existing.size() + 1);
        newList.addAll(existing);
        newList.add(method);

        MethodStack newStack = new MethodStack();
        newStack.setStack(Collections.unmodifiableList(newList));
        return context.put(METHOD_POINTCUT_CONTEXT_KEY, newStack);
    }

    @Data
    public static class MethodStack {
        private List<Method> stack = new ArrayList<>();
    }
}
