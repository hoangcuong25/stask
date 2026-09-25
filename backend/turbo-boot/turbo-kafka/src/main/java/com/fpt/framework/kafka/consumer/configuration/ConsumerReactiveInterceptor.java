package com.fpt.framework.kafka.consumer.configuration;

import reactor.kafka.receiver.ReceiverRecord;
import reactor.util.context.Context;

public interface ConsumerReactiveInterceptor  {

    default Context intercept(ReceiverRecord<String, ?> record, Context context) {
        return context;
    }
}
