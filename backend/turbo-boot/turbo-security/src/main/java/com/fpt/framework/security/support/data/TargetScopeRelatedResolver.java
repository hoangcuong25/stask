package com.fpt.framework.security.support.data;

import java.util.List;

public interface TargetScopeRelatedResolver {

    String getTargetKey();

    default List<Object> resolveRelatedTarget(List<Object> targetValue) {
        return targetValue;
    }
}
