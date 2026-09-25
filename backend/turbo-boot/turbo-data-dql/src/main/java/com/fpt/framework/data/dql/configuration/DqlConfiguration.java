package com.fpt.framework.data.dql.configuration;

import com.fpt.framework.data.dql.compiler.nonrelation.MongoAggregateCompiler;
import com.fpt.framework.data.dql.compiler.nonrelation.MongoCriteriaCompiler;
import com.fpt.framework.data.dql.compiler.relation.R2dbcCriteriaCompiler;
import com.fpt.framework.data.dql.compiler.relation.SqlFragmentCompiler;
import com.fpt.framework.data.dql.resolver.VariableProvider;
import com.fpt.framework.data.dql.resolver.VariableResolver;
import com.fpt.framework.data.dql.support.ConditionEnableDql;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@Conditional(ConditionEnableDql.class)
public class DqlConfiguration {
	@Bean
	@ConditionalOnMissingBean
	public VariableResolver variableResolver(List<VariableProvider> providers) {
		return new VariableResolver(providers);
	}

	@Bean
	@ConditionalOnMissingBean
	@ConditionalOnClass(name = "org.springframework.data.mongodb.core.query.Criteria")
	public MongoCriteriaCompiler mongoCriteriaCompiler(VariableResolver variableResolver) {
		return new MongoCriteriaCompiler(variableResolver);
	}

	@Bean
	@ConditionalOnMissingBean
	@ConditionalOnClass(name = "org.springframework.data.mongodb.core.aggregation.AggregationOperation")
	public MongoAggregateCompiler mongoAggregateCompiler() {
		return new MongoAggregateCompiler();
	}

	@Bean
	@ConditionalOnMissingBean
	public SqlFragmentCompiler sqlFragmentCompiler(VariableResolver variableResolver) {
		return new SqlFragmentCompiler(variableResolver);
	}

	@Bean
	@ConditionalOnMissingBean
	@ConditionalOnClass(name = "org.springframework.data.relational.core.query.Criteria")
	public R2dbcCriteriaCompiler r2dbcCriteriaCompiler(VariableResolver variableResolver) {
		return new R2dbcCriteriaCompiler(variableResolver);
	}
}
