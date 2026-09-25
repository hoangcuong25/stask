package com.fpt.framework.data.support.relation;

import com.fpt.framework.data.support.DataIndexCreator;
import com.fpt.framework.data.support.event.DataSourceLoadedEvent;

public class RelationIndexCreator implements DataIndexCreator {
	@Override
	public void datasourceLoaded(DataSourceLoadedEvent event) {
		throw new UnsupportedOperationException("not yet implement");
	}

	@Override
	public void onCheckForIndexes(String tenantId) {
		throw new UnsupportedOperationException("not yet implement");
	}

	@Override
	public boolean isSupported(DataSourceLoadedEvent event) {
		return false;
	}
}
