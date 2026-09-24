package com.swork.repository;

import com.swork.model.entity.PersonalPlan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonalPlanRepository extends MongoRepository<PersonalPlan, String> {
    List<PersonalPlan> findByUserIdOrderByStartDateDesc(String userId);
}
