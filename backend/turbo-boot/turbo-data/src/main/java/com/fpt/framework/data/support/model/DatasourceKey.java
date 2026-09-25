package com.fpt.framework.data.support.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Getter
public class DatasourceKey {
	private String tenantId;

	private String platform;
}
