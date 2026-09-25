package com.fpt.framework.data.dql.resolver;

import com.fpt.framework.data.dql.exception.DqlVariableException;
import com.fpt.framework.security.model.UserPrincipal;
import com.fpt.framework.security.support.AuthenticationContext;
import lombok.extern.log4j.Log4j2;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Supplier;

@Log4j2
public class VariableResolver {
	private final Map<String, Supplier<Mono<Object>>> providers = new HashMap<>();

	public VariableResolver() {
		this(List.of());
	}

	public VariableResolver(List<VariableProvider> providers) {
		registerBuiltInVariables();
		for (VariableProvider provider : providers) {
			provider.getVariables().forEach(this::register);
		}
	}

	private void registerBuiltInVariables() {
		providers.put("currentUser", () -> AuthenticationContext.currentUserPrincipal().map(UserPrincipal::getUniqueName));
		providers.put("now", () -> Mono.just(LocalDateTime.now()));
		providers.put("today", () -> Mono.just(LocalDate.now()));
		providers.put("yesterday", () -> Mono.just(LocalDate.now().minusDays(1)));
		providers.put("tomorrow", () -> Mono.just(LocalDate.now().plusDays(1)));
	}

	private void register(String name, Supplier<Mono<Object>> provider) {
		if (providers.containsKey(name)) {
			log.warn("VariableResolver: overriding existing variable '${}'", name);
		}
		providers.put(name, provider);
	}

	public Mono<Boolean> has(String name) {
		return Mono.just(providers.containsKey(name));
	}

	public Mono<Object> resolve(String name) {
		log.debug("Resolving variable: ${}", name);

		Supplier<Mono<Object>> provider = providers.get(name);

		if (provider == null) {
			log.warn("Unknown variable: ${}", name);
			return Mono.error(new DqlVariableException(name));
		}

		return provider.get()
				.doOnNext(value -> log.debug("Resolved ${} = {}", name, value))
				.doOnError(e -> log.warn("Failed to resolve ${}: {}", name, e.getMessage()));
	}
}
