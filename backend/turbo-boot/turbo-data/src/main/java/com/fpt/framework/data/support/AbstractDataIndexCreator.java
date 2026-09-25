package com.fpt.framework.data.support;

import com.fpt.framework.data.support.event.DataSourceLoadedEvent;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.data.convert.EntityConverter;
import org.springframework.data.mapping.PersistentEntity;
import org.springframework.data.mapping.PersistentProperty;
import org.springframework.data.mapping.context.MappingContext;
import org.springframework.scheduling.annotation.Async;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;

@Slf4j
public abstract class AbstractDataIndexCreator<E extends PersistentEntity<?, P>, P extends PersistentProperty<P>> implements DataIndexCreator {

	private final Map<String, String> indexCreators = new ConcurrentHashMap<>();
	protected String platform;
	protected MappingContext<? extends E, P> mappingContext;
	private Function<E, Mono<Void>> indexCreator;

	@Autowired
	private EntityConverter<E, P, ?, ?> entityConverter;

	public AbstractDataIndexCreator(String platform) {
		this.platform = platform;
	}

	@Async
	@EventListener
	@Override
	public void datasourceLoaded(DataSourceLoadedEvent event) {
		if (!isSupported(event)) {
			return;
		}
		String tenantId = event.getTenantId();
		if (this.mappingContext == null) {
			loadConfiguration();
		}
		if (StringUtils.isBlank(tenantId)) {
			return;
		}
		log.trace("Loaded datasource of tenant {}", tenantId);
		onCheckForIndexes(tenantId);
	}

	@Override
	public void onCheckForIndexes(String tenantId) {
		if (indexCreators.get(tenantId) == null) {
			indexCreators.put(tenantId, tenantId);
			List<Mono<Void>> batchCreateIndex = createBatchIndexing(tenantId);
			if (!batchCreateIndex.isEmpty()) {
				Mono.delay(Duration.ofSeconds(30))
						.then(
								Mono.zip(batchCreateIndex, res -> res))
						.doOnError(this::handleSubscriptionException)
						.subscribe();
			}
		}

	}

	@Override
	public boolean isSupported(DataSourceLoadedEvent event) {
		String platform = event.getSource().getDataSourceSetting().getDatabasePlatform();
		return StringUtils.equals(platform, this.platform);
	}

	protected List<Mono<Void>> createBatchIndexing(String tenantId) {
		List<Mono<Void>> batchCreateIndex = new ArrayList<>();
		this.mappingContext.getPersistentEntities().forEach((entity) -> {
			log.trace("indexing... for {}", entity.getName());
			batchCreateIndex.add(this.onCheckForIndexes(tenantId, entity));
		});
		return batchCreateIndex;
	}

	protected abstract Function<E, Mono<Void>> buildIndexCreator();

	private Function<E, Mono<Void>> getIndexCreator() {
		if (indexCreator == null) {
			indexCreator = buildIndexCreator();
		}
		return indexCreator;
	}

	private Mono<Void> onCheckForIndexes(String tenantId, E entity) {
		var indexCreator = getIndexCreator();
		if (null != indexCreator) {
			return indexCreator.apply(entity)
					.contextWrite(context -> TenantContext.setCurrentTenant(new TenantContext.Tenant(tenantId, tenantId), context));
		}
		return Mono.just(new Object()).then();

	}

	private void handleSubscriptionException(Throwable t) {
		log.error("Unexpected exception during asynchronous execution", t);
	}

	protected void loadConfiguration() {
		this.mappingContext = entityConverter.getMappingContext();
	}
}
