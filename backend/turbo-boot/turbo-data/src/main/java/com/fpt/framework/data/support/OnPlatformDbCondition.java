package com.fpt.framework.data.support;

import com.fpt.framework.data.support.annotation.ConditionalOnPlatformDb;
import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.List;

public class OnPlatformDbCondition implements Condition {

	@Override
	public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
		// Retrieve the 'turbo.data.platform' property
		String platform = context.getEnvironment().getProperty(DataConfiguration.PROPERTY_DB_PLATFORM);

		if (platform != null) {
			// Get the required platform(s) from the annotation
			String[] requiredPlatforms = (String[]) metadata.getAnnotationAttributes(ConditionalOnPlatformDb.class.getCanonicalName()).get("value");

			// Split the active platform string by ';' and check if any required platform is present
			List<String> activePlatforms = Arrays.asList(StringUtils.tokenizeToStringArray(platform, ";"));
			return Arrays.stream(requiredPlatforms).anyMatch(activePlatforms::contains);
		}

		return false;
	}
}