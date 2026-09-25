package com.fpt.framework.data.support.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class DataSourceSetting {
    public static final String DB_PLATFORM_MYSQL = "mysql";
    public static final String DB_PLATFORM_MONGODB = "mongodb";
    public static final String DB_PLATFORM_CLICKHOUSE = "clickhouse";
    public static final String DB_PLATFORM_POSTGRESQL = "postgresql";

    private String url;

    private String tenantId;

    private String databasePlatform;

    private String dllAuto;

    private String application;

    private String database;
}
