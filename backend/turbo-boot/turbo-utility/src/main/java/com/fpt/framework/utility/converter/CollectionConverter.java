package com.fpt.framework.utility.converter;

import lombok.experimental.UtilityClass;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

@UtilityClass
public class CollectionConverter {
	public static Collection<?> toCollection(Object val) {
		if (val == null) {
			return Collections.emptyList();
		}
		if (val instanceof Collection<?> c) {
			return c;
		}
		String s = val.toString();
		if (s.contains(",")) {
			return Arrays.stream(s.split(","))
					.map(String::trim)
					.filter(t -> !t.isEmpty())
					.toList();
		}
		return Collections.singletonList(s);
	}
}
