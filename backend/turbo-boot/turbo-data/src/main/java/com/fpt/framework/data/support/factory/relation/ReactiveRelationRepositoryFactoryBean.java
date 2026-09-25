package com.fpt.framework.data.support.factory.relation;

import lombok.Getter;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.data.r2dbc.repository.support.R2dbcRepositoryFactoryBean;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.core.support.RepositoryFactorySupport;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ReactiveRelationRepositoryFactoryBean<T extends Repository<S, ID>, S, ID extends Serializable>
        extends R2dbcRepositoryFactoryBean<T, S, ID> implements ApplicationContextAware {

    @Getter
    private final Class<? extends T> repositoryInterface;

    private List<ReactiveRelationQueryBuilder> queryBuilders = new ArrayList<>();


    public ReactiveRelationRepositoryFactoryBean(Class<? extends T> repositoryInterface) {
        super(repositoryInterface);
        this.repositoryInterface = repositoryInterface;
    }

    @Override
    protected RepositoryFactorySupport getFactoryInstance(R2dbcEntityOperations operations) {
        return new ReactiveRelationRepositoryFactory(operations, queryBuilders);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        Map<String, ReactiveRelationQueryBuilder> builders =
                applicationContext.getBeansOfType(ReactiveRelationQueryBuilder.class, true, false);
        this.queryBuilders = builders.values().stream().toList();
    }
}
