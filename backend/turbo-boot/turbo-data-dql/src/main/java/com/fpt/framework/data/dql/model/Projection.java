package com.fpt.framework.data.dql.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Projection {
	private String field;
	private boolean distinct;
}
