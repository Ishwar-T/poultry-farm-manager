package com.poultry.controller;

import com.poultry.model.FeedFormula;
import com.poultry.repository.FeedFormulaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feed-formula")
@CrossOrigin(origins = "*")
public class FeedFormulaController {

    @Autowired
    private FeedFormulaRepository repo;

    // 🔥 GET latest formula (ONLY THIS)
    @GetMapping
    public FeedFormula getLatestFormula() {
        FeedFormula f = repo.findTopByOrderByIdDesc();

            if (f == null) {
                return new FeedFormula(); // 👈 IMPORTANT
            }

            return f;    }

    // SAVE
    @PostMapping
    public FeedFormula save(@RequestBody FeedFormula f) {
        return repo.save(f);
    }
}