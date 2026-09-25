package com.fpt.framework.kafka.consumer.configuration;

import com.fpt.framework.kafka.consumer.support.ReactiveKafkaListenerAnnotationBeanPostProcessor;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Role;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ConsumerAutoConfiguration {

    @Bean
    @Role(BeanDefinition.ROLE_INFRASTRUCTURE)
    public ReactiveKafkaListenerAnnotationBeanPostProcessor reactiveKafkaListenerRegister() {
        return new ReactiveKafkaListenerAnnotationBeanPostProcessor();
    }

    @Bean
    @ConditionalOnMissingBean
    public ConsumerReactiveInterceptor consumerReactiveInterceptor() {
        return new ConsumerReactiveInterceptor() {
        };
    }
}
