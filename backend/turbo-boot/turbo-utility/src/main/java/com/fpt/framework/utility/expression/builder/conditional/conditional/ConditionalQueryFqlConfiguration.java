package com.fpt.framework.utility.expression.builder.conditional.conditional;

import com.fpt.framework.utility.expression.ConditionEnableExpression;
import com.fpt.framework.utility.expression.builder.conditional.ConditionalBuilder;
import com.fpt.framework.utility.expression.builder.conditional.impl.ConditionalBuilderImpl;
import com.fpt.framework.utility.expression.utility.TemplateBuilder;
import com.fpt.framework.utility.expression.utility.impl.TemplateBuilderImpl;
import com.fpt.framework.utility.expression.ExpressionBuilderConfiguration;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;

@Configuration
@Conditional(ConditionEnableExpression.class)
public class ConditionalQueryFqlConfiguration {

    public TemplateBuilder templateBuilder(){
        return new TemplateBuilderImpl();
    }

    @Bean
    @ConditionalOnMissingBean(ConditionalBuilder.class)
    public ConditionalBuilder conditionalBuilder(@Qualifier("conditionalConfiguration") ExpressionBuilderConfiguration criteriaConfiguration) {
        return new ConditionalBuilderImpl(templateBuilder(), criteriaConfiguration);
    }
}
