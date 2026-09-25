package com.fpt.framework.web.api.configuration;

import com.fpt.framework.data.support.DataSourceMultiTenantLookup;
import com.fpt.framework.web.api.support.controlller.EscapeTextMethodInterceptor;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.Ordered;

/**
 * Autoconfiguration Web api only use is flux
 */
@Configuration()
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE)
@AutoConfiguration(before = JacksonAutoConfiguration.class)
@Import({CorsFilterConfiguration.class, RestApiControllerAdvice.class,
        OpenApiConfiguration.class, InitialDatabaseSupport.class,
        JacksonConfiguration.class})
public class WebApiAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    @ConditionalOnClass(DataSourceMultiTenantLookup.class)
    @ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.REACTIVE)
    public ReactiveContextWebFilter tenantContextWebFilter() {
        return new ReactiveContextWebFilter();
    }
    @Bean
    @ConditionalOnMissingBean
    @ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.REACTIVE)
    public ReactiveTimeRecordWebFilter reactiveTimeRecordWebFilter() {
        return new ReactiveTimeRecordWebFilter();
    }

    @Bean
    public EscapeTextMethodInterceptor escapeTextMethodInterceptor() {
        return EscapeTextMethodInterceptor.escapeText();
    }
}
