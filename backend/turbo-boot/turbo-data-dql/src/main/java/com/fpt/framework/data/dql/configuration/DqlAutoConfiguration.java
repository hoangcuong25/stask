package com.fpt.framework.data.dql.configuration;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Import;

@AutoConfiguration
@Import(DqlConfiguration.class)
public class DqlAutoConfiguration {

}
