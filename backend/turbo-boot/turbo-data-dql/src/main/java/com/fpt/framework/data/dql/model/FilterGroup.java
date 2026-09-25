package com.fpt.framework.data.dql.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public final class FilterGroup implements FilterNode {
	private LogicalOp op;
	private List<FilterNode> nodes;
}
