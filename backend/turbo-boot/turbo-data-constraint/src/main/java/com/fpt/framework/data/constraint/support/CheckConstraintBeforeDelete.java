package com.fpt.framework.data.constraint.support;

import com.fpt.framework.data.constraint.exception.DeleteDataExceptionCauseConstraint;
import com.fpt.framework.data.constraint.repository.entity.DataConstraint;
import com.fpt.framework.data.constraint.service.DataConstraintService;
import com.fpt.framework.data.support.callback.ReactiveBeforeDeleteExecution;
import org.bson.Document;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.data.mongodb.core.query.Query;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

public class CheckConstraintBeforeDelete implements ReactiveBeforeDeleteExecution {

    @Autowired
    @Lazy
    private DataConstraintService dataConstraintService;

    @Autowired
    @Lazy
    private ReactiveMongoTemplate reactiveMongoTemplate;

    @Autowired
    @Lazy
    private MongoConverter mongoConverter;

    @Override
    public Publisher onBeforeDelete(String collectionName, Query query, Class entityClass) {
        if (entityClass.equals(DataConstraint.class)) {
            return Mono.just(true);
        }

        return reactiveMongoTemplate.find(query, entityClass, collectionName)
                .map(deleted -> {
                        Document document = new Document();
                        document.putAll((Map<? extends String, ?>) mongoConverter.convertToMongoType(deleted));
                        return document.getObjectId("_id").toString();
                }).collectList().flatMap(deleteIds -> dataConstraintService.hasConstraint((List<String>) deleteIds).map(hasConstraint -> {
                    if (hasConstraint) {
                        throw new DeleteDataExceptionCauseConstraint(deleteIds.toString(),
                                "Could not delete cause resource is usage.");
                    }
                    return true;
                }));
    }
}
