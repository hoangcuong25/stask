package com.fpt.framework.utility.converter;

import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.temporal.TemporalAccessor;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@UtilityClass
@Slf4j
public class DateTimeConverter {

	public static final DateTimeFormatter ISO_LOCAL_DATE_TIME_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
	public static final DateTimeFormatter ISO_LOCAL_DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;

	public static final DateTimeFormatter YMD_HMS_MILLIS_DASH_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
	public static final DateTimeFormatter YMD_HMS_DASH_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
	public static final DateTimeFormatter YMD_HM_DASH_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

	public static final DateTimeFormatter YMD_HMS_SLASH_FORMATTER = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
	public static final DateTimeFormatter DMY_HMS_SLASH_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
	public static final DateTimeFormatter DMY_HMS_DASH_FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

	public static final DateTimeFormatter YMD_SLASH_FORMATTER = DateTimeFormatter.ofPattern("yyyy/MM/dd");
	public static final DateTimeFormatter DMY_SLASH_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
	public static final DateTimeFormatter DMY_DASH_FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yyyy");

	private static final List<DateTimeFormatter> DATE_TIME_FORMATTERS = Arrays.asList(
			ISO_LOCAL_DATE_TIME_FORMATTER,
			YMD_HMS_MILLIS_DASH_FORMATTER,
			YMD_HMS_DASH_FORMATTER,
			YMD_HM_DASH_FORMATTER,
			YMD_HMS_SLASH_FORMATTER,
			DMY_HMS_SLASH_FORMATTER,
			DMY_HMS_DASH_FORMATTER,
			ISO_LOCAL_DATE_FORMATTER,
			YMD_SLASH_FORMATTER,
			DMY_SLASH_FORMATTER,
			DMY_DASH_FORMATTER
	);

	public static Date toDate(Object value) {
		return toDate(value, null);
	}

	public static Date toDate(Object value, Date defaultValue) {
		Instant instant = toInstant(value, null);
		return instant == null ? defaultValue : Date.from(instant);
	}

	public static Instant toInstant(Object value) {
		return toInstant(value, null);
	}

	public static Instant toInstant(Object value, Instant defaultValue) {
		if (value == null) {
			return defaultValue;
		}
		if (value instanceof Instant) {
			return (Instant) value;
		}
		if (value instanceof Date) {
			return ((Date) value).toInstant();
		}

		LocalDateTime ldt = toLocalDateTime(value, null);
		return ldt == null ? defaultValue : ldt.atZone(ZoneId.systemDefault()).toInstant();
	}

	public static LocalDateTime toLocalDateTime(Object value) {
		return toLocalDateTime(value, null);
	}

	public static LocalDateTime toLocalDateTime(Object value, LocalDateTime defaultValue) {
		if (value == null) {
			return defaultValue;
		}
		if (value instanceof LocalDateTime) {
			return (LocalDateTime) value;
		}
		if (value instanceof ZonedDateTime) {
			return ((ZonedDateTime) value).toLocalDateTime();
		}
		if (value instanceof OffsetDateTime) {
			return ((OffsetDateTime) value).toLocalDateTime();
		}
		if (value instanceof LocalDate) {
			return ((LocalDate) value).atStartOfDay();
		}
		if (value instanceof Instant) {
			return LocalDateTime.ofInstant((Instant) value, ZoneId.systemDefault());
		}
		if (value instanceof Date) {
			return LocalDateTime.ofInstant(((Date) value).toInstant(), ZoneId.systemDefault());
		}
		if (value instanceof Number) {
			return LocalDateTime.ofInstant(Instant.ofEpochMilli(((Number) value).longValue()), ZoneId.systemDefault());
		}

		return parseLocalDateTimeFromString(String.valueOf(value).trim(), defaultValue);
	}

	private static LocalDateTime parseLocalDateTimeFromString(String s, LocalDateTime defaultValue) {
		if (s.isEmpty()) {
			return defaultValue;
		}

		try {
			return ZonedDateTime.parse(s).toLocalDateTime();
		} catch (DateTimeParseException ignored) {
		}

		try {
			return OffsetDateTime.parse(s).toLocalDateTime();
		} catch (DateTimeParseException ignored) {
		}

		for (DateTimeFormatter formatter : DATE_TIME_FORMATTERS) {
			try {
				TemporalAccessor accessor = formatter.parseBest(s, LocalDateTime::from, LocalDate::from);
				if (accessor instanceof LocalDateTime) {
					return (LocalDateTime) accessor;
				} else if (accessor instanceof LocalDate) {
					return ((LocalDate) accessor).atStartOfDay();
				}
			} catch (DateTimeParseException ignored) {
			}
		}

		log.warn("toLocalDateTime: Could not parse value: {}", s);
		return defaultValue;
	}

	public static LocalDate toLocalDate(Object value) {
		return toLocalDate(value, null);
	}

	public static LocalDate toLocalDate(Object value, LocalDate defaultValue) {
		LocalDateTime ldt = toLocalDateTime(value, null);
		return ldt == null ? defaultValue : ldt.toLocalDate();
	}
}
