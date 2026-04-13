package com.poultry.model;

import jakarta.persistence.*;

@Entity
public class FeedFormula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double maizePercent;
    private double maizePrice;

    private double soyaPercent;
    private double soyaPrice;

    private double dorbPercent;
    private double dorbPrice;

    private double marblePercent;
    private double marblePrice;

    private double premixPercent;
    private double premixPrice;

    // getters & setters

    public Long getId() { return id; }

    public double getMaizePercent() { return maizePercent; }
    public void setMaizePercent(double maizePercent) { this.maizePercent = maizePercent; }

    public double getMaizePrice() { return maizePrice; }
    public void setMaizePrice(double maizePrice) { this.maizePrice = maizePrice; }

    public double getSoyaPercent() { return soyaPercent; }
    public void setSoyaPercent(double soyaPercent) { this.soyaPercent = soyaPercent; }

    public double getSoyaPrice() { return soyaPrice; }
    public void setSoyaPrice(double soyaPrice) { this.soyaPrice = soyaPrice; }

    public double getDorbPercent() { return dorbPercent; }
    public void setDorbPercent(double dorbPercent) { this.dorbPercent = dorbPercent; }

    public double getDorbPrice() { return dorbPrice; }
    public void setDorbPrice(double dorbPrice) { this.dorbPrice = dorbPrice; }

    public double getMarblePercent() { return marblePercent; }
    public void setMarblePercent(double marblePercent) { this.marblePercent = marblePercent; }

    public double getMarblePrice() { return marblePrice; }
    public void setMarblePrice(double marblePrice) { this.marblePrice = marblePrice; }

    public double getPremixPercent() { return premixPercent; }
    public void setPremixPercent(double premixPercent) { this.premixPercent = premixPercent; }

    public double getPremixPrice() { return premixPrice; }
    public void setPremixPrice(double premixPrice) { this.premixPrice = premixPrice; }
}