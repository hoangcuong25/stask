package com.fpt.framework.data.constraint.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UpsertConstraintRequest {
   private String oldUsage;
   private String newUsage;
   private String usageType;
}
