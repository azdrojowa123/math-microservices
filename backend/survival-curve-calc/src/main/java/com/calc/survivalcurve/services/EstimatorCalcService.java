package com.calc.survivalcurve.services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.IntStream;

import org.springframework.stereotype.Service;

import com.calc.survivalcurve.model.request.TestingPerson;
import com.calc.survivalcurve.model.response.PeriodResultKM;

@Service
public class EstimatorCalcService {

  public List<PeriodResultKM> generateEstimatorResults(List<TestingPerson>testingPersonList, int periods){
    List<PeriodResultKM> resultsList = new ArrayList<>();
    //PeriodResultKM[] resultsList = new PeriodResultKM[periods];
    IntStream.rangeClosed(1, periods).forEach(i->{
      PeriodResultKM periodResultKM = new PeriodResultKM(i);
      testingPersonList.stream()
          .filter(p -> p.getDuration()>= i)
          .forEach(p->{
            periodResultKM.incrementQuantity();
            if (p.isOccurrence() && p.getDuration() == i) periodResultKM.incrementFailures();
          });
      resultsList.add(periodResultKM);
    });
    resultsList.forEach(PeriodResultKM::calculateSurvivalProbability);
    Iterator<PeriodResultKM> itr = resultsList.iterator();
    PeriodResultKM previous=itr.next();
    PeriodResultKM current=itr.next();
    previous.setEstimatorKM(previous.getSurvivalProbability());
    while(itr.hasNext()){
      current.calculateEstimatorKM(previous);
      previous=current;
      current=itr.next();
    }
    current.calculateEstimatorKM(previous);
    return resultsList;
  }

}
