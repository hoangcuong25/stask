package com.fpt.framework.data.support.factory.nonerelation;

import lombok.Getter;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.data.mongodb.repository.support.ReactiveMongoRepositoryFactoryBean;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.core.support.RepositoryFactorySupport;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ReactiveNoneRelationRepositoryFactoryBean<T extends Repository<S, ID>, S, ID extends Serializable>
        extends ReactiveMongoRepositoryFactoryBean<T, S, ID> implements ApplicationContextAware {

    @Getter
    private final Class<? extends T> repositoryInterface;

    private List<ReactiveNoneRelationQueryBuilder> queryBuilders = new ArrayList<>();


    public ReactiveNoneRelationRepositoryFactoryBean(Class<? extends T> repositoryInterface) {
        super(repositoryInterface);
        this.repositoryInterface = repositoryInterface;
    }

    @Override
    protected RepositoryFactorySupport getFactoryInstance(ReactiveMongoOperations operations) {
        return new ReactiveNoneRelationRepositoryFactory(operations, queryBuilders);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        Map<String, ReactiveNoneRelationQueryBuilder> builders =
                applicationContext.getBeansOfType(ReactiveNoneRelationQueryBuilder.class, true, false);
        this.queryBuilders = builders.values().stream().toList();
    }
}
