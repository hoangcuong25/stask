package com.fpt.framework.data.support.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PoolConfiguration {
	private static final int DEFAULT_MAX_SIZE = 10;
	private static final int DEFAULT_MIN_IDLE = 1;
	private static final long DEFAULT_MAX_IDLE_TIME = 60;
	private static final long DEFAULT_MAX_LIFETIME = 0;
	private static final long DEFAULT_MAX_ACQUIRE_TIME = 30;
	private static final long DEFAULT_MAX_CREATE_TIME = 10;
	private static final String VALIDATE_QUERY = "SELECT 1";
	private static final int DEFAULT_ACQUIRE_RETRY = 2;
	private static final long DEFAULT_BACKGROUND_EVICTION_INTERVAL = 30;

	private int maxSize = DEFAULT_MAX_SIZE;

	private int minIdle = DEFAULT_MIN_IDLE;

	private long maxIdleTime = DEFAULT_MAX_IDLE_TIME;

	private long maxLifetime = DEFAULT_MAX_LIFETIME;

	private long maxAcquireTime = DEFAULT_MAX_ACQUIRE_TIME;

	private long maxCreateTime = DEFAULT_MAX_CREATE_TIME;

	private String validationQuery = VALIDATE_QUERY;

	private int acquireRetry = DEFAULT_ACQUIRE_RETRY;

	private long backgroundEvictionInterval = DEFAULT_BACKGROUND_EVICTION_INTERVAL;
}

