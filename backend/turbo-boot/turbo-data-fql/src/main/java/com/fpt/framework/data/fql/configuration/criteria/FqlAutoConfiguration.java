package com.fpt.framework.data.fql.configuration.criteria;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@AutoConfiguration
@Import(QueryFqlConfiguration.class)
public class FqlAutoConfiguration {
}
