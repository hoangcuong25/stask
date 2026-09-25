package com.fpt.framework.data.dql.model;

public enum ValueSource {
	LITERAL,     // "abc", 123, true, null, ["a","b"]
	FIELD_REF,   // FIELD(otherField)
	VAR          // $today, $currentUserId   // NEW
}
