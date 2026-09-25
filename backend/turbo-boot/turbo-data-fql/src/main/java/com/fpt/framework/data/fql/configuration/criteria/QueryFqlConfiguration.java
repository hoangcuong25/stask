package com.fpt.framework.data.fql.configuration.criteria;

import com.fpt.framework.data.fql.support.ConditionEnableFql;
import com.fpt.framework.data.fql.support.ReactiveNoneRelationFqlQuery;
import com.fpt.framework.utility.expression.ExpressionBuilder;
import com.fpt.framework.utility.expression.model.ExpressionOperator;
import com.fpt.framework.utility.expression.model.ExpressionOperatorModel;
import com.fpt.framework.data.fql.support.builder.criteria.CriteriaBuilder;
import com.fpt.framework.data.fql.support.builder.criteria.impl.CriteriaBuilderImpl;
import com.fpt.framework.utility.expression.utility.TemplateBuilder;
import com.fpt.framework.utility.expression.utility.impl.TemplateBuilderImpl;
import com.fpt.framework.data.support.factory.nonerelation.ReactiveNoneRelationQueryBuilder;
import com.fpt.framework.data.support.factory.nonerelation.ReactiveNoneRelationRepositoryFactoryBean;
import com.fpt.framework.security.model.UserPrincipal;
import com.fpt.framework.security.support.AuthenticationContext;
import com.fpt.framework.utility.expression.ExpressionBuilderConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Configuration
@Conditional(ConditionEnableFql.class)
@ConditionalOnBean(ReactiveNoneRelationRepositoryFactoryBean.class)
public class QueryFqlConfiguration {


    @Bean
    @ConditionalOnMissingBean(ReactiveNoneRelationQueryBuilder.class)
    ReactiveNoneRelationQueryBuilder reactiveNoneRelationQueryFqlBuilder() {
        return new ReactiveNoneRelationFqlQuery();
    }

    public ExpressionBuilderConfiguration criteriaBuilderConfiguration() {
        Map<String, ExpressionBuilderConfiguration.FunctionResolver> functionResolver = this.getFunctionResolver();
        Map<String, ExpressionOperator> operators = this.criteriaOperator();
        CriteriaBuilderConfiguration configuration = new CriteriaBuilderConfiguration();
        configuration.setOperators(operators);
        configuration.setCompositeOperators(criteriaCompositeOperator());
        configuration.setFunctionResolver(functionResolver);
        return configuration;
    }

    public TemplateBuilder templateBuilder(){
        return new TemplateBuilderImpl();
    }

    @Bean
    @ConditionalOnMissingBean(CriteriaBuilder.class)
    public CriteriaBuilder criteriaBuilder() {
        return new CriteriaBuilderImpl(templateBuilder(), criteriaBuilderConfiguration());
    }


    private Map<String, ExpressionOperator> criteriaOperator() {
        Map<String, ExpressionOperator> operatorMap = new LinkedHashMap<>();
        operatorMap.put("not in", ExpressionOperator.NOT_IN);
        operatorMap.put("in", ExpressionOperator.IN);
        operatorMap.put("is not", ExpressionOperator.IS_NOT);
        operatorMap.put("is", ExpressionOperator.IS);
        operatorMap.put("eq", ExpressionOperator.EQ);
        operatorMap.put("neq", ExpressionOperator.NEQ);
        operatorMap.put("lte", ExpressionOperator.LTE);
        operatorMap.put("lt", ExpressionOperator.LT);
        operatorMap.put("gte", ExpressionOperator.GTE);
        operatorMap.put("gt", ExpressionOperator.GT);
        operatorMap.put("like", ExpressionOperator.REGEX);
        operatorMap.put("=", ExpressionOperator.EQ);
        operatorMap.put("!=", ExpressionOperator.NEQ);
        operatorMap.put("<", ExpressionOperator.LT);
        operatorMap.put("<=", ExpressionOperator.LTE);
        operatorMap.put(">", ExpressionOperator.GT);
        operatorMap.put(">=", ExpressionOperator.GTE);
        operatorMap.put("match", ExpressionOperator.MATCH);
        operatorMap.put("text match", ExpressionOperator.TEXT_MATCH);
        return operatorMap;
    }

    private Map<String, ExpressionOperatorModel> criteriaCompositeOperator() {
        Map<String, ExpressionOperatorModel> operatorModelMap = new HashMap<>();
        operatorModelMap.put("AND", new ExpressionOperatorModel(ExpressionOperator.AND, 1, "AND"));
        operatorModelMap.put("OR", new ExpressionOperatorModel(ExpressionOperator.OR, 1, "OR"));
        operatorModelMap.put("and", new ExpressionOperatorModel(ExpressionOperator.AND, 1, "and"));
        operatorModelMap.put("or", new ExpressionOperatorModel(ExpressionOperator.OR, 1, "or"));
        operatorModelMap.put("&&", new ExpressionOperatorModel(ExpressionOperator.AND, 1, "and"));
        operatorModelMap.put("||", new ExpressionOperatorModel(ExpressionOperator.OR, 1, "or"));
        return operatorModelMap;
    }

    private Map<String, ExpressionBuilderConfiguration.FunctionResolver> getFunctionResolver() {
        Map<String, ExpressionBuilderConfiguration.FunctionResolver> resolvers = new HashMap<>();
        resolvers.put("currentUser", new ExpressionBuilderConfiguration.FunctionResolver() {
            @Override
            public Mono<Object> execute(List<Object> params) {
                return AuthenticationContext.currentUserPrincipal().map(UserPrincipal::getUniqueName);
            }
        });
        resolvers.put("now", params -> Mono.just(Instant.now()));
        resolvers.put("empty", params -> Mono.just(new ArrayList<>()));
        resolvers.put("joinWords", params -> Mono.just(params.stream().map(Object::toString).collect(Collectors.joining(""))));
        return resolvers;
    }
}
