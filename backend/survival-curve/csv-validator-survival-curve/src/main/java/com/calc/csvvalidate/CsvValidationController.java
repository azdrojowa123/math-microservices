package com.calc.csvvalidate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.circuitbreaker.CircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.CircuitBreakerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class CsvValidationController {

    @Autowired
    CsvValidationService validationService;

    @Autowired
    SurvivalCurveClient survivalCurveClient;

    @Autowired
    private CircuitBreakerFactory circuitBreakerFactory;


    @PostMapping(path = "/csv-data/calc/{periods}")
    public ResponseEntity calculateCsvData(@RequestBody ArrayList<Integer[]> csvData, @PathVariable(value = "periods") int periods) {
        CircuitBreaker circuitBreaker = circuitBreakerFactory.create("csv-circuit-breaker");
        if (validationService.validate(csvData, periods)) {
            return circuitBreaker.run(() -> survivalCurveClient.getSurvivalCurveResults(validationService.convertData(csvData), periods),
                    throwable -> ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Connection to server responsible for computation of the survival curve is not available"));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Entered CSV data are not correct, please enter data correctly and validate them before send to calculations");
    }

    @PostMapping(path = "/csv-data/validate/{periods}")
    public ResponseEntity<Boolean> validateCsvData(@RequestBody ArrayList<Integer[]> csvData, @PathVariable(value = "periods") int periods) {
        return ResponseEntity.status(HttpStatus.OK).body(validationService.validate(csvData, periods));
    }
}
