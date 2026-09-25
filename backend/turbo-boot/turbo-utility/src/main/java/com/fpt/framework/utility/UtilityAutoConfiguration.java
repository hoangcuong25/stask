package com.fpt.framework.utility;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({ExpressionBeanResolver.class, ReactiveMethodContextSupport.class, ReactiveApplication.class})
public class UtilityAutoConfiguration {
}
