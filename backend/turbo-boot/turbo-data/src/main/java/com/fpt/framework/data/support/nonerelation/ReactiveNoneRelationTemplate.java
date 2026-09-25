package com.fpt.framework.data.support.nonerelation;

import com.fpt.framework.data.support.callback.ReactiveBeforeDeleteExecution;
import com.mongodb.client.result.DeleteResult;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.data.mongodb.ReactiveMongoDatabaseFactory;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Collection;

public class ReactiveNoneRelationTemplate extends ReactiveMongoTemplate {

    private Collection<ReactiveBeforeDeleteExecution> reactiveBeforeDeleteExecutions;

    public ReactiveNoneRelationTemplate(ReactiveMongoDatabaseFactory mongoDatabaseFactory) {
        super(mongoDatabaseFactory);
    }

    @Override
    protected <T> Mono<DeleteResult> doRemove(String collectionName, Query query, Class<T> entityClass) {
        if (reactiveBeforeDeleteExecutions != null) {
            Mono<?> beforeDelete = null;
            for (ReactiveBeforeDeleteExecution reactiveBeforeDeleteExecution: reactiveBeforeDeleteExecutions) {
                var executor = reactiveBeforeDeleteExecution.onBeforeDelete(collectionName, query, entityClass);
                if (executor instanceof Flux<?> flux) {
                    executor =  flux.collectList();
                }
                if (executor instanceof Mono<?> mono) {
                    if (beforeDelete == null) {
                        beforeDelete = mono;
                    } else {
                        beforeDelete = beforeDelete.flatMap(d -> mono);
                    }
                }
            }
            if (beforeDelete != null) {
                return beforeDelete.flatMap(object -> super.doRemove(collectionName, query, entityClass));
            }
        }

        return super.doRemove(collectionName, query, entityClass);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        super.setApplicationContext(applicationContext);
        reactiveBeforeDeleteExecutions = applicationContext.getBeansOfType(ReactiveBeforeDeleteExecution.class).values();
    }
}
