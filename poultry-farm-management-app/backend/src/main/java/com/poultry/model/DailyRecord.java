package com.poultry.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "daily_records")
public class DailyRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate recordDate;

    private Integer totalBirds;
    private Double feedConsumedKg;
    private Double mortalityCount;
    private Double eggsProduced;

    // Add other fields as needed (notes, temperature, etc.)

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getRecordDate() { return recordDate; }
    public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }

    public Integer getTotalBirds() { return totalBirds; }
    public void setTotalBirds(Integer totalBirds) { this.totalBirds = totalBirds; }

    public Double getFeedConsumedKg() { return feedConsumedKg; }
    public void setFeedConsumedKg(Double feedConsumedKg) { this.feedConsumedKg = feedConsumedKg; }

    public Double getMortalityCount() { return mortalityCount; }
    public void setMortalityCount(Double mortalityCount) { this.mortalityCount = mortalityCount; }

    public Double getEggsProduced() { return eggsProduced; }
    public void setEggsProduced(Double eggsProduced) { this.eggsProduced = eggsProduced; }
}