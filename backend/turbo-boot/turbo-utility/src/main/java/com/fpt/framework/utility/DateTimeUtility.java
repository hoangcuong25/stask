package com.fpt.framework.utility;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class DateTimeUtility {

    private static final DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private static final DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("HH:mm:ss");
    private static final DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");


    public static LocalDate parseDate(String date) {
        return LocalDate.parse(date, dateFormat);
    }

    public static LocalTime parseTime(String time) {
        return LocalTime.parse(time, timeFormat);
    }

    public static LocalDateTime parseDateTime(String dateTime) {
        return LocalDateTime.parse(dateTime, dateTimeFormat);
    }

    public static String format(LocalDate localDate) {
        return localDate.format(dateFormat);
    }

    public static String format(LocalDateTime localDateTime) {
        return localDateTime.format(dateTimeFormat);
    }
    public static String format(LocalTime localTime) {
        return localTime.format(timeFormat);
    }
}
