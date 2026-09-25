package com.fpt.framework.security.v2.support;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class GenericReflectionAttributeExtractor implements AttributeExtractor<Object> {

	@Override
	public boolean supports(Object object) {
		return object != null;
	}

	@Override
	public Map<String, String> extract(Object object) {
		Map<String, String> attributes = new HashMap<>();

		try {
			Method[] methods = object.getClass().getMethods();
			for (Method method : methods) {
				String methodName = method.getName();

				if ((methodName.startsWith("get") || methodName.startsWith("is"))
						&& method.getParameterCount() == 0
						&& !methodName.equals("getClass")) {

					try {
						Object value = method.invoke(object);
						if (value != null && isPrimitiveOrString(value)) {
							String fieldName = extractFieldName(methodName);
							attributes.put(fieldName, value.toString());
						}
					} catch (Exception e) {
						log.trace("Failed to invoke {}: {}", methodName, e.getMessage());
					}
				}
			}
		} catch (Exception e) {
			log.debug("Failed to extract generic fields from {}", object.getClass().getSimpleName(), e);
		}

		return attributes;
	}

	@Override
	public int getOrder() {
		return 999;
	}

	private boolean isPrimitiveOrString(Object value) {
		return value instanceof String
				|| value instanceof Number
				|| value instanceof Boolean
				|| value instanceof Character
				|| value.getClass().isPrimitive();
	}

	private String extractFieldName(String methodName) {
		if (methodName.startsWith("get")) {
			String field = methodName.substring(3);
			return Character.toLowerCase(field.charAt(0)) + field.substring(1);
		} else if (methodName.startsWith("is")) {
			String field = methodName.substring(2);
			return Character.toLowerCase(field.charAt(0)) + field.substring(1);
		}
		return methodName;
	}
}
