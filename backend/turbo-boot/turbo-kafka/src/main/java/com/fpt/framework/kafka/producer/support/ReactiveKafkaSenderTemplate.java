package com.fpt.framework.kafka.producer.support;

import com.fpt.framework.kafka.producer.configuration.ProducerReactiveInterceptor;
import lombok.Setter;
import org.springframework.kafka.core.reactive.ReactiveKafkaProducerTemplate;
import reactor.core.publisher.Mono;
import reactor.kafka.sender.SenderOptions;
import reactor.kafka.sender.SenderRecord;
import reactor.kafka.sender.SenderResult;

public class ReactiveKafkaSenderTemplate<K, V> extends ReactiveKafkaProducerTemplate<K, V> {

    @Setter
    private ProducerReactiveInterceptor producerInterceptor;
    public ReactiveKafkaSenderTemplate(SenderOptions<K, V> senderOptions) {
        super(senderOptions);
    }

    @Override
    public <T> Mono<SenderResult<T>> send(SenderRecord<K, V, T> record) {
        if (null != producerInterceptor) {
            return this.producerInterceptor.intercept(record).flatMap(r -> super.send(r));
        }
        return super.send(record);
    }
}
