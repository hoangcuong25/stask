package com.fpt.framework.data.support.event;

import com.fpt.framework.data.support.model.TenantDatasource;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
public class DataSourceLoadedEvent  extends ApplicationEvent {
    private String tenantId;
    private TenantDatasource source;

    public DataSourceLoadedEvent(String tenantId, TenantDatasource source) {
        super(source);
        this.tenantId = tenantId;
        this.source = source;
    }
}
