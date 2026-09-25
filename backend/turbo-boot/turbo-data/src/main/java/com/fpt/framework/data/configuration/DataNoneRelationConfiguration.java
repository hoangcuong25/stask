package com.fpt.framework.data.configuration;

import com.fpt.framework.data.support.ConditionEnableTransaction;
import com.fpt.framework.data.support.nonerelation.ReactiveNoneRelationTemplate;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.ReactiveMongoDatabaseFactory;
import org.springframework.data.mongodb.ReactiveMongoTransactionManager;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.convert.NoOpDbRefResolver;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

@Configuration
@ConditionalOnBean(ReactiveMongoDatabaseFactory.class)
public class DataNoneRelationConfiguration {

    @Bean
    public ReactiveMongoTemplate reactiveMongoTemplate(ReactiveMongoDatabaseFactory dbFactory) {
        return new ReactiveNoneRelationTemplate(dbFactory);
    }

    @Bean
    public MappingMongoConverter mappingMongoConverter(ReactiveMongoDatabaseFactory databaseFactory,
                                                       MongoCustomConversions customConversions, MongoMappingContext mappingContext) {
        MappingMongoConverter converter = new MappingMongoConverter(NoOpDbRefResolver.INSTANCE, mappingContext);
        converter.setCustomConversions(customConversions);
        converter.setCodecRegistryProvider(databaseFactory);
        return converter;
    }

    @Bean
    @Conditional(ConditionEnableTransaction.class)
    public ReactiveMongoTransactionManager reactiveMongoTransactionManager(ReactiveMongoDatabaseFactory dbFactory) {
        return new ReactiveMongoTransactionManager(dbFactory);
    }
}
