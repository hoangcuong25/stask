package com.fpt.framework.security.support.data;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.core.Ordered;

import java.util.HashMap;
import java.util.Map;


@Slf4j
public class TargetScopeRelatedRegistries implements BeanPostProcessor, Ordered {


    private Map<String, TargetScopeRelatedResolver> registries = new HashMap<>();

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        if (bean instanceof TargetScopeRelatedResolver resolver) {
            this.registries.put(resolver.getTargetKey(), resolver);
        }
        return BeanPostProcessor.super.postProcessAfterInitialization(bean, beanName);
    }

    public TargetScopeRelatedResolver getTargetScopeRelatedResolver(String targetKey) {
        var resolver = this.registries.get(targetKey);
        if (resolver == null) {
            log.trace("Have no config for target scope related resolver. Use default resolver");
            resolver = () -> targetKey;
        }
        return resolver;
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
