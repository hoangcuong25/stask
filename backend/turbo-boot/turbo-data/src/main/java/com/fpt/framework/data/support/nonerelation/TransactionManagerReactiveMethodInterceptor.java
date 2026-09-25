package com.fpt.framework.data.support.nonerelation;

import com.fpt.framework.data.support.annotation.ReactiveTransactional;
import com.fpt.framework.utility.MethodPointcuts;
import com.mongodb.ClientSessionOptions;
import com.mongodb.reactivestreams.client.ClientSession;
import lombok.Getter;
import lombok.Setter;
import org.aopalliance.aop.Advice;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.reactivestreams.Publisher;
import org.springframework.aop.Pointcut;
import org.springframework.aop.PointcutAdvisor;
import org.springframework.aop.framework.AopInfrastructureBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.ReactiveAdapter;
import org.springframework.core.ReactiveAdapterRegistry;
import org.springframework.data.mongodb.ReactiveMongoDatabaseFactory;
import org.springframework.data.mongodb.SessionSynchronization;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.util.Assert;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.lang.reflect.Method;

public class TransactionManagerReactiveMethodInterceptor implements Ordered, MethodInterceptor,
        PointcutAdvisor, AopInfrastructureBean {

    @Getter
    @Setter
    private final Pointcut pointcut;

    @Autowired
    private ReactiveMongoDatabaseFactory reactiveMongoDatabaseFactory;

    private ReactiveMongoTemplate template;


    @Setter
    @Getter
    private int order;

    public TransactionManagerReactiveMethodInterceptor(ReactiveMongoTemplate template) {
        this.pointcut =
                MethodPointcuts.forAnnotations(ReactiveTransactional.class);
        this.order = HIGHEST_PRECEDENCE;
        this.template = template;
        this.template.setSessionSynchronization(SessionSynchronization.ALWAYS);
    }

    public TransactionManagerReactiveMethodInterceptor(Pointcut pointcut) {
        Assert.notNull(pointcut, "pointcut cannot be null");
        this.order = HIGHEST_PRECEDENCE;
        this.pointcut = pointcut;
    }

    @Override
    public Object invoke(MethodInvocation mi) {

        Method method = mi.getMethod();
        Class<?> type = method.getReturnType();
        ReactiveAdapter adapter = ReactiveAdapterRegistry.getSharedInstance().getAdapter(type);
            var sessionHandle = reactiveMongoDatabaseFactory.getSession(ClientSessionOptions.builder()
                .causallyConsistent(true)
                .build());

        Publisher<?> result;
        if (MethodPointcuts.isMultiValue(type, adapter)) {
//            result = sessionHandle.flatMapMany(session ->
////                    template.withSession(() -> session)
//                            .execute(action -> Flux.defer(() -> MethodPointcuts.proceed(mi))));
            result = sessionHandle.flatMap(session -> {
                session.startTransaction();

                return Mono.from(Mono.defer(() -> MethodPointcuts.proceed(mi)))

                        .onErrorResume(e -> Mono.from(session.abortTransaction()).then(Mono.error(e)))

                        .flatMap(val -> Mono.from(session.commitTransaction()).then(Mono.just(val)))

                        .doFinally(signal -> session.close());
            });
        } else {
            result = sessionHandle.flatMap(session -> {
                session.startTransaction();

                return Mono.defer(() -> MethodPointcuts.proceed(mi))

                        .onErrorResume(e -> Mono.from(session.abortTransaction()).then(Mono.error(e)))

                        .flatMap(val -> Mono.from(session.commitTransaction()).then(Mono.just(val)))

                        .doFinally(signal -> session.close());
            });
//            result = sessionHandle.flatMapMany(session -> template.withSession(session)
//                    .execute(action -> Mono.defer(() -> MethodPointcuts.proceed(mi)), ClientSession::close));
        }
        return adapter != null ? adapter.fromPublisher(result) : result;
    }


    @Override
    public Advice getAdvice() {
        return this;
    }
}