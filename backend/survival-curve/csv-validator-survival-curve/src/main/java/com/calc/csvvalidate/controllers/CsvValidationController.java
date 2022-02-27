package com.calc.csvvalidate.controllers;

import com.calc.csvvalidate.config.SurvivalCurveClient;
import com.calc.csvvalidate.services.CsvValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.circuitbreaker.CircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.CircuitBreakerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class CsvValidationController {

    @Autowired
    CsvValidationService validationService;

    @Autowired
    SurvivalCurveClient survivalCurveClient;

    @Autowired
    CircuitBreakerFactory circuitBreakerFactory;


    @PostMapping(path = "/csv-data/calc/{periods}")
    public ResponseEntity calculateCsvData(@RequestBody ArrayList<Integer[]> csvData, @PathVariable(value = "periods") int periods) {
        CircuitBreaker circuitBreaker = circuitBreakerFactory.create("csv-circuit-breaker");
        if (validationService.validate(csvData, periods)) {
            return circuitBreaker.run(() -> ResponseEntity.status(HttpStatus.OK).body(survivalCurveClient.getSurvivalCurveResults(validationService.convertData(csvData), periods).getBody()),
                    throwable -> ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("Connection to server responsible for computation of the survival curve is not available"
                    ));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Entered CSV data are not correct, please enter data correctly and validate them before send to calculations");
    }

    @PostMapping(path = "/csv-data/validate/{periods}")
    public ResponseEntity<Boolean> validateCsvData(@RequestBody ArrayList<Integer[]> csvData, @PathVariable(value = "periods") int periods) {
        return ResponseEntity.status(HttpStatus.OK).body(validationService.validate(csvData, periods));
    }

    @GetMapping(path = "/readiness/probe")
    public ResponseEntity readinessProbe() {
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
