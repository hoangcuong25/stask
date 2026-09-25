package com.fpt.framework.data.fql.support;

import com.fpt.framework.data.fql.annotation.EnableQueryFql;
import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;

import java.util.Map;

public class ConditionEnableFql implements Condition {

    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        Map<String, Object> beanEnableConfig = context.getBeanFactory().getBeansWithAnnotation(EnableQueryFql.class);
        return beanEnableConfig.size() > 0;
    }
}
