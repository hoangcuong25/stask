package com.fpt.framework.data.constraint.model;

import lombok.Data;

import java.util.List;

@Data
public class DeleteConstraintRequest {

    private String usageId;

    private List<String> usageTypes;
}
