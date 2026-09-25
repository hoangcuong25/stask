package com.fpt.framework.kafka.producer.support;

import com.fpt.framework.kafka.producer.annotation.ReactiveKafkaProducer;
import com.fpt.framework.kafka.producer.configuration.ProducerReactiveInterceptor;
import com.fpt.framework.utility.ReactiveApplication;
import lombok.extern.log4j.Log4j2;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.boot.ssl.DefaultSslBundleRegistry;
import org.springframework.core.Ordered;
import org.springframework.kafka.core.reactive.ReactiveKafkaProducerTemplate;
import org.springframework.kafka.support.serializer.JsonSerializer;
import org.springframework.util.ReflectionUtils;
import reactor.kafka.sender.SenderOptions;

import java.util.Map;

@Log4j2
public class ReactiveKafkaSpeakerAnnotationBeanPostProcessor implements BeanPostProcessor, Ordered {

    @Autowired
    private KafkaProperties properties;

    @Value("${spring.kafka.client-id:}")
    private String prefixClientId;

    @Value(value = "${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Value(value = "${spring.kafka.max.request.size:1048576}")
    private Long maxRequestSize;

    @Autowired
    private ProducerReactiveInterceptor producerReactiveInterceptor;

    @Autowired
    private ReactiveApplication reactiveApplication;

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        ReflectionUtils.doWithFields(bean.getClass(), field -> {
            try {
                String packageName = bean.getClass().getPackageName();
                String uniqueName = reactiveApplication.applicationUnique(packageName);
                ReflectionUtils.makeAccessible(field);
                ReactiveKafkaProducerTemplate<String, ?> reactiveKafkaProducerTemplate
                        = createBeanReactiveKafkaProducerTemplate(properties, uniqueName);
                ReflectionUtils.setField(field, bean, reactiveKafkaProducerTemplate);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }, f -> f.getAnnotation(ReactiveKafkaProducer.class) != null);


        return bean;
    }

    private <T> ReactiveKafkaProducerTemplate<String, T> createBeanReactiveKafkaProducerTemplate(
            KafkaProperties props,
            String uniqueName
    ) {
        Map<String, Object> config = props.buildProducerProperties(new DefaultSslBundleRegistry());
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        config.put(ProducerConfig.CLIENT_ID_CONFIG, prefixClientId + uniqueName);
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        config.put(ProducerConfig.MAX_REQUEST_SIZE_CONFIG, String.valueOf(maxRequestSize));
        ReactiveKafkaSenderTemplate kafkaProducerTemplate = new ReactiveKafkaSenderTemplate(
                SenderOptions.create(config)
        );
        kafkaProducerTemplate.setProducerInterceptor(producerReactiveInterceptor);
        return kafkaProducerTemplate;
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
