package com.fpt.framework.logger.support;

import io.micrometer.context.ContextRegistry;
import lombok.RequiredArgsConstructor;
import org.slf4j.MDC;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import reactor.core.publisher.Hooks;

import java.util.function.Consumer;
import java.util.function.Supplier;

@RequiredArgsConstructor
public class ReactiveMDCRegistry  {


    private final LogLayoutConvertor logLayoutConvertor;

    @EventListener(ApplicationReadyEvent.class)
    public void register() {
        Hooks.enableAutomaticContextPropagation();
        logLayoutConvertor.convertorMap().forEach((key, contextResolver) -> registerMDC(key, contextResolver));
    }

    public static void registerMDC(String mdcKey, LogContextConvertor contextResolver) {
        Supplier<Object> getMDC = () -> MDC.get(mdcKey);
        Consumer<Object> putMDC = (value) -> {
            if (!(value instanceof String)) {
                value  = contextResolver.resolve(value);
            }
            MDC.put(mdcKey, value.toString());

        };
        Runnable removeMDC = () -> MDC.remove(mdcKey);
        ContextRegistry.getInstance()
                .registerThreadLocalAccessor(mdcKey, getMDC, putMDC, removeMDC);
    }
}
