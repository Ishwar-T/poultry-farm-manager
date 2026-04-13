package com.poultry.controller;

import com.poultry.model.FeedFormula;
import com.poultry.repository.FeedFormulaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feed-formula")
@CrossOrigin(origins = "*")
public class FeedFormulaController {

    @Autowired
    private FeedFormulaRepository repo;

    @GetMapping
    public List<FeedFormula> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public FeedFormula save(@RequestBody FeedFormula f) {
        return repo.save(f);
    }
}