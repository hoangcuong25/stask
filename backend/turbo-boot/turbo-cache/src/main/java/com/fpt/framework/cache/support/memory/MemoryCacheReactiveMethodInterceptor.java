package com.fpt.framework.cache.support.memory;

import com.fpt.framework.cache.annotation.CoreCacheable;
import com.fpt.framework.cache.annotation.MemoryCacheable;
import com.fpt.framework.utility.AnnotationUtility;
import com.fpt.framework.utility.MethodPointcuts;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.aopalliance.aop.Advice;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.reactivestreams.Publisher;
import org.springframework.aop.Pointcut;
import org.springframework.aop.PointcutAdvisor;
import org.springframework.aop.framework.AopInfrastructureBean;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.core.Ordered;
import org.springframework.core.ReactiveAdapter;
import org.springframework.core.ReactiveAdapterRegistry;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.lang.reflect.Method;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Slf4j
@Getter
public class MemoryCacheReactiveMethodInterceptor implements Ordered, MethodInterceptor, PointcutAdvisor, AopInfrastructureBean {


    private final Pointcut pointcut;

    @Setter
    private int order;

    private final CacheManager cacheManager;
    private final String cacheStoreName;
    private final KeyGenerator keyGenerator;


    public MemoryCacheReactiveMethodInterceptor(CacheManager cacheManager,
                                                KeyGenerator keyGenerator,
                                                String cacheStoreName) {
        this.order = HIGHEST_PRECEDENCE;
        this.pointcut = MethodPointcuts.forAnnotations(MemoryCacheable.class);
        this.cacheManager = cacheManager;
        this.cacheStoreName = cacheStoreName;
        this.keyGenerator = keyGenerator;
    }

    @Override
    public Object invoke(MethodInvocation mi) {
        Method method = mi.getMethod();
        Class<?> type = method.getReturnType();
        ReactiveAdapter adapter = ReactiveAdapterRegistry.getSharedInstance().getAdapter(type);
        MemoryCacheable memoryCacheable = method.getAnnotation(MemoryCacheable.class);
        var target = mi.getThis();
        var args = mi.getArguments();
        Object keyGenerated = this.getKeyGenerator().generate(target, method, args);
        Publisher result;
        if (MethodPointcuts.isMultiValue(type, adapter)) {
            if (keyGenerated instanceof Mono<?> keyContext) {
                result = keyContext.flatMapMany(key -> buildFluxProcessCache(mi, key.toString(), memoryCacheable));
            } else {
                String key = keyGenerated.toString();
                result = buildFluxProcessCache(mi, key, memoryCacheable);
            }
        } else {
            if (keyGenerated instanceof Mono<?> keyContext) {
                result = keyContext.flatMap(key -> buildMonoProcessCache(mi, key.toString(), memoryCacheable));
            } else {
                String key = keyGenerated.toString();
                result = buildMonoProcessCache(mi, key, memoryCacheable);
            }
        }
        return MethodPointcuts.adaptPublisher(adapter, result);
    }

    @Override
    public Advice getAdvice() {
        return this;
    }

    private Mono buildMonoProcessCache(MethodInvocation mi, String key, MemoryCacheable memoryCacheable) {
        CaffeineCache cacheStore = (CaffeineCache) cacheManager.getCache(this.cacheStoreName);
        Map<Object, Object> cache = cacheStore.getNativeCache().asMap();
        if (cache.containsKey(key)) {
            log.trace("Memory cache for Mono has key: {}", key);
            return Mono.just(cache.get(key));
        }
        CoreCacheable.ExpireConfig expiration = memoryCacheable.expire();
        return ((Mono<?>)MethodPointcuts.proceed(mi)).doOnSuccess(e -> {
            log.trace("Memory cache for Mono put key: {}, value: {}", key, e);
            putCache(cacheStore, key, e, expiration);
        });
    }

    private Flux buildFluxProcessCache(MethodInvocation mi, String key, MemoryCacheable memoryCacheable) {
        CaffeineCache cacheStore = (CaffeineCache) cacheManager.getCache(this.cacheStoreName);
        Map<Object, Object> cache = cacheStore.getNativeCache().asMap();
        if (cache.containsKey(key)) {
            log.trace("Memory cache for Flux has key: {}", key);
            return Flux.fromIterable((List) cache.get(key));
        }
        log.trace("Memory cache for Flux have no key: {}", key);
        CoreCacheable.ExpireConfig expiration = memoryCacheable.expire();
        return ((Flux<?>)MethodPointcuts.proceed(mi))
                .collect(Collectors.toList())
                .flatMapMany(e -> {
                    log.trace("Memory cache for Flux put key: {}, value: {}", key, e);
                    putCache(cacheStore, key, e, expiration);
                    return Flux.fromIterable(e);
                });
    }

    private void putCache(CaffeineCache cacheStore, String key, Object value, CoreCacheable.ExpireConfig expiration) {
        Duration duration = createDuration(expiration.expireAfterWrite(), expiration.unit());
        cacheStore.put(key, value);
        cacheStore.getNativeCache().policy()
                .expireVariably()
                .ifPresent(policy -> policy.put(key, value, duration));
    }
    private Duration createDuration(long x, TimeUnit timeUnit) {
        long millis = timeUnit.toMillis(x);
        return Duration.ofMillis(millis);
    }

}
