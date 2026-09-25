package com.fpt.framework.data.constraint.support;

import com.fpt.framework.data.constraint.annotation.DataConstraint;
import com.fpt.framework.data.constraint.exception.ConstraintIsNotSupportException;
import com.fpt.framework.data.constraint.model.BatchUpsertConstraintRequest;
import com.fpt.framework.data.constraint.service.DataConstraintService;
import com.fpt.framework.utility.ObjectUtility;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.mongodb.core.mapping.event.ReactiveAfterSaveCallback;
import org.springframework.util.ReflectionUtils;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Log4j2
public class CreateConstraintAfterSaveCallBack implements ReactiveAfterSaveCallback<Object> {

    @Autowired
    @Lazy
    private DataConstraintService dataConstraintService;

    @Override
    public Publisher<Object> onAfterSave(Object entity, Document document, String collection) {
        if (entity.getClass().equals(com.fpt.framework.data.constraint.repository.entity.DataConstraint.class)) {
            return Mono.justOrEmpty(entity);
        }
        log.trace("After save entity: {} at collection {}", entity, collection);
        // Implement dynamic logic here, e.g., inspecting entity class or fields
        String usageId = document.getObjectId("_id").toString();
        List<Mono<Void>> batchUpsertConstraints = new ArrayList<>();
        List<String> resourceIds = new ArrayList<>();
        ReflectionUtils.doWithFields(entity.getClass(), field -> {
            BatchUpsertConstraintRequest batchUpsertConstraintRequest = new BatchUpsertConstraintRequest();
            batchUpsertConstraintRequest.setUsageId(usageId);
            DataConstraint dataConstraint = field.getDeclaredAnnotation(DataConstraint.class);
            if (dataConstraint != null) {
                field.setAccessible(true);
                Object resourceObject =  field.get(entity);
                if (null != resourceObject) {
                    String resourceIdPath = dataConstraint.resourceIdPath();
                    if (resourceObject instanceof Collection<?> list) {
                        log.trace("Handle constraint for multiple");
                        if (StringUtils.isBlank(resourceIdPath)) {
                            log.trace("resourceIdPath is blank. Try to add set constraint for resource {}", list);
                            for (Object resource: list) {
                                appendResourceId(resource, resourceIds);
                            }
                        } else {
                            log.trace("Have config resourceIdPath. Try to resolve resourceId");
                            for (Object resource: list) {
                                appendResourceId(resource, resourceIds, resourceIdPath);
                            }
                        }
                    } else {
                        log.trace("Resource object is not collection {}", resourceObject);
                        if (StringUtils.isBlank(resourceIdPath)) {
                            log.trace("resourceIdPath is blank. Try to add set constraint for resource {}", resourceObject);
                            appendResourceId(resourceObject, resourceIds);
                        } else {
                            log.trace("Have config resourceIdPath. Try to resolve resourceId");
                            appendResourceId(resourceObject, resourceIds, resourceIdPath);
                        }
                    }
                }
                if (!resourceIds.isEmpty()) {
                    String usageType = dataConstraint.usageType();
                    batchUpsertConstraintRequest.setResources(resourceIds);
                    batchUpsertConstraintRequest.setUsageType(usageType);
                    batchUpsertConstraints.add(dataConstraintService.upsertConstraint(batchUpsertConstraintRequest));
                }

            }

        }, field -> field.isAnnotationPresent(DataConstraint.class));
        if (batchUpsertConstraints.isEmpty()) {
            return Mono.justOrEmpty(entity);
        }
        return Mono.when(batchUpsertConstraints).thenReturn(entity);
    }

    private static void appendResourceId(Object resourceObject, List<String> resourceIds, String resourceIdPath) {
        Object resourceIdObject = ObjectUtility.readAttributeByPath(resourceObject, resourceIdPath);
        if (null == resourceIdObject) {
            throw new RuntimeException("Could not resolve resource {} id by attribute %s".formatted(resourceObject, resourceIdPath));
        }
        resourceIds.add(resourceIdObject.toString());
    }

    private static void appendResourceId(Object resource, List<String> resourceIds) {
        if (resource instanceof  String resourceId) {
            resourceIds.add(resourceId);
        } else {
            throw new ConstraintIsNotSupportException("resourceIdPath is blank. Only support resource is string");
        }
    }
}
