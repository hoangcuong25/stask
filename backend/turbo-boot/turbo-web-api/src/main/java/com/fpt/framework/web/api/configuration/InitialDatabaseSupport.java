package com.fpt.framework.web.api.configuration;

import com.fpt.framework.web.api.support.DataInitialResource;
import com.fpt.framework.web.api.support.controlller.InitialDataSupportController;
import com.fpt.framework.web.api.support.data.SqlInitialDataExecutor;
import com.fpt.framework.web.api.support.service.InitialDataSupporter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(DataInitialResource.class)
public class InitialDatabaseSupport {


    @Bean
    @ConditionalOnMissingBean
    @ConditionalOnBean(DataInitialResource.class)
    public InitialDataSupporter initialDataSupporter(SqlInitialDataExecutor sqlExecutor, DataInitialResource resourceData) {
        return new InitialDataSupporter(sqlExecutor,resourceData);
    }

    @Bean
    @ConditionalOnBean(InitialDataSupporter.class)
    public InitialDataSupportController initialDataSupportController(InitialDataSupporter initialDataSupporter) {
        return  new InitialDataSupportController(initialDataSupporter);
    }
}
