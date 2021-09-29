package com.calc.survivalcurve.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.calc.survivalcurve.model.request.TestingPerson;
import com.calc.survivalcurve.model.response.PeriodResultKM;
import com.calc.survivalcurve.services.EstimatorCalcService;

@RestController()
public class DataController {

  @Autowired
  EstimatorCalcService estimatorCalcService;

  @PostMapping("/estimator/{periods}")
  public ResponseEntity<List<PeriodResultKM>> fetchOrganization(@RequestBody List<TestingPerson> testingPersonList, @PathVariable(value = "periods") int periods){
    return new ResponseEntity(estimatorCalcService.generateEstimatorResults(testingPersonList,periods), HttpStatus.OK);
  }
}
