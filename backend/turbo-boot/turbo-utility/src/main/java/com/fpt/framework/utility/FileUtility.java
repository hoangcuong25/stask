package com.fpt.framework.utility;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class FileUtility {
    private static final Map<String, String> mimeTypeMaps;

    static {
        // Image
        Map<String, String> mimeTypeMap = new HashMap<>();
        mimeTypeMap.put("jpg", "image/jpeg");
        mimeTypeMap.put("jpeg", "image/jpeg");
        mimeTypeMap.put("png", "image/png");
        mimeTypeMap.put("gif", "image/gif");
        mimeTypeMap.put("bmp", "image/bmp");
        mimeTypeMap.put("tiff", "image/tiff");
        mimeTypeMap.put("svg", "image/svg+xml");
        // Image Extension
        mimeTypeMap.put("ico", "image/vnd.microsoft.icon");
        mimeTypeMap.put("jfif", "image/jpeg");
        mimeTypeMap.put("pjp", "image/jpeg");
        mimeTypeMap.put("pjpeg", "image/jpeg");
        mimeTypeMap.put("svgz", "image/svg+xml");
        mimeTypeMap.put("tif", "image/tiff");
        mimeTypeMap.put("xbm", ".xbm");

        // Office
        mimeTypeMap.put("pdf", "application/pdf");
        mimeTypeMap.put("doc", "application/msword");
        mimeTypeMap.put("docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        mimeTypeMap.put("xls", "application/vnd.ms-excel");
        mimeTypeMap.put("xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        mimeTypeMap.put("ppt", "application/vnd.ms-powerpoint");
        mimeTypeMap.put("pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
        mimeTypeMap.put("txt", "text/plain");
        mimeTypeMap.put("rtf", "application/rtf");
        mimeTypeMap.put("csv", "text/csv");

        // Compress
        mimeTypeMap.put("zip", "application/zip");
        mimeTypeMap.put("rar", "application/x-rar-compressed");
        mimeTypeMap.put("tar", "application/x-tar");
        mimeTypeMap.put("gz", "application/gzip");
        mimeTypeMap.put("7z", "application/x-7z-compressed");

        // Audio
        mimeTypeMap.put("mp3", "audio/mpeg");
        mimeTypeMap.put("wav", "audio/wav");
        mimeTypeMap.put("ogg", "audio/ogg");
        mimeTypeMap.put("m4a", "audio/mp4a-latm");
        // Audio Extension
        mimeTypeMap.put("opus", "audio/*");
        mimeTypeMap.put("flac", "audio/*");
        mimeTypeMap.put("weba", "audio/webm");
        mimeTypeMap.put("oga", "audio/ogg");
        mimeTypeMap.put("mid", "audio/*");
        mimeTypeMap.put("amr", "audio/*");
        mimeTypeMap.put("aiff", "audio/*");
        mimeTypeMap.put("wma", "audio/*");
        mimeTypeMap.put("au", "audio/*");
        mimeTypeMap.put("aac", "audio/aac");

        // Video
        mimeTypeMap.put("mp4", "video/mp4");
        mimeTypeMap.put("avi", "video/x-msvideo");
        mimeTypeMap.put("mov", "video/quicktime");
        mimeTypeMap.put("mkv", "video/x-matroska");
        // Video Extension
        mimeTypeMap.put("webm", "video/webm");
        mimeTypeMap.put("wmv", "video/*");
        mimeTypeMap.put("amv", "video/*");
        mimeTypeMap.put("m4v", "video/*");
        mimeTypeMap.put("3gp", "video/*");
        mimeTypeMap.put("flv", "video/*");
        mimeTypeMap.put("asx", "video/*");
        mimeTypeMap.put("ts", "video/mp2t");
        mimeTypeMap.put("ogv", "video/ogg");
        mimeTypeMap.put("mpg", "video/mpeg");
        mimeTypeMap.put("mpeg", "video/mpeg");
        mimeTypeMap.put("ogm", "video/ogg");

        // Other
        mimeTypeMap.put("html", "text/html");
        mimeTypeMap.put("htm", "text/html");
        mimeTypeMap.put("css", "text/css");
        mimeTypeMap.put("js", "application/javascript");
        mimeTypeMap.put("json", "application/json");
        mimeTypeMap.put("xml", "application/xml");

        mimeTypeMap.put("dot", "application/msword");
        mimeTypeMap.put("dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template");
        mimeTypeMap.put("docm", "application/vnd.ms-word.document.macroEnabled.12");
        mimeTypeMap.put("dotm", "application/vnd.ms-word.template.macroEnabled.12");
        mimeTypeMap.put("pot", "application/vnd.ms-powerpoint");
        mimeTypeMap.put("pps", "application/vnd.ms-powerpoint");
        mimeTypeMap.put("ppa", "application/vnd.ms-powerpoint");
        mimeTypeMap.put("potx", "application/vnd.openxmlformats-officedocument.presentationml.template");
        mimeTypeMap.put("ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow");
        mimeTypeMap.put("ppam", "application/vnd.ms-powerpoint.addin.macroEnabled.12");
        mimeTypeMap.put("pptm", "application/vnd.ms-powerpoint.presentation.macroEnabled.12");
        mimeTypeMap.put("potm", "application/vnd.ms-powerpoint.presentation.macroEnabled.12");
        mimeTypeMap.put("ppsm", "application/vnd.ms-powerpoint.slideshow.macroEnabled.12");
        mimeTypeMap.put("xlt", "application/vnd.ms-excel");
        mimeTypeMap.put("xla", "application/vnd.ms-excel");
        mimeTypeMap.put("xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template");
        mimeTypeMap.put("xlsm", "application/vnd.ms-excel.sheet.macroEnabled.12");
        mimeTypeMap.put("xltm", "application/vnd.ms-excel.template.macroEnabled.12");
        mimeTypeMap.put("xlam", "application/vnd.ms-excel.addin.macroEnabled.12");
        mimeTypeMap.put("xlsb", "application/vnd.ms-excel.sheet.binary.macroEnabled.12");
        // Open Office
        mimeTypeMap.put("odt", "application/vnd.oasis.opendocument.text");
        mimeTypeMap.put("ott", "application/vnd.oasis.opendocument.text-template");
        mimeTypeMap.put("oth", "application/vnd.oasis.opendocument.text-web");
        mimeTypeMap.put("odm", "application/vnd.oasis.opendocument.text-master");
        mimeTypeMap.put("odg", "application/vnd.oasis.opendocument.graphics");
        mimeTypeMap.put("otg", "application/vnd.oasis.opendocument.graphics-template");
        mimeTypeMap.put("odp", "application/vnd.oasis.opendocument.presentation");
        mimeTypeMap.put("otp", "application/vnd.oasis.opendocument.presentation-template");
        mimeTypeMap.put("ods", "application/vnd.oasis.opendocument.spreadsheet");
        mimeTypeMap.put("ots", "application/vnd.oasis.opendocument.spreadsheet-template");
        mimeTypeMap.put("odc", "application/vnd.oasis.opendocument.chart");
        mimeTypeMap.put("odf", "application/vnd.oasis.opendocument.formula");
        mimeTypeMap.put("odb", "application/vnd.oasis.opendocument.database");
        mimeTypeMap.put("odi", "application/vnd.oasis.opendocument.image");
        mimeTypeMap.put("oxt", "application/vnd.openofficeorg.extension");

        // Font Extension
        mimeTypeMap.put("eot", "font/eot");
        mimeTypeMap.put("otf", "font/otf");
        mimeTypeMap.put("ttf", "font/ttf");
        mimeTypeMap.put("woff", "font/woff");
        mimeTypeMap.put("woff2", "font/woff2");

        mimeTypeMaps = Collections.unmodifiableMap(mimeTypeMap);
    }

    public static String getMimeType(String fileName) {
        String extension = getFileExtension(fileName).toLowerCase();
        if(mimeTypeMaps.containsKey(extension)){
            return mimeTypeMaps.get(extension);
        }
        throw new RuntimeException("Can not get mimeType of file");
    }

    public static String getFileExtension(String fileName) {
        int lastIndexOfDot = fileName.lastIndexOf('.');
        if (lastIndexOfDot > 0 && lastIndexOfDot < fileName.length() - 1) {
            return fileName.substring(lastIndexOfDot + 1);
        }
        return "";
    }
}
