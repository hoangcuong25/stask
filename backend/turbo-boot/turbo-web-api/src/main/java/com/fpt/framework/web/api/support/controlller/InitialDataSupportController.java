package com.fpt.framework.web.api.support.controlller;

import com.fpt.framework.web.api.support.service.InitialDataSupporter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("setup-data")
public class InitialDataSupportController {

    private final InitialDataSupporter initialDataSupporter;
    @Autowired
    public InitialDataSupportController(InitialDataSupporter initialDataSupporter) {
        this.initialDataSupporter = initialDataSupporter;
    }

    @PostMapping
    public Mono<Void> setupDatabase() {
        return initialDataSupporter.setupDatabase();
    }
}
