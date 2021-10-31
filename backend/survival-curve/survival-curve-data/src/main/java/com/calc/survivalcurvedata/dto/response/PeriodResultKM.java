package com.calc.survivalcurvedata.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class PeriodResultKM {

    @NonNull
    private int periodNumber;
    private int quantity = 0;
    private int failures = 0;
    private double survivalProbability;
    private double estimatorKM;

    public void incrementQuantity() {
        this.quantity++;
    }

    public void incrementFailures() {
        this.failures++;
    }

    public static double rounds(double value) {
        Double twoDecimalPlaces = BigDecimal.valueOf(value)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
        return twoDecimalPlaces;
    }

    public void calculateSurvivalProbability() {
        if (this.quantity == 0) {
            this.survivalProbability = 0;
        } else {
            this.survivalProbability = rounds((double) (this.quantity - this.failures) / this.quantity);
        }
    }

    public void calculateEstimatorKM(PeriodResultKM previous) {
        this.estimatorKM = rounds(previous.getEstimatorKM() * this.getSurvivalProbability());
    }
}
