package com.fpt.framework.logger.configuration;


import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.encoder.PatternLayoutEncoder;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.Appender;
import ch.qos.logback.core.OutputStreamAppender;
import com.fpt.framework.logger.support.LogContextConvertor;
import com.fpt.framework.logger.support.LogLayoutConvertor;
import lombok.extern.log4j.Log4j2;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Iterator;
import java.util.Map;

@Configuration
@Log4j2
public class LogConfiguration implements CommandLineRunner {


    @Autowired
    private LogLayoutConvertor logConverters;

    public void configureLog() {

        Map<String, LogContextConvertor> mapConverter = logConverters.convertorMap();
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, LogContextConvertor> entry : mapConverter.entrySet()) {
            sb.append("%%X{%s}".formatted(entry.getKey()));
        }
        // Get the root logger and set level and appender
        Logger rootLogger = (Logger) LoggerFactory.getLogger(Logger.ROOT_LOGGER_NAME);
        for (Iterator<Appender<ILoggingEvent>> it = rootLogger.iteratorForAppenders(); it.hasNext(); ) {
            Appender<ILoggingEvent> appender = it.next();

            if (appender instanceof OutputStreamAppender<ILoggingEvent> outputStreamAppender) {
                if (outputStreamAppender.getEncoder() instanceof PatternLayoutEncoder patternLayoutEncoder) {
                    String pattern = patternLayoutEncoder.getPattern();
                    patternLayoutEncoder.setPattern(sb.append(pattern).toString());
                    patternLayoutEncoder.start();
                }
            }
        }
    }

    @Override
    public void run(String... args) throws Exception {
        this.configureLog();
    }
}
