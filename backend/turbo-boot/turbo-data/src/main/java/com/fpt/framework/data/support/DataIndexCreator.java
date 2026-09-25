package com.fpt.framework.data.support;

import com.fpt.framework.data.support.event.DataSourceLoadedEvent;

public interface DataIndexCreator {

    void datasourceLoaded(DataSourceLoadedEvent event);

    void onCheckForIndexes(String tenantId);

    boolean isSupported(DataSourceLoadedEvent event);
}
