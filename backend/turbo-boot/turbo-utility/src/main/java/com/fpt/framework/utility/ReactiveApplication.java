package com.fpt.framework.utility;

import com.fpt.framework.utility.annotation.ApplicationConfiguration;
import com.fpt.framework.utility.annotation.ApplicationConfigurations;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.annotation.AnnotationUtils;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class ReactiveApplication implements ApplicationContextAware {


    private final List<ApplicationConfiguration> applicationConfigurations = new ArrayList<>();

    private String defaultApplication;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        Map<String, Object> annotatedBeans = applicationContext.getBeansWithAnnotation(ApplicationConfiguration.class);
        annotatedBeans.forEach((key, bean) -> {
            ApplicationConfiguration configuration
                    = AnnotationUtils.findAnnotation(bean.getClass(), ApplicationConfiguration.class);
            if (configuration != null) {
                this.applicationConfigurations.add(configuration);
            }
            ApplicationConfigurations configurations
                    = AnnotationUtils.findAnnotation(bean.getClass(), ApplicationConfigurations.class);
            if (configurations != null) {
                this.applicationConfigurations.addAll(Arrays.asList(configurations.value()));
            }
        });
        String appName = applicationContext.getEnvironment().getProperty("spring.application.name");
        this.defaultApplication = appName != null ? appName : applicationContext.getId();
    }

    public String applicationUnique(String packageName) {
        return this.applicationConfigurations.parallelStream().filter(config -> {
            String[] packages = config.basePackages();
            if (packages.length == 0) {
                return true;
            }
            for (String name : packages) {
                if (packageName.startsWith(name)) {
                    return true;
                }
            }
            return false;
        }).findFirst().map(app -> app.application()).orElse(defaultApplication);
    }

    public Mono<String> applicationUnique() {
        if (applicationConfigurations.size() == 1
                && applicationConfigurations.get(0).basePackages().length == 0) {
            return Mono.just(applicationConfigurations.get(0).application());
        }
        return MethodPointcutContext.currentMethodStack().map(stack -> {
            String packageName = stack.getStack().get(0).getDeclaringClass().getPackageName();
            return this.applicationUnique(packageName);
        }).defaultIfEmpty(defaultApplication);
    }
}
