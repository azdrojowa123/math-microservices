package com.calc.csvvalidate.config;

import com.calc.survivalcurvedata.dto.request.TestingPerson;
import com.calc.survivalcurvedata.dto.response.PeriodResultKM;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "survival-curve-service", url = "http://survival-curve-service:8080")
//@FeignClient(name = "survival-curve-service", url = "http://localhost:8080")
public interface SurvivalCurveClient {

    @PostMapping("/estimator/{periods}")
    ResponseEntity<List<PeriodResultKM>> getSurvivalCurveResults(@RequestBody List<TestingPerson> testingPersonList, @PathVariable(value = "periods") int periods);
}
