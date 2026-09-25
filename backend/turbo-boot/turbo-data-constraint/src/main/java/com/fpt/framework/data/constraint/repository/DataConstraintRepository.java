package com.fpt.framework.data.constraint.repository;

import com.fpt.framework.data.constraint.repository.entity.DataConstraint;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.r2dbc.repository.Modifying;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Repository
public interface DataConstraintRepository extends ReactiveMongoRepository<DataConstraint, String> {

    Flux<DataConstraint> findByResourceId(String resourceId);

    Flux<DataConstraint> findByResourceIdAndUsageTypeAndUsageId(String resourceId, String usageType, String usageId);

    @Modifying
    Mono<Long> removeByUsageIdAndUsageType(String usageId, String usageType);

    Flux<DataConstraint> findByResourceIdIn(List<String> resourceId);

    @Modifying
    Mono<Long> removeByUsageIdAndUsageTypeIn(String usageId, List<String> usageTypes);
}
