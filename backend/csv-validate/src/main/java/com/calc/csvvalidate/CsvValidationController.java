package com.calc.csvvalidate;

import com.calc.survivalcurvedata.dto.request.TestingPerson;
import com.calc.survivalcurvedata.dto.response.PeriodResultKM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CsvValidationController {

    @Autowired
    ValidationService validationService;

    @Autowired
    SurvivalCurveClient survivalCurveClient;

    @PostMapping(path = "/csv-data/validate/{periods}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity validateData(@RequestBody Map<Integer, Integer> csvData, @PathVariable(value = "periods") int periods) {
        boolean result = validationService.validate(csvData, periods);
        List<TestingPerson> temp = new ArrayList<>();
        temp.add(new TestingPerson(3, true));
        temp.add(new TestingPerson(4, true));
        temp.add(new TestingPerson(10, true));
        temp.add(new TestingPerson(11, false));
        List<PeriodResultKM> results = survivalCurveClient.getSurvivalCurveResults(temp, 12).getBody();
        System.out.println(results);
        System.out.println("results");
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
