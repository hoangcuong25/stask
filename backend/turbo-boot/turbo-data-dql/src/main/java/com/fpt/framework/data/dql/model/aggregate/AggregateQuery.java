package com.fpt.framework.data.dql.model.aggregate;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class AggregateQuery {
	private List<AggregateGroupKey> groupKeys = new ArrayList<>();
	private List<AggregateMeasure> measures = new ArrayList<>();
	private List<AggregateOrderBy> orderBy = new ArrayList<>();
}
