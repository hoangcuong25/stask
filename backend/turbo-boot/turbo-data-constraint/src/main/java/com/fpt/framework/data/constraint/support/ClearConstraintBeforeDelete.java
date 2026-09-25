package com.fpt.framework.data.constraint.support;

import com.fpt.framework.data.constraint.annotation.DataConstraint;
import com.fpt.framework.data.constraint.exception.DeleteDataExceptionCauseConstraint;
import com.fpt.framework.data.constraint.model.DeleteConstraintRequest;
import com.fpt.framework.data.constraint.service.DataConstraintService;
import com.fpt.framework.data.support.callback.ReactiveBeforeDeleteExecution;
import com.fpt.framework.utility.ReflectionFieldUtility;
import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.util.ReflectionUtils;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ClearConstraintBeforeDelete implements ReactiveBeforeDeleteExecution {

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
        if (entityClass.equals(com.fpt.framework.data.constraint.repository.entity.DataConstraint.class)) {
            return Mono.just(true);
        }
        List<String> usageTypes = new ArrayList<>();
        ReflectionUtils.doWithFields(entityClass, field -> {
            DataConstraint dataConstraint = field.getDeclaredAnnotation(DataConstraint.class);
            if (dataConstraint != null) {
               String usageType = dataConstraint.usageType();
                usageTypes.add(usageType);
            }

        }, field -> field.isAnnotationPresent(DataConstraint.class));
        if (usageTypes.isEmpty()) {
            return Mono.justOrEmpty(true);
        }

        return reactiveMongoTemplate.find(query, entityClass, collectionName)
                .map(deleted -> {
                    Document document = new Document();
                    document.putAll((Map<? extends String, ?>) mongoConverter.convertToMongoType(deleted));
                    return document.getObjectId("_id").toString();
                }).flatMap(id -> {
                    DeleteConstraintRequest deleteConstraintRequest = new DeleteConstraintRequest();
                    deleteConstraintRequest.setUsageId(String.valueOf(id));
                    deleteConstraintRequest.setUsageTypes(usageTypes);
                    return dataConstraintService.deleteConstraint(deleteConstraintRequest);
                });
    }
}
