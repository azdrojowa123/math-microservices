package com.calc.csvvalidate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CsvValidationController {

    @Autowired
    ValidationService validationService;

    @PostMapping(path = "/csv-data/validate/{periods}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity validateData(@RequestBody Map<Integer, Integer> csvData, @PathVariable(value = "periods") int periods) {
        boolean result = validationService.validate(csvData, periods);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
