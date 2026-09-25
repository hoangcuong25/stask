package com.fpt.framework.security.v2.support;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.query.Criteria;
import reactor.core.publisher.Mono;
import reactor.util.context.Context;

import java.util.concurrent.atomic.AtomicBoolean;

public final class AuthzFilterContext {

	public static final String FILTER_CONTEXT_KEY = "Authz-V2-PreBuilt-Filter";

	private AuthzFilterContext() {
	}

	public static Mono<PreBuiltFilter> current() {
		return Mono.deferContextual(Mono::just)
				.filter(ctx -> ctx.hasKey(FILTER_CONTEXT_KEY))
				.map(ctx -> ctx.get(FILTER_CONTEXT_KEY))
				.cast(PreBuiltFilter.class);
	}

	public static Context set(PreBuiltFilter filter, Context context) {
		return context.put(FILTER_CONTEXT_KEY, filter);
	}

	public static final class PreBuiltFilter {

		private final AtomicBoolean consumed = new AtomicBoolean(false);
		@Setter
		@Getter
		private volatile Criteria criteria;

		public void markConsumed() {
			consumed.set(true);
		}

		public boolean isConsumed() {
			return consumed.get();
		}
	}
}
