package com.fpt.framework.kafka.producer.configuration;

import com.fpt.framework.kafka.producer.support.ReactiveKafkaSpeakerAnnotationBeanPostProcessor;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Mono;
import reactor.kafka.sender.SenderRecord;

@Configuration
public class ProducerAutoConfiguration {

    @Bean
    public ReactiveKafkaSpeakerAnnotationBeanPostProcessor reactiveKafkaSpeakerAnnotationBeanPostProcessor() {
        return new ReactiveKafkaSpeakerAnnotationBeanPostProcessor();
    }

    @Bean
    @ConditionalOnMissingBean
    public ProducerReactiveInterceptor producerReactiveInterceptor() {
        return new ProducerReactiveInterceptor() {
            @Override
            public <K, V, T> Mono<SenderRecord<K, V, T>> intercept(SenderRecord<K, V, T> record) {
                return Mono.just(record);
            }
        };
    }
}
