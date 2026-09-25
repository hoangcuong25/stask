package com.fpt.framework.logger.support;

import java.util.Map;

@FunctionalInterface
public interface LogLayoutConvertor {

    Map<String, LogContextConvertor> convertorMap();
}
