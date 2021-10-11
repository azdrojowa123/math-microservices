package com.calc.survivalcurve.model.response;

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

    public static double rounds(double value) {
        Double threeDecimalPlaces = BigDecimal.valueOf(value)
                .setScale(3, RoundingMode.HALF_UP)
                .doubleValue();
        Double twoDecimalPlaces = BigDecimal.valueOf(threeDecimalPlaces)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
        return twoDecimalPlaces;
    }

    public void incrementQuantity() {
        this.quantity++;
    }

    public void incrementFailures() {
        this.failures++;
    }

    public void calculateSurvivalProbability() {
        this.survivalProbability = rounds((((double) (this.quantity - this.failures) / this.quantity) * 100.0) / 100.0);
    }

    public void calculateEstimatorKM(PeriodResultKM previous) {
        this.estimatorKM = rounds(previous.getEstimatorKM() * this.getSurvivalProbability());
    }
}
