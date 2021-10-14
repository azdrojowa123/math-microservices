package com.calc.csvvalidate;

import com.calc.survivalcurvedata.dto.request.TestingPerson;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class ValidationService {

    public boolean validate(Map<Integer, Integer> data, int periods) {
        AtomicBoolean correct = new AtomicBoolean(true);
        data.forEach((k, v) -> {
            if (k > periods || k <= 0) {
                correct.set(false);
            }
            if (v != 0 && v != 1) {
                correct.set(false);
            }
        });
        return correct.get();
    }

    public List<TestingPerson> convertData(Map<Integer, Integer> data) {
        List<TestingPerson> convertedData = new ArrayList<>();
        data.forEach((k, v) -> {
            convertedData.add(new TestingPerson(k, v == 1));
        });
        return convertedData;
    }
}
