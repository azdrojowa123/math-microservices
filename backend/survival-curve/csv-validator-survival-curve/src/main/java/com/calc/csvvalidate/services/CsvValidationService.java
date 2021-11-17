package com.calc.csvvalidate.services;

import com.calc.survivalcurvedata.dto.request.TestingPerson;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class CsvValidationService {

    public boolean validate(ArrayList<Integer[]> data, int periods) {
        AtomicBoolean correct = new AtomicBoolean(true);
        data.forEach((k) -> {
            if (k[0] > periods || k[0] <= 0) {
                correct.set(false);
            }
            if (k[1] != 0 && k[1] != 1) {
                correct.set(false);
            }
        });
        return correct.get();
    }

    public List<TestingPerson> convertData(ArrayList<Integer[]> data) {
        List<TestingPerson> convertedData = new ArrayList<>();
        data.forEach((k) -> convertedData.add(new TestingPerson(k[0], k[1] == 1)));
        return convertedData;
    }
}
