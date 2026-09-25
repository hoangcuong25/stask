package com.fpt.framework.data.dql.compiler.nonrelation;

import com.fpt.framework.data.dql.model.aggregate.AggregateFunction;
import com.fpt.framework.data.dql.model.aggregate.AggregateGroupKey;
import com.fpt.framework.data.dql.model.aggregate.AggregateMeasure;
import com.fpt.framework.data.dql.model.aggregate.AggregateOrderBy;
import com.fpt.framework.data.dql.model.aggregate.AggregateQuery;
import org.bson.Document;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.query.Criteria;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

public class MongoAggregateCompiler {
	private static final Pattern SAFE_ALIAS = Pattern.compile("[A-Za-z_][A-Za-z0-9_]*");

	public List<AggregationOperation> compile(AggregateQuery query, Criteria criteria, String rootPath, Pageable pageable) {
		validate(query);
		List<AggregationOperation> operations = compileWithoutPaging(query, criteria, rootPath);
		if (query.getOrderBy() != null && !query.getOrderBy().isEmpty()) {
			operations.add(raw(new Document("$sort", buildSortDocument(query))));
		}
		if (pageable != null) {
			long skip = (long) pageable.getPageNumber() * pageable.getPageSize();
			if (skip > 0) {
				operations.add(Aggregation.skip(skip));
			}
			if (pageable.getPageSize() > 0) {
				operations.add(Aggregation.limit(pageable.getPageSize()));
			}
		}
		return operations;
	}

	public List<AggregationOperation> compileCount(AggregateQuery query, Criteria criteria, String rootPath) {
		validate(query);
		List<AggregationOperation> operations = compileWithoutPaging(query, criteria, rootPath);
		operations.add(Aggregation.count().as("total"));
		return operations;
	}

	private List<AggregationOperation> compileWithoutPaging(AggregateQuery query, Criteria criteria, String rootPath) {
		List<AggregationOperation> operations = new ArrayList<>();
		if (criteria != null && !criteria.getCriteriaObject().isEmpty()) {
			operations.add(Aggregation.match(criteria));
		}
		operations.add(raw(new Document("$group", buildGroupDocument(query, rootPath))));
		operations.add(raw(new Document("$project", buildProjectDocument(query))));
		return operations;
	}

	public void validate(AggregateQuery query) {
		if (query == null) {
			throw new IllegalArgumentException("Aggregate query is required");
		}
		if (query.getMeasures() == null || query.getMeasures().isEmpty()) {
			throw new IllegalArgumentException("Aggregate query must define at least one measure");
		}
		Set<String> aliases = new HashSet<>();
		if (query.getGroupKeys() != null) {
			for (AggregateGroupKey groupKey : query.getGroupKeys()) {
				validateField(groupKey.getField(), "group key field");
				String alias = resolveAlias(groupKey.getAlias(), groupKey.getField());
				validateAlias(alias, "group key alias");
				if (!aliases.add(alias)) {
					throw new IllegalArgumentException("Duplicate aggregate output alias: " + alias);
				}
			}
		}
		for (AggregateMeasure measure : query.getMeasures()) {
			if (measure.getFunction() == null) {
				throw new IllegalArgumentException("Aggregate measure function is required");
			}
			if (measure.getFunction() != AggregateFunction.COUNT) {
				validateField(measure.getField(), "measure field");
			}
			validateAlias(measure.getAlias(), "measure alias");
			if (!aliases.add(measure.getAlias())) {
				throw new IllegalArgumentException("Duplicate aggregate output alias: " + measure.getAlias());
			}
		}
		if (query.getOrderBy() != null) {
			for (AggregateOrderBy orderBy : query.getOrderBy()) {
				validateAlias(orderBy.getName(), "orderBy name");
			}
		}
	}

	private Document buildGroupDocument(AggregateQuery query, String rootPath) {
		Document group = new Document();
		List<AggregateGroupKey> groupKeys = query.getGroupKeys();
		if (groupKeys == null || groupKeys.isEmpty()) {
			group.put("_id", null);
		} else if (groupKeys.size() == 1) {
			group.put("_id", "$" + resolveFieldPath(groupKeys.get(0).getField(), rootPath));
		} else {
			Document idDocument = new Document();
			for (AggregateGroupKey key : groupKeys) {
				idDocument.put(resolveAlias(key.getAlias(), key.getField()), "$" + resolveFieldPath(key.getField(), rootPath));
			}
			group.put("_id", idDocument);
		}
		for (AggregateMeasure measure : query.getMeasures()) {
			group.put(measure.getAlias(), buildAccumulator(measure, rootPath));
		}
		return group;
	}

	private Document buildAccumulator(AggregateMeasure measure, String rootPath) {
		String fieldPath = isNotBlank(measure.getField()) ? "$" + resolveFieldPath(measure.getField(), rootPath) : null;
		return switch (measure.getFunction()) {
			case COUNT -> new Document("$sum", 1);
			case COUNT_DISTINCT, COUNT_DISTINCT_NON_NULL ->
					new Document("$addToSet", fieldPath != null ? fieldPath : "$_id");
			case SUM -> new Document("$sum", fieldPath);
			case AVG -> new Document("$avg", fieldPath);
			case MIN -> new Document("$min", fieldPath);
			case MAX -> new Document("$max", fieldPath);
		};
	}

	private Document buildProjectDocument(AggregateQuery query) {
		Document project = new Document();
		List<AggregateGroupKey> groupKeys = query.getGroupKeys();
		if (groupKeys == null || groupKeys.isEmpty()) {
			project.put("_id", 0);
		} else if (groupKeys.size() == 1) {
			AggregateGroupKey key = groupKeys.get(0);
			project.put(resolveAlias(key.getAlias(), key.getField()), "$_id");
			project.put("_id", 0);
		} else {
			for (AggregateGroupKey key : groupKeys) {
				String alias = resolveAlias(key.getAlias(), key.getField());
				project.put(alias, "$_id." + alias);
			}
			project.put("_id", 0);
		}
		for (AggregateMeasure measure : query.getMeasures()) {
			if (measure.getFunction() == AggregateFunction.COUNT_DISTINCT) {
				project.put(measure.getAlias(), new Document("$size", "$" + measure.getAlias()));
			} else if (measure.getFunction() == AggregateFunction.COUNT_DISTINCT_NON_NULL) {
				project.put(measure.getAlias(), new Document("$size",
						new Document("$setDifference", List.of("$" + measure.getAlias(), Collections.singletonList(null)))));
			} else {
				project.put(measure.getAlias(), 1);
			}
		}
		return project;
	}

	private Document buildSortDocument(AggregateQuery query) {
		Document sort = new Document();
		for (AggregateOrderBy orderBy : query.getOrderBy()) {
			sort.put(orderBy.getName(), orderBy.isDesc() ? -1 : 1);
		}
		return sort;
	}

	private String resolveAlias(String alias, String field) {
		if (isNotBlank(alias)) {
			return alias;
		}
		return field == null ? null : field.replace('.', '_');
	}

	private String resolveFieldPath(String field, String rootPath) {
		if (isSystemField(field) || !isNotBlank(rootPath)) {
			return field;
		}
		return rootPath + "." + field;
	}

	private boolean isSystemField(String field) {
		return "id".equals(field) || "_id".equals(field) || "createdTime".equals(field)
				|| "createdBy".equals(field) || "updatedTime".equals(field)
				|| "updatedBy".equals(field) || "tenantId".equals(field);
	}

	private void validateAlias(String alias, String label) {
		if (!isNotBlank(alias) || !SAFE_ALIAS.matcher(alias).matches()) {
			throw new IllegalArgumentException("Invalid aggregate " + label + ": " + alias);
		}
	}

	private void validateField(String field, String label) {
		if (!isNotBlank(field) || field.contains("$") || field.contains("\0")
				|| field.startsWith(".") || field.endsWith(".") || field.contains("..")) {
			throw new IllegalArgumentException("Invalid aggregate " + label + ": " + field);
		}
	}

	private boolean isNotBlank(String value) {
		return value != null && !value.trim().isEmpty();
	}

	private AggregationOperation raw(Document stage) {
		return context -> stage;
	}
}
