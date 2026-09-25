package com.fpt.framework.grpc.server.suport;

import com.fpt.framework.grpc.server.GrpcController;
import com.fpt.framework.grpc.server.configuration.ServerReactiveInterceptor;
import com.fpt.framework.utility.MethodPointcuts;
import lombok.Getter;
import lombok.Setter;
import org.aopalliance.aop.Advice;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.reactivestreams.Publisher;
import org.springframework.aop.Pointcut;
import org.springframework.aop.PointcutAdvisor;
import org.springframework.aop.framework.AopInfrastructureBean;
import org.springframework.core.Ordered;
import org.springframework.core.ReactiveAdapter;
import org.springframework.core.ReactiveAdapterRegistry;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.lang.reflect.Method;

@Getter
public class GrpcServerReactiveMethodInterceptor implements Ordered, MethodInterceptor, PointcutAdvisor, AopInfrastructureBean {


    private final Pointcut pointcut;

    @Setter
    private int order;

    private final ServerReactiveInterceptor serverReactiveInterceptor;


    public GrpcServerReactiveMethodInterceptor(ServerReactiveInterceptor serverReactiveInterceptor) {
        this.order = HIGHEST_PRECEDENCE;
        this.pointcut = MethodPointcuts.forReactiveAnnotations(GrpcController.class);
        this.serverReactiveInterceptor = serverReactiveInterceptor;
    }

    @Override
    public Object invoke(MethodInvocation mi) throws Throwable {
        Method method = mi.getMethod();
        Class<?> type = method.getReturnType();
        ReactiveAdapter adapter = ReactiveAdapterRegistry.getSharedInstance().getAdapter(type);
        if (adapter == null) {
            return mi.proceed();
        }
        Publisher<?> result = null;
        if (MethodPointcuts.isMultiValue(type, adapter)) {
            result = Flux.defer(() -> MethodPointcuts.proceed(mi))
                    .contextWrite(context -> this.serverReactiveInterceptor.contextWrite(context));
        } else {
            result = Mono.defer(() -> MethodPointcuts.proceed(mi))
                    .contextWrite(context -> this.serverReactiveInterceptor.contextWrite(context));
        }
        return MethodPointcuts.adaptPublisher(adapter, result);
    }

    @Override
    public Advice getAdvice() {
        return this;
    }

}
