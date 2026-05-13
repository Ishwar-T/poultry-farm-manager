package com.poultry.controller;

import com.poultry.model.Sale;
import com.poultry.service.SaleService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin("*")
public class SaleController {

    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    // GET ALL
    @GetMapping
    public List<Sale> getAll() {
        return saleService.getAllSales();
    }

    // CREATE
    @PostMapping
    public Sale save(@RequestBody Sale s) {
        return saleService.saveSale(s);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Sale> updateSale(
            @PathVariable Long id,
            @RequestBody Sale sale
    ) {

        Optional<Sale> existing = saleService.getSaleById(id);

        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Sale ex = existing.get();

        ex.setType(sale.getType());

        ex.setTotalAmount(sale.getTotalAmount());
        ex.setPaidAmount(sale.getPaidAmount());

        ex.setPaymentMode(sale.getPaymentMode());

        ex.setDate(sale.getDate());
        ex.setNotes(sale.getNotes());

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

        Sale updated = saleService.saveSale(ex);

        return ResponseEntity.ok(updated);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSale(@PathVariable Long id) {

        if (!saleService.exists(id)) {
            return ResponseEntity.notFound().build();
        }

        saleService.deleteSale(id);

        return ResponseEntity.noContent().build();
    }
}