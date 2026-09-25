package com.fpt.framework.logger.support;

import reactor.util.context.ContextView;

@FunctionalInterface
public interface LogContextConvertor<T> {

     String resolve(T contextValue);
}
