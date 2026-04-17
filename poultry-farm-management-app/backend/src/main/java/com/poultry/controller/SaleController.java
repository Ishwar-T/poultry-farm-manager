package com.poultry.controller;

import com.poultry.model.Sale;
import com.poultry.repository.SaleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin("*")
public class SaleController {

    @Autowired
    private SaleRepository repo;

    // ✅ GET ALL SALES
    @GetMapping
    public List<Sale> getAll() {
        return repo.findAll();
    }

    // ✅ CREATE SALE
    @PostMapping
    public Sale save(@RequestBody Sale s) {
        return repo.save(s);
    }

    // ✅ UPDATE SALE
    @PutMapping("/{id}")
    public ResponseEntity<Sale> updateSale(@PathVariable Long id, @RequestBody Sale sale) {
        Optional<Sale> existing = repo.findById(id);

        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Sale ex = existing.get();

        // 🔥 ALL CORRECT FIELDS (as per your model)
        ex.setType(sale.getType());

        ex.setTotalAmount(sale.getTotalAmount());
        ex.setPaidAmount(sale.getPaidAmount());
        ex.setRemainingAmount(sale.getRemainingAmount());
        ex.setPaymentMode(sale.getPaymentMode());
        ex.setPaymentStatus(sale.getPaymentStatus());

        ex.setDays(sale.getDays());
        ex.setAvgPerDay(sale.getAvgPerDay());
        ex.setTotalEggs(sale.getTotalEggs());
        ex.setRatePerEgg(sale.getRatePerEgg());

        ex.setTotalKg(sale.getTotalKg());
        ex.setRatePerKg(sale.getRatePerKg());
        ex.setBuyerName(sale.getBuyerName());

        ex.setTotalBirds(sale.getTotalBirds());
        ex.setAvgWeight(sale.getAvgWeight());
        ex.setRatePerBird(sale.getRatePerBird());

        Sale updated = repo.save(ex);
        return ResponseEntity.ok(updated);
    }

    // ✅ DELETE SALE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSale(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}