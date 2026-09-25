package com.fpt.framework.kafka.consumer.support;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpt.framework.kafka.consumer.annotation.ReactiveKafkaListener;
import com.fpt.framework.kafka.consumer.configuration.ConsumerReactiveInterceptor;
import com.fpt.framework.utility.ExpressionBeanResolver;
import com.fpt.framework.utility.ReactiveApplication;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.boot.ssl.DefaultSslBundleRegistry;
import org.springframework.core.Ordered;
import org.springframework.kafka.core.reactive.ReactiveKafkaConsumerTemplate;
import org.springframework.kafka.support.JacksonUtils;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.util.ReflectionUtils;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.kafka.receiver.ReceiverOptions;
import reactor.util.retry.Retry;

import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Log4j2
public class ReactiveKafkaListenerAnnotationBeanPostProcessor implements BeanPostProcessor,
        Ordered {

    @Autowired
    private KafkaProperties properties;

    @Value("${spring.kafka.client-id:}")
    private String prefixClientId;
    @Value(value = "${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Autowired
    private ExpressionBeanResolver expressionBeanResolver;

    @Autowired
    private ConsumerReactiveInterceptor consumerReactiveInterceptor;

    @Autowired
    private ReactiveApplication reactiveApplication;

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        Method[] methods = bean.getClass().getDeclaredMethods();
        for (Method method : methods) {
            ReactiveKafkaListener reactiveKafkaListener = method.getAnnotation(ReactiveKafkaListener.class);
            if (reactiveKafkaListener != null) {
                if (method.getParameters().length < 1) {
                    throw new IllegalCallerException("Method Kafka listener must have one or more argument");
                }
                try {
                    String packageName = bean.getClass().getPackageName();
                    String uniqueName = this.reactiveApplication.applicationUnique(packageName);
                    ReflectionUtils.makeAccessible(method);
                    String groupId = reactiveKafkaListener.groupId();
                    if (StringUtils.isBlank(groupId)) {
                        groupId = uniqueName;
                    }
                    List<String> topics = resolveTopics(reactiveKafkaListener);
                    ReactiveKafkaConsumerTemplate<String, ?> reactiveKafkaConsumerTemplate
                            = buildKafkaConsumerTemplate(properties, groupId, topics, uniqueName);
                    reactiveKafkaConsumerTemplate.receive()
//                                .groupBy(message -> message.receiverOffset().topicPartition())
//                                .flatMap(partitions -> partitions.concatMap(this::process))
                            .doOnError(error -> log.error("Error receiving event, will retry", error))
                            .doOnNext(record -> {
                                log.trace("Received event topic:{}, key {}, {}", record.topic(), record.key(), record.headers());
                                try {
                                    Object recordValue = record.value();
                                    if (recordValue instanceof String) {
                                        Parameter parameter = method.getParameters()[0];
                                        Class parameterClass = parameter.getType();
                                        if (List.class.isAssignableFrom(parameterClass)) {
                                            // Get the generic type T of List<T>
                                            Type genericType = parameter.getParameterizedType();
                                            if (genericType instanceof ParameterizedType) {
                                                // Get the actual type argument (T)
                                                Type[] actualTypeArguments = ((ParameterizedType) genericType).getActualTypeArguments();

                                                if (actualTypeArguments.length == 1) {
                                                    Class<?> listType = (Class<?>) actualTypeArguments[0];

                                                    // Deserialize recordValue as List<T>
                                                    ObjectMapper objectMapper = JacksonUtils.enhancedObjectMapper();
                                                    TypeReference<?> typeReference = new TypeReference<List<?>>() {
                                                        @Override
                                                        public Type getType() {
                                                            return objectMapper.getTypeFactory().constructCollectionType(List.class, listType);
                                                        }
                                                    };

                                                    // Perform the deserialization
                                                    recordValue = objectMapper.readValue(recordValue.toString(), typeReference);
                                                }
                                            }
                                        } else if (!String.class.equals(parameterClass)) {
                                            recordValue = JacksonUtils.enhancedObjectMapper()
                                                    .readValue(recordValue.toString(), parameterClass);
                                        }
                                    }
                                    Object object = method.invoke(bean, recordValue);
                                    if (object instanceof Mono<?> mono) {
                                        mono.contextWrite(context ->
                                                        consumerReactiveInterceptor.intercept(record, context))
                                                .subscribe();
                                    } else if (object instanceof Flux<?> flux) {
                                        flux.contextWrite(context ->
                                                        consumerReactiveInterceptor.intercept(record, context))
                                                .subscribe();
                                    }
                                } catch (Exception e) {
                                    log.error("Error while receive message from topic: %s".formatted(record.topic()), e);
                                    throw new RuntimeException(e);
                                }
                            })
                            .retryWhen(Retry.fixedDelay(Long.MAX_VALUE, Duration.ofSeconds(10)))
//                .concatMap(this::handleEvent)
                            .subscribe(record -> record.receiverOffset().acknowledge());
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }
        return BeanPostProcessor.super.postProcessAfterInitialization(bean, beanName);
    }

    private <T> ReactiveKafkaConsumerTemplate<String, T> buildKafkaConsumerTemplate(KafkaProperties props,
                                                                                    String groupId,
                                                                                    List<String> topics,
                                                                                    String uniqueName
    ) {
        Map<String, Object> config = props.buildProducerProperties(new DefaultSslBundleRegistry());
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        config.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
        config.put(ConsumerConfig.CLIENT_ID_CONFIG, this.prefixClientId + uniqueName);
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        config.put(JsonDeserializer.TRUSTED_PACKAGES, "*");
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        config.put(JsonDeserializer.USE_TYPE_INFO_HEADERS, false);
        config.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        config.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 100);
        ReceiverOptions<String, T> cfg = kafkaReceiverOptions(config, topics);
        return new ReactiveKafkaConsumerTemplate<>(cfg);
    }

    private <K, V> ReceiverOptions<K, V> kafkaReceiverOptions(Map<String, Object> kafkaPropertiesMap, List<String> topics) {
        ReceiverOptions<K, V> options = ReceiverOptions.create(kafkaPropertiesMap);

        return options
//                .pollTimeout(Duration.ofMillis(1000))
                .subscription(topics);
    }


    private List<String> resolveTopics(ReactiveKafkaListener kafkaListener) {
        String[] topics = kafkaListener.topics();
        List<String> result = new ArrayList();
        if (topics.length > 0) {
            int length = topics.length;

            for (int i = 0; i < length; i++) {
                String topicExpression = topics[i];
                Object topic = this.expressionBeanResolver.resolveExpression(topicExpression);
                this.expressionBeanResolver.resolveAsString(topic, result);
            }
        }
        return result;
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
