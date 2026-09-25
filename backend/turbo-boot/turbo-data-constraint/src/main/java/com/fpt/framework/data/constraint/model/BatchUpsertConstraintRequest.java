package com.fpt.framework.data.constraint.model;

import lombok.Data;

import java.util.List;

@Data
public class BatchUpsertConstraintRequest {
    private List<String> resources;
    private String usageId;
    private String usageType;
}
