package com.calc.survivalcurve.controllers;

import com.calc.survivalcurve.services.EstimatorCalcService;
import com.calc.survivalcurvedata.dto.request.TestingPerson;
import com.calc.survivalcurvedata.dto.response.PeriodResultKM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class DataController {

    @Autowired
    EstimatorCalcService estimatorCalcService;

    @PostMapping(path = "/estimator/{periods}")
    public ResponseEntity<List<PeriodResultKM>> fetchOrganization(@RequestBody List<TestingPerson> testingPersonList, @PathVariable(value = "periods") int periods) {
        return new ResponseEntity(estimatorCalcService.generateEstimatorResults(testingPersonList, periods), HttpStatus.OK);
    }

    @GetMapping(path = "/readiness/probe")
    public ResponseEntity readinessProbe() {
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}


