package com.poultry.model;

import jakarta.persistence.*;

@Entity
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int totalBirds;
    private int mortality;

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public int getTotalBirds() { return totalBirds; }
    public int getMortality() { return mortality; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setTotalBirds(int totalBirds) { this.totalBirds = totalBirds; }
    public void setMortality(int mortality) { this.mortality = mortality; }
}