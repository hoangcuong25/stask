package com.fpt.framework.security.model;

import lombok.Data;
import org.springframework.data.mongodb.core.query.Criteria;

import java.util.List;

@Data
public class PermissionCriteria<T> {
    private String scopeOperator;
    private List<T> criterias;
}
