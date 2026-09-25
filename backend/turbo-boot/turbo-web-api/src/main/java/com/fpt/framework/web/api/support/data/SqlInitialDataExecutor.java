package com.fpt.framework.web.api.support.data;

import reactor.core.publisher.Mono;

public interface SqlInitialDataExecutor {

    Mono<Void> execute(String table, String data);
}
