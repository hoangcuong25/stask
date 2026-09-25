package com.fpt.framework.data.dql.support;

import com.fpt.framework.data.dql.annotation.EnableDqlQuery;
import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;

import java.util.Map;

public class ConditionEnableDql implements Condition {

	@Override
	public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
		Map<String, Object> beanEnableConfig = context.getBeanFactory().getBeansWithAnnotation(EnableDqlQuery.class);
		return !beanEnableConfig.isEmpty();
	}
}
