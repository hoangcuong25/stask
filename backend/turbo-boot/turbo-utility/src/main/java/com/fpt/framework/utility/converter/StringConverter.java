package com.fpt.framework.utility.converter;

import lombok.experimental.UtilityClass;

@UtilityClass
public class StringConverter {

	public static String toString(Object value) {
		return toString(value, "");
	}

	public static String toString(Object value, String defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		String s = String.valueOf(value);

		return "null".equalsIgnoreCase(s) ? defaultValue : s;
	}
}
