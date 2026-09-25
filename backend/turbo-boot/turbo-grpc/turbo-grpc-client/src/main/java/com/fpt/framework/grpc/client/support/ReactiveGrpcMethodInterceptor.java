package com.fpt.framework.grpc.client.support;

import com.fpt.framework.grpc.GRpcHeaderContext;
import com.fpt.framework.grpc.client.configuration.ClientReactiveInterceptor;
import com.fpt.framework.grpc.client.configuration.GrpcClientInterceptor;
import com.fpt.framework.utility.MethodPointcuts;
import io.grpc.Context;
import lombok.extern.log4j.Log4j2;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.aopalliance.aop.Advice;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.aop.Pointcut;
import org.springframework.aop.PointcutAdvisor;
import org.springframework.aop.framework.AopInfrastructureBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.ReactiveAdapter;
import org.springframework.core.ReactiveAdapterRegistry;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.lang.reflect.Method;

@Log4j2
public class ReactiveGrpcMethodInterceptor implements Ordered, MethodInterceptor, PointcutAdvisor, AopInfrastructureBean {

    private final Pointcut pointcut;

    @Autowired
    private ClientReactiveInterceptor clientReactiveInterceptor;

    public ReactiveGrpcMethodInterceptor() {
        this.pointcut = MethodPointcuts.forFieldHasAnnotation(GrpcClient.class);
    }

    @Override
    public Pointcut getPointcut() {
        return this.pointcut;
    }

    @Override
    public Advice getAdvice() {
        return this;
    }


    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }

    @Override
    public Object invoke(MethodInvocation mi) throws Throwable {
        Method method = mi.getMethod();
        Class<?> type = method.getReturnType();
        ReactiveAdapter adapter = ReactiveAdapterRegistry.getSharedInstance().getAdapter(type);
        if (MethodPointcuts.isMultiValue(type, adapter)) {
            return clientReactiveInterceptor.buildHeaderContext().defaultIfEmpty(GRpcHeaderContext.builder().build())
                    .flatMapMany(header -> {
                        log.trace("Mono: Call grpc with header {}", header);
                Context.current().withValue(GRpcHeaderContext.GRPC_HEADER_CONTEXT_KEY_CONTEXT, header).attach();
                return Flux.defer(() -> MethodPointcuts.proceed(mi));
            });

        } else {
            return clientReactiveInterceptor.buildHeaderContext().defaultIfEmpty(GRpcHeaderContext.builder().build())
                    .flatMap(header -> {
                        log.trace("Flux: Call grpc with header {}", header);
                Context.current().withValue(GRpcHeaderContext.GRPC_HEADER_CONTEXT_KEY_CONTEXT, header).attach();
                return Mono.defer(() -> MethodPointcuts.proceed(mi));
            });
        }
    }
}