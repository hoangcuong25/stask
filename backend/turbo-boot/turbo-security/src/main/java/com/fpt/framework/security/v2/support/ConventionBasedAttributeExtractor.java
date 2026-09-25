package com.fpt.framework.security.v2.support;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.beanutils.PropertyUtils;
import org.springframework.data.annotation.Transient;
import org.springframework.stereotype.Component;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class ConventionBasedAttributeExtractor implements AttributeExtractor<Object> {

	private static final Map<Class<?>, PropertyMetadata> METADATA_CACHE = new ConcurrentHashMap<>();

	private static final Set<String> DEFAULT_BLACKLIST = Set.of(
			"class",           // getClass() - not useful
			"password",        // Security
			"secretKey",       // Security
			"privateKey",      // Security
			"accessToken",     // Security
			"refreshToken"     // Security
	);

	@Override
	public boolean supports(Object object) {
		// Supports ALL objects (universal)
		return object != null;
	}

	@Override
	public Map<String, String> extract(Object object) {
		Map<String, String> attributes = new HashMap<>();

		try {
			PropertyMetadata metadata = getOrBuildMetadata(object.getClass());

			for (PropertyRule rule : metadata.rules) {
				extractProperty(object, rule, attributes);
			}

			log.trace("Convention-based extractor extracted {} attributes from {}",
					attributes.size(), object.getClass().getSimpleName());

		} catch (Exception e) {
			log.warn("Failed to extract attributes from {}: {}",
					object.getClass().getSimpleName(), e.getMessage());
		}

		return attributes;
	}

	@Override
	public int getOrder() {
		return 0;
	}

	private PropertyMetadata getOrBuildMetadata(Class<?> clazz) {
		return METADATA_CACHE.computeIfAbsent(clazz, this::buildMetadata);
	}

	private PropertyMetadata buildMetadata(Class<?> clazz) {
		PropertyMetadata metadata = new PropertyMetadata();

		try {
			PropertyDescriptor[] descriptors = PropertyUtils.getPropertyDescriptors(clazz);

			for (PropertyDescriptor descriptor : descriptors) {
				String propertyName = descriptor.getName();
				Method readMethod = descriptor.getReadMethod();

				if (readMethod == null) {
					continue;
				}

				if (DEFAULT_BLACKLIST.contains(propertyName)) {
					log.trace("Skipping blacklisted property: {}", propertyName);
					continue;
				}

				if (readMethod.isAnnotationPresent(JsonIgnore.class)) {
					log.trace("Skipping @JsonIgnore property: {}", propertyName);
					continue;
				}

				if (readMethod.isAnnotationPresent(Transient.class)) {
					log.trace("Skipping @Transient property: {}", propertyName);
					continue;
				}

				PropertyRule rule = new PropertyRule();
				rule.propertyName = propertyName;
				rule.readMethod = readMethod;
				rule.propertyType = descriptor.getPropertyType();

				rule.isDeepExtract = hasDeepExtractMethod(clazz, propertyName);

				metadata.rules.add(rule);
			}

			log.debug("Built metadata for {}: {} extractable properties",
					clazz.getSimpleName(), metadata.rules.size());

		} catch (Exception e) {
			log.warn("Failed to build metadata for {}: {}", clazz.getSimpleName(), e.getMessage());
		}

		return metadata;
	}

	private boolean hasDeepExtractMethod(Class<?> clazz, String propertyName) {
		if ("data".equals(propertyName)) {
			try {
				Method readMethod = clazz.getMethod("getData");
				Class<?> propertyType = readMethod.getReturnType();
				Method getValues = propertyType.getMethod("getValues");
				return Map.class.isAssignableFrom(getValues.getReturnType());
			} catch (NoSuchMethodException e) {
				return false;
			}
		}
		return false;
	}

	private void extractProperty(Object object, PropertyRule rule, Map<String, String> attributes) {
		try {
			Object value = rule.readMethod.invoke(object);

			if (value == null) {
				return;
			}

			if (isPrimitiveOrString(value)) {
				attributes.put(rule.propertyName, value.toString());
			}
			else if (value instanceof Map) {
				extractMapEntries((Map<?, ?>) value, attributes);
			}
			else if (rule.isDeepExtract) {
				deepExtract(value, attributes);
			}
			else if (hasCodeProperty(value)) {
				Object code = extractCodeProperty(value);
				if (code != null) {
					attributes.put(rule.propertyName, code.toString());
				}
			}
			else {
				log.trace("Skipping complex property: {}", rule.propertyName);
			}

		} catch (Exception e) {
			log.trace("Failed to extract property {}: {}", rule.propertyName, e.getMessage());
		}
	}

	private boolean hasCodeProperty(Object object) {
		try {
			object.getClass().getMethod("getCode");
			return true;
		} catch (NoSuchMethodException e) {
			return false;
		}
	}

	private Object extractCodeProperty(Object object) {
		try {
			Method getCode = object.getClass().getMethod("getCode");
			return getCode.invoke(object);
		} catch (Exception e) {
			return null;
		}
	}

	private void extractMapEntries(Map<?, ?> map, Map<String, String> attributes) {
		map.forEach((key, value) -> {
			if (key != null && value != null) {
				attributes.put(key.toString(), value.toString());
			}
		});
	}

	private void deepExtract(Object object, Map<String, String> attributes) {
		try {
			Method getValues = object.getClass().getMethod("getValues");
			Object valuesObj = getValues.invoke(object);

			if (valuesObj instanceof Map) {
				extractMapEntries((Map<?, ?>) valuesObj, attributes);
			}
		} catch (Exception e) {
			log.trace("Failed to deep extract: {}", e.getMessage());
		}
	}

	private boolean isPrimitiveOrString(Object value) {
		return value instanceof String
				|| value instanceof Number
				|| value instanceof Boolean
				|| value instanceof Character
				|| value instanceof java.util.Date
				|| value instanceof java.time.temporal.Temporal // LocalDateTime, etc.
				|| value.getClass().isPrimitive();
	}

	private static class PropertyMetadata {
		List<PropertyRule> rules = new ArrayList<>();
	}

	private static class PropertyRule {
		String propertyName;
		Method readMethod;
		Class<?> propertyType;
		boolean isDeepExtract;
	}
}
