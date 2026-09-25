package com.fpt.framework.utility.converter;

import lombok.experimental.UtilityClass;

import java.util.Locale;

@UtilityClass
public class BooleanConverter {

	public static Boolean toBoolean(Object value) {
		return toBoolean(value, false);
	}

	public static Boolean toBoolean(Object value, Boolean defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (value instanceof Boolean) {
			return (Boolean) value;
		}

		if (value instanceof Number) {
			return ((Number) value).intValue() != 0;
		}

		String s = String.valueOf(value).trim().toLowerCase(Locale.ROOT);
		if (s.isEmpty()) {
			return defaultValue;
		}

		return switch (s) {
			case "true", "t", "yes", "y", "on", "1" -> true;
			case "false", "f", "no", "n", "off", "0" -> false;
			default -> defaultValue;
		};
	}
}
