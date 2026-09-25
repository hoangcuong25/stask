package com.swork.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI sworkOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("sWork Enterprise Management API")
                        .description("Tài liệu API hệ thống sWork - Quản lý công việc & Không gian làm việc (MongoDB, Spring Boot, Angular)")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("sWork Core Team")
                                .email("dev@swork.local"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://springdoc.org")));
    }
}
