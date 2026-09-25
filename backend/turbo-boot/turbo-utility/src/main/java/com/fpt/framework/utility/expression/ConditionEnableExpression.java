package com.fpt.framework.utility.expression;

import com.fpt.framework.utility.expression.annotation.EnableConditionalExpression;
import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;

import java.util.Map;

public class ConditionEnableExpression implements Condition {

    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        Map<String, Object> beanEnableConfig = context.getBeanFactory().getBeansWithAnnotation(EnableConditionalExpression.class);
        return beanEnableConfig.size() > 0;
    }
}
