package com.fpt.framework.security.v2.support;

import java.util.Map;

public interface AttributeExtractor<T> {

	boolean supports(Object object);

	Map<String, String> extract(T object);

	default int getOrder() {
		return 0;
	}
}
