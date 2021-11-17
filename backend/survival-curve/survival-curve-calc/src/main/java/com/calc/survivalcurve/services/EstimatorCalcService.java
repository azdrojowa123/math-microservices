package com.calc.survivalcurve.services;

import com.calc.survivalcurvedata.dto.request.TestingPerson;
import com.calc.survivalcurvedata.dto.response.PeriodResultKM;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.IntStream;

@Service
public class EstimatorCalcService {

    public List<PeriodResultKM> generateEstimatorResults(List<TestingPerson> testingPersonList, int periods) {
        List<PeriodResultKM> resultsList = new ArrayList<>();
        IntStream.rangeClosed(1, periods).forEach(i -> {
            PeriodResultKM periodResultKM = new PeriodResultKM(i);
            testingPersonList.stream()
                    .filter(p -> p.getDuration() >= i)
                    .forEach(p -> {
                        periodResultKM.incrementQuantity();
                        if (p.isOccurrence() && p.getDuration() == i) periodResultKM.incrementFailures();
                    });
            resultsList.add(periodResultKM);
        });
        resultsList.forEach(PeriodResultKM::calculateSurvivalProbability);
        Iterator<PeriodResultKM> itr = resultsList.iterator();
        PeriodResultKM previous = itr.next();
        PeriodResultKM current = itr.next();
        previous.setEstimatorKM(previous.getSurvivalProbability());
        while (itr.hasNext()) {
            current.calculateEstimatorKM(previous);
            previous = current;
            current = itr.next();
        }
        current.calculateEstimatorKM(previous);
        return resultsList;
    }
}



