package com.fpt.framework.utility.converter;

import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.math.BigInteger;

@UtilityClass
@Slf4j
public class NumberConverter {

	public static Long toLong(Object value) {
		return toLong(value, 0L);
	}

	public static Long toLong(Object value, Long defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (value instanceof Long) {
			return (Long) value;
		}
		if (value instanceof Integer) {
			return ((Integer) value).longValue();
		}
		if (value instanceof Short) {
			return ((Short) value).longValue();
		}
		if (value instanceof Byte) {
			return ((Byte) value).longValue();
		}
		if (value instanceof BigInteger) {
			return ((BigInteger) value).longValue();
		}
		if (value instanceof BigDecimal) {
			return ((BigDecimal) value).longValue();
		}
		if (value instanceof Number) {
			return ((Number) value).longValue();
		}

		String s = normalizeNumberString(String.valueOf(value));
		if (s.isEmpty()) {
			return defaultValue;
		}

		try {
			String intPart = s.contains(".") ? s.substring(0, s.indexOf('.')) : s;
			return Long.parseLong(intPart);
		} catch (Exception e) {
			log.warn("toLong parseLong error for value: {}", value, e);
			return defaultValue;
		}
	}

	public static Integer toInt(Object value) {
		return toInt(value, 0);
	}

	public static Integer toInt(Object value, Integer defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (value instanceof Integer) {
			return (Integer) value;
		}
		if (value instanceof Number) {
			return ((Number) value).intValue();
		}

		String s = normalizeNumberString(String.valueOf(value));
		if (s.isEmpty()) {
			return defaultValue;
		}

		try {
			String intPart = s.contains(".") ? s.substring(0, s.indexOf('.')) : s;
			return Integer.parseInt(intPart);
		} catch (Exception e) {
			log.warn("toInt parseInt error for value: {}", value, e);
			return defaultValue;
		}
	}

	public static Double toDouble(Object value) {
		return toDouble(value, 0.0);
	}

	public static Double toDouble(Object value, Double defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (value instanceof Double) {
			return (Double) value;
		}
		if (value instanceof Float) {
			return ((Float) value).doubleValue();
		}
		if (value instanceof BigDecimal) {
			return ((BigDecimal) value).doubleValue();
		}
		if (value instanceof BigInteger) {
			return new BigDecimal((BigInteger) value).doubleValue();
		}
		if (value instanceof Number) {
			return ((Number) value).doubleValue();
		}

		String s = normalizeNumberString(String.valueOf(value));
		if (s.isEmpty()) {
			return defaultValue;
		}

		try {
			return Double.parseDouble(s);
		} catch (Exception e) {
			log.warn("toDouble parseDouble error for value: {}", value, e);
			return defaultValue;
		}
	}

	public static BigInteger toBigInteger(Object value) {
		return toBigInteger(value, BigInteger.ZERO);
	}

	public static BigInteger toBigInteger(Object value, BigInteger defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (value instanceof BigInteger) {
			return (BigInteger) value;
		}
		if (value instanceof BigDecimal) {
			return ((BigDecimal) value).toBigInteger();
		}
		if (value instanceof Number) {
			return BigInteger.valueOf(((Number) value).longValue());
		}

		String s = normalizeNumberString(String.valueOf(value));
		if (s.isEmpty()) {
			return defaultValue;
		}

		try {
			if (s.contains(".")) {
				s = s.substring(0, s.indexOf('.'));
			}
			return new BigInteger(s);
		} catch (Exception e) {
			log.warn("toBigInteger parseBigInteger error for value: {}", value, e);
			return defaultValue;
		}
	}

	public static BigDecimal toBigDecimal(Object value) {
		return toBigDecimal(value, BigDecimal.ZERO);
	}

	public static BigDecimal toBigDecimal(Object value, BigDecimal defaultValue) {
		if (value == null) {
			return defaultValue;
		}

		if (value instanceof BigDecimal) {
			return (BigDecimal) value;
		}
		if (value instanceof BigInteger) {
			return new BigDecimal((BigInteger) value);
		}
		if (value instanceof Double || value instanceof Float) {
			return BigDecimal.valueOf(((Number) value).doubleValue());
		}
		if (value instanceof Number) {
			return BigDecimal.valueOf(((Number) value).longValue());
		}

		String s = normalizeNumberString(String.valueOf(value));
		if (s.isEmpty()) {
			return defaultValue;
		}

		try {
			return new BigDecimal(s);
		} catch (Exception e) {
			log.warn("toBigDecimal parseBigDecimal error for value: {}", value, e);
			return defaultValue;
		}
	}

	static String normalizeNumberString(String raw) {
		if (raw == null) {
			return "";
		}

		String s = raw.trim();
		if (s.isEmpty()) {
			return "";
		}

		boolean negative = s.startsWith("(") && s.endsWith(")");
		if (negative) {
			s = s.substring(1, s.length() - 1);
		}

		s = s.replaceAll("[\\s\\u00A0]", "");

		if (s.toLowerCase().contains("e")) {
			s = s.replaceAll("[^0-9eE\\.-]", "");

			if (negative && !s.startsWith("-")) {
				s = "-" + s;
			}

			if (s.equals("-") || s.equals(".") || s.equals("-.") || s.isEmpty()) {
				return "";
			}
			return s;
		}

		s = s.replaceAll("[^0-9,\\.-]", "");

		int lastComma = s.lastIndexOf(',');
		int lastDot = s.lastIndexOf('.');

		if (lastComma != -1 && lastDot != -1) {
			char decimalSep = lastComma > lastDot ? ',' : '.';
			char thousandSep = decimalSep == ',' ? '.' : ',';

			s = s.replace(String.valueOf(thousandSep), "");
			s = s.replace(decimalSep, '.');
		} else if (lastComma != -1) {
			int digitsAfterComma = s.length() - lastComma - 1;
			if (digitsAfterComma == 3 && s.indexOf(',') < lastComma) {
				s = s.replace(",", "");
			} else {
				s = s.replace(',', '.');
			}
		} else if (lastDot != -1) {
			int digitsAfterDot = s.length() - lastDot - 1;
			if (digitsAfterDot == 3 && s.indexOf('.') < lastDot) {
				s = s.replace(".", "");
			}
		}

		if (negative) {
			s = "-" + s;
		}

		if (s.equals("-") || s.equals(".") || s.equals("-.")) {
			return "";
		}

		return s;
	}
}
