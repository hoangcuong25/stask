package com.fpt.framework.data.support.callback;

import org.reactivestreams.Publisher;
import org.springframework.data.mongodb.core.query.Query;

@FunctionalInterface
public interface ReactiveBeforeDeleteExecution<T>{
    Publisher<T> onBeforeDelete(String collectionName, Query query, Class<T> entityClass);
}