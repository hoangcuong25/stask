package com.fpt.framework.data.dql.model.aggregate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AggregateOrderBy {
	private String name;
	private boolean desc;
}
