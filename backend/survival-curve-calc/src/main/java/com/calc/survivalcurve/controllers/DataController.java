package com.calc.survivalcurve.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.calc.survivalcurve.model.request.TestingPerson;
import com.calc.survivalcurve.model.response.PeriodResultKM;
import com.calc.survivalcurve.services.EstimatorCalcService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DataController {

  @Autowired
  EstimatorCalcService estimatorCalcService;

  @PostMapping(path="/estimator/{periods}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<PeriodResultKM>> fetchOrganization(@RequestBody List<TestingPerson> testingPersonList, @PathVariable(value = "periods") int periods){
    return new ResponseEntity(estimatorCalcService.generateEstimatorResults(testingPersonList,periods), HttpStatus.OK);
  }
}
