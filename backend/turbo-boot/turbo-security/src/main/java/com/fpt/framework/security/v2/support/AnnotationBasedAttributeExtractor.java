package com.fpt.framework.security.v2.support;

import com.fpt.framework.security.v2.annotation.ExtractableAttribute;
import com.fpt.framework.security.v2.annotation.ExtractableEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class AnnotationBasedAttributeExtractor implements AttributeExtractor<Object> {

	private static final Map<Class<?>, FieldMetadata> METADATA_CACHE = new ConcurrentHashMap<>();

	@Override
	public boolean supports(Object object) {
		if (object == null) {
			return false;
		}

		Class<?> clazz = object.getClass();

		ExtractableEntity entityAnnotation = AnnotationUtils.findAnnotation(clazz, ExtractableEntity.class);
		if (entityAnnotation != null) {
			return true;
		}

		for (Field field : getAllFields(clazz)) {
			if (field.isAnnotationPresent(ExtractableAttribute.class)) {
				return true;
			}
		}

		return false;
	}

	@Override
	public Map<String, String> extract(Object object) {
		Map<String, String> attributes = new HashMap<>();

		try {
			Class<?> clazz = object.getClass();
			FieldMetadata metadata = getOrBuildMetadata(clazz);

			for (FieldExtractionRule rule : metadata.rules) {
				extractField(object, rule, attributes);
			}

			log.trace("Annotation-based extractor extracted {} attributes from {}",
					attributes.size(), clazz.getSimpleName());

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

	private FieldMetadata getOrBuildMetadata(Class<?> clazz) {
		return METADATA_CACHE.computeIfAbsent(clazz, this::buildMetadata);
	}

	private FieldMetadata buildMetadata(Class<?> clazz) {
		FieldMetadata metadata = new FieldMetadata();
		ExtractableEntity entityAnnotation = AnnotationUtils.findAnnotation(clazz, ExtractableEntity.class);

		List<Field> allFields = getAllFields(clazz);

		Set<String> blacklist = new HashSet<>();
		Set<String> whitelist = new HashSet<>();

		if (entityAnnotation != null) {
			blacklist.addAll(Arrays.asList(entityAnnotation.exclude()));
			if (entityAnnotation.only().length > 0) {
				whitelist.addAll(Arrays.asList(entityAnnotation.only()));
			}
		}

		for (Field field : allFields) {
			String fieldName = field.getName();

			if (blacklist.contains(fieldName)) {
				continue;
			}

			if (!whitelist.isEmpty() && !whitelist.contains(fieldName)) {
				continue;
			}

			ExtractableAttribute fieldAnnotation = field.getAnnotation(ExtractableAttribute.class);

			boolean shouldExtract = false;

			if (fieldAnnotation != null) {
				shouldExtract = true;
			} else if (entityAnnotation != null && entityAnnotation.extractAll()) {
				shouldExtract = true;
			}

			if (shouldExtract) {
				FieldExtractionRule rule = new FieldExtractionRule();
				rule.field = field;
				rule.fieldAnnotation = fieldAnnotation;
				metadata.rules.add(rule);
			}
		}

		log.debug("Built metadata for {}: {} fields to extract",
				clazz.getSimpleName(), metadata.rules.size());

		return metadata;
	}

	private void extractField(Object object, FieldExtractionRule rule, Map<String, String> attributes) {
		try {
			Field field = rule.field;
			field.setAccessible(true);
			Object value = field.get(object);

			if (value == null) {
				if (rule.fieldAnnotation != null && rule.fieldAnnotation.includeNull()) {
					String attrName = getAttributeName(rule);
					attributes.put(attrName, "");
				}
				return;
			}

			String attrName = getAttributeName(rule);

			if (rule.fieldAnnotation != null && rule.fieldAnnotation.deep()) {
				extractDeep(value, attrName, attributes);
			} else if (rule.fieldAnnotation != null && !rule.fieldAnnotation.property().isEmpty()) {
				String property = rule.fieldAnnotation.property();
				Object propertyValue = extractProperty(value, property);
				if (propertyValue != null) {
					attributes.put(attrName, propertyValue.toString());
				}
			} else {
				if (isPrimitiveOrString(value)) {
					attributes.put(attrName, value.toString());
				} else {
					// Try toString()
					attributes.put(attrName, value.toString());
				}
			}

		} catch (Exception e) {
			log.trace("Failed to extract field {}: {}", rule.field.getName(), e.getMessage());
		}
	}

	private String getAttributeName(FieldExtractionRule rule) {
		if (rule.fieldAnnotation != null && !rule.fieldAnnotation.name().isEmpty()) {
			return rule.fieldAnnotation.name();
		}
		return rule.field.getName();
	}

	private Object extractProperty(Object object, String property) {
		try {
			String getterName = "get" + Character.toUpperCase(property.charAt(0)) + property.substring(1);
			Method getter = object.getClass().getMethod(getterName);
			return getter.invoke(object);
		} catch (NoSuchMethodException e) {
			try {
				String getterName = "is" + Character.toUpperCase(property.charAt(0)) + property.substring(1);
				Method getter = object.getClass().getMethod(getterName);
				return getter.invoke(object);
			} catch (Exception ex) {
				log.trace("No getter found for property: {}", property);
				return null;
			}
		} catch (Exception e) {
			log.trace("Failed to extract property {}: {}", property, e.getMessage());
			return null;
		}
	}

	private void extractDeep(Object object, String prefix, Map<String, String> attributes) {
		try {
			if (object instanceof Map) {
				Map<?, ?> map = (Map<?, ?>) object;
				map.forEach((key, value) -> {
					if (key != null && value != null) {
						attributes.put(key.toString(), value.toString());
					}
				});
				return;
			}

			try {
				Method getValues = object.getClass().getMethod("getValues");
				Object valuesObj = getValues.invoke(object);
				if (valuesObj instanceof Map) {
					extractDeep(valuesObj, prefix, attributes);
					return;
				}
			} catch (NoSuchMethodException e) {
				// No getValues() method, continue with field extraction
			}

			for (Field field : getAllFields(object.getClass())) {
				field.setAccessible(true);
				Object value = field.get(object);
				if (value != null && isPrimitiveOrString(value)) {
					attributes.put(field.getName(), value.toString());
				}
			}

		} catch (Exception e) {
			log.trace("Failed to deep extract from {}: {}", object.getClass().getSimpleName(), e.getMessage());
		}
	}

	private List<Field> getAllFields(Class<?> clazz) {
		List<Field> fields = new ArrayList<>();
		Class<?> current = clazz;

		while (current != null && current != Object.class) {
			fields.addAll(Arrays.asList(current.getDeclaredFields()));
			current = current.getSuperclass();
		}

		return fields;
	}

	private boolean isPrimitiveOrString(Object value) {
		return value instanceof String
				|| value instanceof Number
				|| value instanceof Boolean
				|| value instanceof Character
				|| value.getClass().isPrimitive();
	}

	private static class FieldMetadata {
		List<FieldExtractionRule> rules = new ArrayList<>();
	}

	private static class FieldExtractionRule {
		Field field;
		ExtractableAttribute fieldAnnotation;
	}
}