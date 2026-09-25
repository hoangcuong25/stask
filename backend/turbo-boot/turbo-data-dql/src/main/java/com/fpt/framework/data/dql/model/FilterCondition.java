package com.fpt.framework.data.dql.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public final class FilterCondition implements FilterNode {
	private String field;         // "vendor_code" -> sẽ map thành "data.vendor_code" ở compiler bước sau
	private Operator operator;
	private ValueSource source;   // LITERAL/FIELD_REF (parser này tạo LITERAL)
	private Object value;         // String/Number/Boolean/List<?>
	private boolean ignoreCase;   // áp dụng cho LIKE/STARTS_/ENDS_
}
