package com.fpt.framework.kafka.producer.configuration;

import reactor.core.publisher.Mono;
import reactor.kafka.sender.SenderRecord;

public interface ProducerReactiveInterceptor {

    <K,V,T> Mono<SenderRecord<K, V, T>> intercept(SenderRecord<K, V, T> record);
}
