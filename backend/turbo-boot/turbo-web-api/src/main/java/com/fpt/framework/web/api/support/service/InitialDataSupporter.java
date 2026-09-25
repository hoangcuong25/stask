package com.fpt.framework.web.api.support.service;


import com.fpt.framework.web.api.support.DataInitialResource;
import com.fpt.framework.web.api.support.data.SqlInitialDataExecutor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.concurrent.CompletableFuture;


@Slf4j
public class InitialDataSupporter {

    private final DataInitialResource dataInitialResource;

    private final SqlInitialDataExecutor sqlExecutor;

    public InitialDataSupporter(SqlInitialDataExecutor sqlExecutor, DataInitialResource dataInitialResource) {
        this.dataInitialResource = dataInitialResource;
        this.sqlExecutor = sqlExecutor;
    }

    public Mono<Void> setupDatabase() {
        var stream = CompletableFuture.completedFuture(dataInitialResource.getResourceData());
        return Mono.fromFuture(stream).flatMapMany(Flux::fromIterable).flatMap(resource -> {
            String fileName = resource.getFilename();
            String table = FilenameUtils.removeExtension(fileName);
            log.trace("Load Resource file: %s".formatted(fileName));
            try {
                String data = resource.getContentAsString(Charset.defaultCharset());
                return sqlExecutor.execute(table, data);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).then();
    }
}
