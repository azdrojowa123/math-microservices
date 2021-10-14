package com.calc.csvvalidate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class CsvValidateApplication {

    public static void main(String[] args) {
        SpringApplication.run(CsvValidateApplication.class, args);
    }

}
