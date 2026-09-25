package com.fpt.framework.security.configuration;

import com.fpt.framework.security.support.AuthenticationTokenConverter;
import com.fpt.framework.security.support.InternalJwtDecoder;
import com.fpt.framework.security.v2.configuration.AuthzConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers;

@Configuration
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE)
@Import({WebApiSecurityAdvice.class, MethodSecurityConfig.class, DataSecuritySupport.class, AuthzConfiguration.class})
public class WebApiSecurityConfiguration {

    @Value("${turbo.security.ignore-path:/ignore}")
    private String[] ignorePath;

    private static final String[] openApiIgnore = {
            "/v3/api-docs/**",
            "/swagger-ui.html",
            "/webjars/**",
    };
    private static final String[] actuatorIgnore = {
            "/actuator/**",
    };

    @Bean
    @ConditionalOnMissingBean
    public AuthenticationTokenConverter jwtAuthenticationConverter() {
        return new AuthenticationTokenConverter();
    }

    @Bean
    @ConditionalOnMissingBean
    public ReactiveJwtDecoder reactiveJwtDecoder() {
        return new InternalJwtDecoder();
    }


    @Bean
    @ConditionalOnMissingBean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http,
                                                            ReactiveJwtDecoder reactiveJwtDecoder,
                                                            AuthenticationTokenConverter authenticationTokenConverter) {
        http.
                cors(cors -> cors.disable())
                .csrf(csrfConfig -> csrfConfig.disable())
                .authorizeExchange(exchanges -> exchanges
                        .matchers(ServerWebExchangeMatchers.pathMatchers(ignorePath),
                                ServerWebExchangeMatchers.pathMatchers(openApiIgnore),
                                ServerWebExchangeMatchers.pathMatchers(actuatorIgnore),
                                ServerWebExchangeMatchers.pathMatchers(HttpMethod.OPTIONS, "/**")
                        ).permitAll()
                        .anyExchange().authenticated()
                )
                .securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
                .formLogin(login -> login.disable())
                .httpBasic(basic -> basic.disable())
                .logout(logout -> logout.disable())
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtDecoder(reactiveJwtDecoder)
                                .jwtAuthenticationConverter(authenticationTokenConverter))
                );
        return http.build();
    }
}
