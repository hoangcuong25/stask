package com.fpt.framework.data.support;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;
import org.springframework.core.type.StandardAnnotationMetadata;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.Objects;

@Slf4j
public class ConditionEnableTransaction implements Condition {
	@Override
	public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
		String[] beanDefinitionNames = Objects.requireNonNull(context.getBeanFactory()).getBeanDefinitionNames();

		for (String beanName : beanDefinitionNames) {
			BeanDefinition beanDefinition = context.getBeanFactory().getBeanDefinition(beanName);
			if (beanDefinition.getSource() instanceof StandardAnnotationMetadata metadataSource) {
				if (metadataSource.getIntrospectedClass().isAnnotationPresent(EnableTransactionManagement.class)) {
					log.trace("Enable configuration: Transaction management");
					return true;
				}
			}
		}
		log.warn("Not enable transaction management. Consider add @EnableTransactionManagement in your configuration");
		return false;
	}
}
