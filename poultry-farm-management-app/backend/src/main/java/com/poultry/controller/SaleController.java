package com.poultry.controller;

import com.poultry.model.Sale;
import com.poultry.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin("*")
public class SaleController {

    @Autowired
    private SaleRepository repo;

    @GetMapping
    public List<Sale> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Sale save(@RequestBody Sale s) {
        return repo.save(s);
    }
}