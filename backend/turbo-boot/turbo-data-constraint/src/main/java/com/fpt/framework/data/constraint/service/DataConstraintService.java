package com.fpt.framework.data.constraint.service;

import com.fpt.framework.data.constraint.model.BatchUpsertConstraintRequest;
import com.fpt.framework.data.constraint.model.DeleteConstraintRequest;
import com.fpt.framework.data.constraint.model.UpsertConstraintRequest;
import com.fpt.framework.data.constraint.repository.entity.DataConstraint;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface DataConstraintService {

    Mono<Boolean> hasConstraint(String resourceId);


    Mono<Boolean> hasConstraint(List<String> resourceIds);

    Flux<DataConstraint> readConstraint(String resourceId);

    Mono<Void> upsertConstraint(String resourceId, UpsertConstraintRequest upsertConstraintRequest);

    Mono<Void> upsertConstraint(BatchUpsertConstraintRequest upsertConstraintRequest);

    Mono<Void> deleteConstraint(DeleteConstraintRequest deleteConstraintRequest);
}
