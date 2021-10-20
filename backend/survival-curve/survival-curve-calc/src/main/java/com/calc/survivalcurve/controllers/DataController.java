package com.calc.survivalcurve.controllers;

import com.calc.survivalcurve.services.EstimatorCalcService;
import com.calc.survivalcurvedata.dto.request.TestingPerson;
import com.calc.survivalcurvedata.dto.response.PeriodResultKM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DataController {

    @Autowired
    EstimatorCalcService estimatorCalcService;

    @PostMapping(path = "/estimator/{periods}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PeriodResultKM>> fetchOrganization(@RequestBody List<TestingPerson> testingPersonList, @PathVariable(value = "periods") int periods) {
        for(int i = 0; i<testingPersonList.size(); i++){
            System.out.println(testingPersonList.get(i).getDuration() + "  ");
        }
        return new ResponseEntity(estimatorCalcService.generateEstimatorResults(testingPersonList, periods), HttpStatus.OK);
    }
}
