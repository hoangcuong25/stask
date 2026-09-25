package com.fpt.framework.kafka;

import org.springframework.boot.autoconfigure.AutoConfigurationImportFilter;
import org.springframework.boot.autoconfigure.AutoConfigurationImportSelector;
import org.springframework.boot.autoconfigure.AutoConfigurationMetadata;
import org.springframework.core.env.Environment;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class AutoConfigurationExclusion extends AutoConfigurationImportSelector implements AutoConfigurationImportFilter {

    private static final String kafkaServerConfig = "spring.kafka.bootstrap-servers";


    private static final Set<Class> disableKafkaExcludeConfig = new HashSet<>(
            Arrays.asList(
                    KafkaAutoConfiguration.class));


    private Set<String> repositoryExclude;

    @Override
    public void setEnvironment(Environment environment) {
        super.setEnvironment(environment);
        String enableKafka = environment.getProperty(kafkaServerConfig);

        Set<Class> exclude = new HashSet<>();
        if (null == enableKafka) {
           exclude = disableKafkaExcludeConfig;
        }
        this.repositoryExclude = exclude.stream().map(c -> c.getCanonicalName()).collect(Collectors.toSet());
    }

    @Override
    public boolean[] match(String[] classNames, AutoConfigurationMetadata metadata) {
        boolean[] matches = new boolean[classNames.length];
        for (int i = 0; i < classNames.length; i++) {
            matches[i] = !repositoryExclude.contains(classNames[i]);
        }
        return matches;
    }


}
