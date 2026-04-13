package com.poultry.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long batchId;

    private String category;
    private Double amount;
    private String note;
    private LocalDate date;

    // Getters
    public Long getId() { return id; }
    public String getCategory() { return category; }
    public Double getAmount() { return amount; }
    public String getNote() { return note; }
    public LocalDate getDate() { return date; }
    public Long getBatchId() { return batchId; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setCategory(String category) { this.category = category; }
    public void setAmount(Double amount) { this.amount = amount; }
    public void setNote(String note) { this.note = note; }
    public void setDate(LocalDate date) { this.date = date; }
    public void setBatchId(Long batchId) { this.batchId = batchId; }

}