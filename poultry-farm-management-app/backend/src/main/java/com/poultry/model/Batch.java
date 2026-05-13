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
    private String startDate; // 🔥 FIXED (start → startDate)
    private String breed;

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public int getTotalBirds() { return totalBirds; }
    public int getMortality() { return mortality; }
    public String getStartDate() { return startDate; }
    public String getBreed() { return breed; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setTotalBirds(int totalBirds) { this.totalBirds = totalBirds; }
    public void setMortality(int mortality) { this.mortality = mortality; }
    public void setStartDate(String startDate) { this.startDate = startDate; }
    public void setBreed(String breed) { this.breed = breed; }
}