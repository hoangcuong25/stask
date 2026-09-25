package com.fpt.framework.security.v2.support.data;

import com.fpt.framework.security.support.AuthenticationContext;
import com.fpt.framework.security.support.AuthorizationContext;
import com.fpt.framework.security.v2.support.AuthzFilterContext;
import com.fpt.framework.security.v2.support.PermissionQueryResolver;
import com.fpt.framework.utility.ReactiveApplication;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.util.BsonUtils;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.Set;

@RequiredArgsConstructor
@Slf4j
public class ReactivePermissionV2Query {

	private final PermissionQueryResolver permissionQueryResolver;
	private final ReactiveApplication reactiveApplication;

	public Mono<Query> authorizeQuery(Query originalQuery) {
		return AuthorizationContext.currentAuthorPolicy()
				.zipWith(AuthenticationContext.currentUserPrincipal())
				.flatMap(tuple -> {
					var policy = tuple.getT1();
					var principal = tuple.getT2();

					if (!policy.isAutoFilter()) {
						return Mono.just(originalQuery);
					}

					return AuthzFilterContext.current()
							.filter(holder -> holder.getCriteria() != null)
							.map(holder -> {
								holder.markConsumed();
								return appendCriteria(originalQuery, holder.getCriteria());
							})
							.switchIfEmpty(Mono.defer(() -> authorizeQueryInternal(
									originalQuery,
									policy.getResource(),
									policy.getAction(),
									principal.getUniqueName()
							)));
				})
				.switchIfEmpty(Mono.defer(() -> Mono.just(originalQuery)));
	}

	public Mono<Query> authorizeQuery(Query originalQuery, String resource, String action) {
		return AuthenticationContext.currentUserPrincipal()
				.flatMap(principal -> authorizeQueryInternal(
						originalQuery,
						resource,
						action,
						principal.getUniqueName()
				))
				.switchIfEmpty(Mono.defer(() -> Mono.just(originalQuery)));
	}

	public Mono<Criteria> buildPermissionCriteria(String resource, String action, String principalKey) {
		return parseResourceParts(resource)
				.flatMap(parts -> permissionQueryResolver.buildFilterCriteria(
						parts.application,
						parts.objectType,
						action,
						principalKey
				));
	}

	private Mono<Query> authorizeQueryInternal(
			Query originalQuery,
			String resource,
			String action,
			String principalKey
	) {
		return buildPermissionCriteria(resource, action, principalKey)
				.map(criteria -> {
					if (criteria == null) {
						return originalQuery;
					}
					return appendCriteria(originalQuery, criteria);
				});
	}

	private Query appendCriteria(Query originalQuery, Criteria permissionCriteria) {
		Document originalQueryObject = originalQuery.getQueryObject();

		Criteria combined;
		if (originalQueryObject.isEmpty()) {
			combined = permissionCriteria;
		} else {
			Criteria originalCriteria = new Criteria() {
				@Override
				public Document getCriteriaObject() {
					return originalQueryObject;
				}
			};
			combined = new Criteria().andOperator(originalCriteria, permissionCriteria);
		}

		Query newQuery = authorizedQueryOf(originalQuery, combined);

		log.debug("Authorized query: criteria={}, fields={}, sort={}",
				newQuery.getQueryObject(), newQuery.getFieldsObject(), newQuery.getSortObject());

		return newQuery;
	}

	private Query authorizedQueryOf(Query originalQuery, Criteria combined) {
		Query newQuery = projectionAwareQuery(originalQuery, combined);

		if (originalQuery.getSkip() > 0) {
			newQuery.skip(originalQuery.getSkip());
		}
		if (originalQuery.isLimited()) {
			newQuery.limit(originalQuery.getLimit());
		}
		if (originalQuery.getHint() != null) {
			newQuery.withHint(originalQuery.getHint());
		}
		originalQuery.getCollation().ifPresent(newQuery::collation);
		if (originalQuery.getMeta().hasValues()) {
			newQuery.setMeta(originalQuery.getMeta());
		}
		copyRestrictedTypes(originalQuery, newQuery);

		return newQuery;
	}

	private Query projectionAwareQuery(Query originalQuery, Criteria combined) {
		Document sourceFields = originalQuery.getFieldsObject();
		Document sourceSort = originalQuery.getSortObject();

		return new Query(combined) {
			@Override
			public Document getFieldsObject() {
				return BsonUtils.merge(sourceFields, super.getFieldsObject());
			}

			@Override
			public Document getSortObject() {
				return BsonUtils.merge(sourceSort, super.getSortObject());
			}

			@Override
			public boolean isSorted() {
				return !sourceSort.isEmpty() || super.isSorted();
			}
		};
	}

	private void copyRestrictedTypes(Query originalQuery, Query newQuery) {
		Set<Class<?>> restrictedTypes = originalQuery.getRestrictedTypes();
		if (restrictedTypes.isEmpty()) {
			return;
		}
		Class<?>[] types = restrictedTypes.toArray(new Class<?>[0]);
		newQuery.restrict(types[0], Arrays.copyOfRange(types, 1, types.length));
	}

	private Mono<ResourceParts> parseResourceParts(String fullResource) {
		if (StringUtils.isBlank(fullResource)) {
			return Mono.error(new IllegalArgumentException("Resource is empty"));
		}

		int firstDot = fullResource.indexOf('.');
		if (firstDot > 0) {
			String app = fullResource.substring(0, firstDot);
			String objectType = fullResource;

			return Mono.just(new ResourceParts(app, objectType));
		} else {
			return reactiveApplication.applicationUnique()
					.map(app -> {
						String objectType = app + "." + fullResource;
						return new ResourceParts(app, objectType);
					});
		}
	}

	@AllArgsConstructor
	private static class ResourceParts {
		final String application;
		final String objectType;
	}
}
