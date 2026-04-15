package com.poultry.model;

import jakarta.persistence.*;

@Entity
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // EGG / MANURE / CULL

    // COMMON
    private double totalAmount;
    private double paidAmount;
    private double remainingAmount;
    private String paymentMode;
    private String paymentStatus;

    // EGGS
    private int days;
    private double avgPerDay;
    private double totalEggs;
    private double ratePerEgg;

    // MANURE
    private double totalKg;
    private double ratePerKg;
    private String buyerName;

    // CULLS
    private int totalBirds;
    private double avgWeight;
    private double ratePerBird;

    // ===== GETTERS SETTERS =====
    public Long getId() { return id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public double getPaidAmount() { return paidAmount; }
    public void setPaidAmount(double paidAmount) { this.paidAmount = paidAmount; }

    public double getRemainingAmount() { return remainingAmount; }
    public void setRemainingAmount(double remainingAmount) { this.remainingAmount = remainingAmount; }

    public String getPaymentMode() { return paymentMode; }
    public void setPaymentMode(String paymentMode) { this.paymentMode = paymentMode; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public int getDays() { return days; }
    public void setDays(int days) { this.days = days; }

    public double getAvgPerDay() { return avgPerDay; }
    public void setAvgPerDay(double avgPerDay) { this.avgPerDay = avgPerDay; }

    public double getTotalEggs() { return totalEggs; }
    public void setTotalEggs(double totalEggs) { this.totalEggs = totalEggs; }

    public double getRatePerEgg() { return ratePerEgg; }
    public void setRatePerEgg(double ratePerEgg) { this.ratePerEgg = ratePerEgg; }

    public double getTotalKg() { return totalKg; }
    public void setTotalKg(double totalKg) { this.totalKg = totalKg; }

    public double getRatePerKg() { return ratePerKg; }
    public void setRatePerKg(double ratePerKg) { this.ratePerKg = ratePerKg; }

    public String getBuyerName() { return buyerName; }
    public void setBuyerName(String buyerName) { this.buyerName = buyerName; }

    public int getTotalBirds() { return totalBirds; }
    public void setTotalBirds(int totalBirds) { this.totalBirds = totalBirds; }

    public double getAvgWeight() { return avgWeight; }
    public void setAvgWeight(double avgWeight) { this.avgWeight = avgWeight; }

    public double getRatePerBird() { return ratePerBird; }
    public void setRatePerBird(double ratePerBird) { this.ratePerBird = ratePerBird; }
}