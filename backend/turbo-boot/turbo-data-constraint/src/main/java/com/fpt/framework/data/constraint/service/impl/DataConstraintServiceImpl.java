package com.fpt.framework.data.constraint.service.impl;

import com.fpt.framework.data.constraint.exception.InvalidUsageIdException;
import com.fpt.framework.data.constraint.model.BatchUpsertConstraintRequest;
import com.fpt.framework.data.constraint.model.DeleteConstraintRequest;
import com.fpt.framework.data.constraint.model.UpsertConstraintRequest;
import com.fpt.framework.data.constraint.repository.DataConstraintRepository;
import com.fpt.framework.data.constraint.repository.entity.DataConstraint;
import com.fpt.framework.data.constraint.service.DataConstraintService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

public class DataConstraintServiceImpl implements DataConstraintService {

    @Autowired
    private DataConstraintRepository dataConstraintRepository;

    @Override
    public Mono<Boolean> hasConstraint(String resourceId) {
        return dataConstraintRepository.findByResourceId(resourceId).hasElements();
    }

    @Override
    public Mono<Boolean> hasConstraint(List<String> resourceIds) {
        return dataConstraintRepository.findByResourceIdIn(resourceIds).hasElements();
    }

    @Override
    public Flux<DataConstraint> readConstraint(String resourceId) {
        return dataConstraintRepository.findByResourceId(resourceId);
    }

    @Override
    public Mono<Void> upsertConstraint(String resourceId, UpsertConstraintRequest upsertConstraintRequest) {
        String oldUsage = upsertConstraintRequest.getOldUsage();
        String newUsage = upsertConstraintRequest.getNewUsage();
        String usageType = upsertConstraintRequest.getUsageType();
        if (StringUtils.isBlank(resourceId)) {
            throw new RuntimeException("Resource Id is blank");
        }
        if (StringUtils.isBlank(newUsage)) {
            // delete data constraint
            return dataConstraintRepository.findByResourceIdAndUsageTypeAndUsageId(resourceId, usageType, oldUsage)
                    .next()
                    .flatMap(data -> dataConstraintRepository.delete(data));
        }
        if (StringUtils.equals(oldUsage, newUsage)) {
            throw new InvalidUsageIdException("Have no change for usage");
        }
        // upsert for new usage
        return dataConstraintRepository.findByResourceIdAndUsageTypeAndUsageId(resourceId, usageType, newUsage)
                .next()
                .switchIfEmpty(Mono.defer(() -> {
                    DataConstraint constraint = new DataConstraint();
                    constraint.setResourceId(resourceId);
                    constraint.setUsageId(newUsage);
                    constraint.setUsageType(usageType);
                    return Mono.just(constraint);
                })).flatMap(data -> dataConstraintRepository.save(data).then());
    }

    @Override
    public Mono<Void> upsertConstraint(BatchUpsertConstraintRequest upsertConstraintRequest) {
        List<String> resources = upsertConstraintRequest.getResources();
        String usageId = upsertConstraintRequest.getUsageId();
        String usageType = upsertConstraintRequest.getUsageType();
        var upsert = dataConstraintRepository.removeByUsageIdAndUsageType(usageId, usageType);
        if (resources != null && resources.size() > 0 ) {
            var dataConstraints = resources.stream().map(r -> {
                var data = new DataConstraint();
                data.setUsageType(usageType);
                data.setResourceId(r);
                data.setUsageId(usageId);
                return data;
            }).collect(Collectors.toList());
            return upsert.flatMap(deleted -> dataConstraintRepository.insert(dataConstraints).then());
        }
        return upsert.then();

    }

    @Override
    public Mono<Void> deleteConstraint(DeleteConstraintRequest deleteConstraintRequest) {
        String usageId = deleteConstraintRequest.getUsageId();
        List<String> usageTypes = deleteConstraintRequest.getUsageTypes();
        return dataConstraintRepository.removeByUsageIdAndUsageTypeIn(usageId, usageTypes).then();
    }
}
