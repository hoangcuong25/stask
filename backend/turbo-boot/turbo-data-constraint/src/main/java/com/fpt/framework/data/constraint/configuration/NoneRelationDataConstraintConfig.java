package com.fpt.framework.data.constraint.configuration;

import com.fpt.framework.data.constraint.service.DataConstraintService;
import com.fpt.framework.data.constraint.service.impl.DataConstraintServiceImpl;
import com.fpt.framework.data.constraint.support.CheckConstraintBeforeDelete;
import com.fpt.framework.data.constraint.support.ClearConstraintBeforeDelete;
import com.fpt.framework.data.constraint.support.CreateConstraintAfterSaveCallBack;
import com.mongodb.reactivestreams.client.MongoClient;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

@ConditionalOnClass(MongoClient.class)
@EnableReactiveMongoRepositories(value ="com.fpt.framework.data.constraint.repository", createIndexesForQueryMethods = true)
public class NoneRelationDataConstraintConfig {
    @Bean
    @ConditionalOnMissingBean
    public DataConstraintService dataConstraintService() {
        return new DataConstraintServiceImpl();
    }

    @Bean
    public CreateConstraintAfterSaveCallBack createConstraintAfterSaveCallBack() {
        return new CreateConstraintAfterSaveCallBack();
    }
    @Bean
    @Order(1)
    public CheckConstraintBeforeDelete checkConstraintBeforeDelete() {
        return new CheckConstraintBeforeDelete();
    }
    @Bean
    @ConditionalOnBean(CheckConstraintBeforeDelete.class)
    @Order(2)
    public ClearConstraintBeforeDelete clearConstraintBeforeDelete() {
        return new ClearConstraintBeforeDelete();
    }
}
