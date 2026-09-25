package com.fpt.framework.security.configuration;


import com.fpt.framework.data.support.factory.nonerelation.ReactiveNoneRelationQueryBuilder;
import com.fpt.framework.data.support.factory.nonerelation.ReactiveNoneRelationRepositoryFactoryBean;
import com.fpt.framework.data.support.factory.relation.ReactiveRelationQueryBuilder;
import com.fpt.framework.data.support.factory.relation.ReactiveRelationRepositoryFactoryBean;
import com.fpt.framework.security.model.UserPrincipal;
import com.fpt.framework.security.support.AuthenticationContext;
import com.fpt.framework.security.support.data.TargetScopeRelatedRegistries;
import com.fpt.framework.security.support.data.nonrelation.query.ReactiveNonRelationPermissionQuery;
import com.fpt.framework.security.support.data.relation.query.ReactiveRelationPermissionStringQuery;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.data.domain.ReactiveAuditorAware;

@Configuration
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.REACTIVE)
public class DataSecuritySupport {
    @Bean
    @ConditionalOnBean(ReactiveNoneRelationRepositoryFactoryBean.class)
    public ReactiveNonRelationPermissionQuery reactiveNonRelationPermissionQuery() {
        return new ReactiveNonRelationPermissionQuery();
    }

    @Bean
    @ConditionalOnBean(ReactiveRelationRepositoryFactoryBean.class)
    public ReactiveRelationQueryBuilder<String> reactiveRelationPermissionQuery() {
        return new ReactiveRelationPermissionStringQuery();
    }

    @Bean
    @ConditionalOnMissingBean
    public ReactiveAuditorAware<String> reactiveAuditorAware() {
        return () -> AuthenticationContext.currentUserPrincipal()
                .map(UserPrincipal::getUniqueName);
    }

    @Bean
    @Order()
    public TargetScopeRelatedRegistries targetScopeRelatedRegistries() {
        return new TargetScopeRelatedRegistries();
    }
}
