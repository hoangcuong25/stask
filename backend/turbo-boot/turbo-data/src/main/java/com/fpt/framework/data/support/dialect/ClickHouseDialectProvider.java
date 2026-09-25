package com.fpt.framework.data.support.dialect;

import io.r2dbc.spi.ConnectionFactory;
import org.springframework.data.r2dbc.dialect.DialectResolver;
import org.springframework.data.r2dbc.dialect.MySqlDialect;
import org.springframework.data.r2dbc.dialect.R2dbcDialect;

import java.util.Optional;

public class ClickHouseDialectProvider implements DialectResolver.R2dbcDialectProvider {

    @Override
    public Optional<R2dbcDialect> getDialect(ConnectionFactory factory) {
        String name = factory.getMetadata().getName();
        if (name != null && name.toLowerCase().contains("clickhouse")) {
            return Optional.of(MySqlDialect.INSTANCE);
        }
        return Optional.empty();
    }
}
