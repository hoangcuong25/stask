package com.fpt.framework.data.support.nonerelation;

import com.fpt.framework.data.support.AbstractDataIndexCreator;
import com.fpt.framework.data.support.model.DataSourceSetting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.DefaultReactiveIndexOperations;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.data.mongodb.core.convert.QueryMapper;
import org.springframework.data.mongodb.core.index.ReactiveIndexOperations;
import org.springframework.data.mongodb.core.index.ReactiveMongoPersistentEntityIndexCreator;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
import org.springframework.data.mongodb.core.mapping.MongoPersistentEntity;
import org.springframework.data.mongodb.core.mapping.MongoPersistentProperty;
import org.springframework.scheduling.annotation.EnableAsync;
import reactor.core.publisher.Mono;

import java.util.function.Function;

@EnableAsync
public class NoneRelationIndexCreator extends AbstractDataIndexCreator<MongoPersistentEntity<?>, MongoPersistentProperty> {

	@Autowired
	private MongoConverter mongoConverter;

	@Autowired
	private ReactiveMongoOperations mongoOperations;

	private QueryMapper queryMapper;

	public NoneRelationIndexCreator() {
		super(DataSourceSetting.DB_PLATFORM_MONGODB);
	}

	@Override
	protected Function<MongoPersistentEntity<?>, Mono<Void>> buildIndexCreator() {
		if (this.mappingContext instanceof MongoMappingContext mongoMappingContext) {
			ReactiveMongoPersistentEntityIndexCreator indexCreator = new ReactiveMongoPersistentEntityIndexCreator(mongoMappingContext, this::indexOps);
			return indexCreator::checkForIndexes;
		}

		return null;
	}

	@Override
	protected void loadConfiguration() {
		super.loadConfiguration();
		this.queryMapper = new QueryMapper(this.mongoConverter);
	}

	private ReactiveIndexOperations indexOps(String collectionName) {
		return new DefaultReactiveIndexOperations(mongoOperations, collectionName, queryMapper);
	}
}
