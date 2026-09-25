package com.fpt.framework.kafka;

import com.fpt.framework.kafka.consumer.configuration.ConsumerAutoConfiguration;
import com.fpt.framework.kafka.producer.configuration.ProducerAutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@AutoConfiguration
@ConditionalOnProperty("spring.kafka.bootstrap-servers")
@Import({ConsumerAutoConfiguration.class, ProducerAutoConfiguration.class})
public class KafkaAutoConfiguration {

}
