package com.calc.csvvalidate;

import org.springframework.stereotype.Service;

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
}
