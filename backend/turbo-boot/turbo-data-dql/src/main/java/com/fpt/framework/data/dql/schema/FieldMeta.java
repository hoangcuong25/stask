package com.fpt.framework.data.dql.schema;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FieldMeta {
	private String code;
	private FieldType type;
}
