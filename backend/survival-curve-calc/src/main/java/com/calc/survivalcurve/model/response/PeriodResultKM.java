package com.calc.survivalcurve.model.response;

import lombok.*;

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

  public void incrementQuantity(){
    this.quantity++;
  }

  public void incrementFailures(){
    this.failures++;
  }

  public void calculateSurvivalProbability(){
    this.survivalProbability =  Math.round((((double)(this.quantity - this.failures) / this.quantity) + 0.0001) * 100.0)/100.0;
  }

  public void calculateEstimatorKM(PeriodResultKM previous)  {
    this.estimatorKM = Math.round((previous.getEstimatorKM()*this.getSurvivalProbability() + 0.0001)*100.0)/100.0;
  }
}
