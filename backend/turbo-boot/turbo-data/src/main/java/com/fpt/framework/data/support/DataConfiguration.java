package com.fpt.framework.data.support;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class DataConfiguration {
	public static final String PROPERTY_DB_PLATFORM = "turbo.data.platform";
	private static DataConfiguration instance;
	private final Map<String, Boolean> configurations = new ConcurrentHashMap<>();

	public DataConfiguration() {
	}

	public static DataConfiguration getInstance() {
		if (instance == null) {
			synchronized (DataConfiguration.class) {
				instance = new DataConfiguration();
			}
		}
		return instance;
	}

	public boolean isMultiTenant(String platform) {
		Boolean isMultitenant = configurations.get(platform);
		if (isMultitenant != null) {
			return isMultitenant;
		}
		return false;
	}

	public void setPlatformDbConfiguration(String platform, boolean isMultitenant) {
		this.configurations.put(platform, isMultitenant);
	}
}
