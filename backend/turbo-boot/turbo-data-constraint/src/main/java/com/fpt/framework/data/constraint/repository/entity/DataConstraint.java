package com.fpt.framework.data.constraint.repository.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class DataConstraint {

    @Id
    private String id;

    /**
     * Resource used for constraint, which is used in other services
     */
    private String resourceId;

    /**
     * Point to what does usage resourceId
     */
    private String usageId;

    /**
     * usage Type, follow pattern: `${resource type}-${usageType}` for example: 'template-process'
     */
    private String usageType;

}
