package com.fpt.framework.web.api.support;

import com.fpt.framework.web.api.support.data.SqlInitialDataExecutor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
@ConditionalOnBean(SqlInitialDataExecutor.class)
public class DataInitialResource {

    public static final String RESOURCE_DATA_FOLDER = "classpath:database/data/*";
    public static final String RESOURCE_SCHEMA_FOLDER = "classpath:database/schema/*";

    private List<Resource> resourceData = new ArrayList<>();
    private List<Resource> resourceSchema = new ArrayList<>();

    @Autowired
    public DataInitialResource(ApplicationContext context) {
        try {
            Resource[] dataResources = context.getResources(RESOURCE_DATA_FOLDER);
            Collections.addAll(this.resourceData, dataResources);
        } catch (Exception e) {
            // Log or handle the exception
        }

        try {
            Resource[] schemaResources = context.getResources(RESOURCE_SCHEMA_FOLDER);
            Collections.addAll(this.resourceSchema, schemaResources);
        } catch (Exception e) {
            // Log or handle the exception
        }
    }
}
