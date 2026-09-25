package com.fpt.framework.data.support.model;

import java.sql.SQLException;

public interface TenantDatasource<T> {

    public String getId();

    public T getClient();

    public default void closeConnection() throws SQLException {};

    public DataSourceSetting getDataSourceSetting();

}
