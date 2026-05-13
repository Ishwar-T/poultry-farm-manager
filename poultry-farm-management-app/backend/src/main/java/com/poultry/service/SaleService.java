package com.poultry.service;

import com.poultry.model.Sale;
import com.poultry.repository.SaleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SaleService {

    private final SaleRepository repo;

    public SaleService(SaleRepository repo) {
        this.repo = repo;
    }

    // GET ALL
    public List<Sale> getAllSales() {
        return repo.findAll();
    }

    // SAVE
    public Sale saveSale(Sale sale) {

        // AUTO CALCULATE REMAINING
        double remaining = sale.getTotalAmount() - sale.getPaidAmount();

        sale.setRemainingAmount(remaining);

        // AUTO STATUS
        if (remaining <= 0) {
            sale.setPaymentStatus("PAID");
        } else {
            sale.setPaymentStatus("PENDING");
        }

        return repo.save(sale);
    }

    // FIND BY ID
    public Optional<Sale> getSaleById(Long id) {
        return repo.findById(id);
    }

    // DELETE
    public void deleteSale(Long id) {
        repo.deleteById(id);
    }

    // EXISTS
    public boolean exists(Long id) {
        return repo.existsById(id);
    }
}