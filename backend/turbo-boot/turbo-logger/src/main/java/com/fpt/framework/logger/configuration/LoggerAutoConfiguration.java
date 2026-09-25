package com.fpt.framework.logger.configuration;

import com.fpt.framework.logger.support.LogLayoutConvertor;
import com.fpt.framework.logger.support.ReactiveLoggerSupportRestController;
import com.fpt.framework.logger.support.ReactiveLoggerSupportService;
import com.fpt.framework.logger.support.ReactiveMDCRegistry;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import java.util.Map;

@Configuration
@Import({LogConfiguration.class, ReactiveLoggerSupportRestController.class,
        ReactiveLoggerSupportService.class})
public class LoggerAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public LogLayoutConvertor layoutConvertor() {
        return () -> Map.of();
    }


    @Bean
    ReactiveMDCRegistry mdcRegistry(LogLayoutConvertor layoutConvertor) {
        return new ReactiveMDCRegistry(layoutConvertor);
    }
}
