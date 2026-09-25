package com.swork.repository;

import com.swork.model.entity.PersonalPlan;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface PersonalPlanRepository extends ReactiveMongoRepository<PersonalPlan, String> {
    Flux<PersonalPlan> findByUserIdOrderByStartDateDesc(String userId);
}
