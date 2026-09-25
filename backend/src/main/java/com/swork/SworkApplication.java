package com.swork;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableReactiveMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

@SpringBootApplication
@EnableReactiveMongoAuditing
@EnableReactiveMongoRepositories
public class SworkApplication {

    public static void main(String[] args) {
        SpringApplication.run(SworkApplication.class, args);
    }
}
