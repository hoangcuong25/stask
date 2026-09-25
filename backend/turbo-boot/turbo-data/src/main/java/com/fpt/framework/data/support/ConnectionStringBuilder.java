package com.fpt.framework.data.support;

import com.fpt.framework.data.support.model.DataSourceSetting;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
@Setter
public class ConnectionStringBuilder {

    private static final String segmentSource = "${source}";

    public String buildUrlConnection(DataSourceSetting dataSourceSetting) {
        String url = dataSourceSetting.getUrl();
        if (StringUtils.isNotBlank(dataSourceSetting.getDatabase())) {
            return url.replace(segmentSource, dataSourceSetting.getDatabase());
        }
        return url.replace(segmentSource, String.format("%s-%s", dataSourceSetting.getTenantId(), dataSourceSetting.getApplication()));
    }
}
