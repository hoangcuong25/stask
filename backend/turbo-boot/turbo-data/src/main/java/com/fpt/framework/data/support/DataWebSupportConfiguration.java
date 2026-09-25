package com.fpt.framework.data.support;

import org.springframework.data.web.ReactivePageableHandlerMethodArgumentResolver;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.result.method.annotation.ArgumentResolverConfigurer;

public class DataWebSupportConfiguration implements WebFluxConfigurer {

    @Override
    public void configureArgumentResolvers(ArgumentResolverConfigurer config) {
        config.addCustomResolver(new ReactivePageableHandlerMethodArgumentResolver());
    }
}
