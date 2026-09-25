package com.fpt.framework.utility.expression.builder.conditional.conditional;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@AutoConfiguration
@Import(ConditionalQueryFqlConfiguration.class)
public class FqlConditionAutoConfiguration {
}
