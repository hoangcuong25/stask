package com.swork;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class SworkApplication {

    public static void main(String[] args) {
        SpringApplication.run(SworkApplication.class, args);
    }
}
