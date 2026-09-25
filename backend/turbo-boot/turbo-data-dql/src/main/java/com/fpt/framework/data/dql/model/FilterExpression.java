package com.fpt.framework.data.dql.model;

import com.fpt.framework.data.dql.schema.FieldMeta;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class FilterExpression {
	private List<FilterNode> groups;
	private Map<String, FieldMeta> fieldsMeta;
	private List<SortSpec> sorts;
	private Projection projection;

	public FilterExpression(List<FilterNode> groups, Map<String, FieldMeta> fieldsMeta) {
		this(groups, fieldsMeta, List.of(), null);
	}
}
