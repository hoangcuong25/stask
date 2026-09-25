package com.fpt.framework.data.configuration;

import com.fpt.framework.data.support.DataConfiguration;
import com.fpt.framework.data.support.model.DataSourceSetting;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.AutoConfigurationImportFilter;
import org.springframework.boot.autoconfigure.AutoConfigurationImportSelector;
import org.springframework.boot.autoconfigure.AutoConfigurationMetadata;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoReactiveDataAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoReactiveRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoReactiveAutoConfiguration;
import org.springframework.boot.autoconfigure.r2dbc.R2dbcAutoConfiguration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class AutoConfigurationExclusion extends AutoConfigurationImportSelector implements AutoConfigurationImportFilter {
    private static final Logger log = LoggerFactory.getLogger(AutoConfigurationExclusion.class);

    private static final Set<Class<?>> noneRelationDbAutoConfiguration = new HashSet<>(
            Arrays.asList(
                    DataSourceAutoConfiguration.class,
                    MongoAutoConfiguration.class,
                    MongoReactiveAutoConfiguration.class,
                    AbstractMongoClientConfiguration.class,
                    MongoDataAutoConfiguration.class,
                    MongoRepositoriesAutoConfiguration.class,
                    MongoReactiveDataAutoConfiguration.class,
                    MongoReactiveRepositoriesAutoConfiguration.class));
    private static final Set<Class<?>> r2dbAutoConfiguration = new HashSet<>(
            Arrays.asList(
                    MongoRepositoriesAutoConfiguration.class,
                    R2dbcAutoConfiguration.class,
                    DataSourceAutoConfiguration.class));

    private final Set<String> repositoryExclude = new HashSet<>();

    @Override
    public void setEnvironment(Environment environment) {
        repositoryExclude.add(MongoAutoConfiguration.class.getCanonicalName());
        super.setEnvironment(environment);
        Map<String, Set<Class<?>>> excludeAutoConfigMap = new HashMap<>();
        excludeAutoConfigMap.put(DataSourceSetting.DB_PLATFORM_MONGODB, noneRelationDbAutoConfiguration);
        excludeAutoConfigMap.put(DataSourceSetting.DB_PLATFORM_MYSQL, r2dbAutoConfiguration);
        excludeAutoConfigMap.put(DataSourceSetting.DB_PLATFORM_CLICKHOUSE, r2dbAutoConfiguration);
        excludeAutoConfigMap.put(DataSourceSetting.DB_PLATFORM_POSTGRESQL, r2dbAutoConfiguration);
        String platform = environment.getProperty(DataConfiguration.PROPERTY_DB_PLATFORM);
        List<String> platforms = new ArrayList<>();
        log.trace("not config platform, in {}, try to get config single tenant", DataConfiguration.PROPERTY_DB_PLATFORM);
        DataConfiguration dataConfiguration = DataConfiguration.getInstance();
        if (environment.getProperty("spring.data.mongodb.uri") != null) {
            log.trace("mongodb is running single tenant");
            platforms.add(DataSourceSetting.DB_PLATFORM_MONGODB);
        }
        if (environment.getProperty("spring.r2dbc.url") != null) {
            log.trace("r2dbc is running single tenant");
            platforms.add(DataSourceSetting.DB_PLATFORM_MYSQL);
        }
        if (null != platform) {
            platforms.addAll(Arrays.asList(StringUtils.tokenizeToStringArray(platform, ";")));
        }
        log.trace("Database Platform config: {}", platforms);
        for (String plf: platforms) {
            excludeAutoConfigMap.remove(plf);
            dataConfiguration.setPlatformDbConfiguration(plf, true);
        }
        for (Map.Entry<String, Set<Class<?>>> entry: excludeAutoConfigMap.entrySet()) {
            this.repositoryExclude.addAll(entry.getValue().stream().map(Class::getCanonicalName).collect(Collectors.toSet()));
        }
        log.trace("Exclude Auto configuration: {}", this.repositoryExclude);
    }

    @Override
    public boolean[] match(String[] classNames, AutoConfigurationMetadata metadata) {
        boolean[] matches = new boolean[classNames.length];
        for (int i = 0; i < classNames.length; i++) {
            matches[i] = !repositoryExclude.contains(classNames[i]);
        }
        return matches;
    }

}
