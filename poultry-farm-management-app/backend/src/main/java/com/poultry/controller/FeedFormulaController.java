package com.poultry.controller;

import com.poultry.model.FeedFormula;
import com.poultry.repository.FeedFormulaRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/feed-formulas")
@CrossOrigin(origins = "*")
public class FeedFormulaController {

    private final FeedFormulaRepository repo;

    public FeedFormulaController(FeedFormulaRepository repo) {
        this.repo = repo;
    }

    // GET ALL FORMULAS
    @GetMapping
    public List<FeedFormula> getAllFormulas() {
        return repo.findAll();
    }

    // CREATE
    @PostMapping
    public FeedFormula save(@RequestBody FeedFormula f) {
        return repo.save(f);
    }

    // UPDATE
    @PutMapping("/{id}")
    public FeedFormula updateFeedFormula(
            @PathVariable Long id,
            @RequestBody FeedFormula updatedFeedFormula
    ) {

        Optional<FeedFormula> existing = repo.findById(id);

        if (existing.isEmpty()) {
            throw new RuntimeException("Feed formula not found");
        }

        FeedFormula formula = existing.get();

        formula.setFormulaName(updatedFeedFormula.getFormulaName());

        formula.setMaizePercent(updatedFeedFormula.getMaizePercent());
        formula.setMaizePrice(updatedFeedFormula.getMaizePrice());

        formula.setSoyaPercent(updatedFeedFormula.getSoyaPercent());
        formula.setSoyaPrice(updatedFeedFormula.getSoyaPrice());

        formula.setDorbPercent(updatedFeedFormula.getDorbPercent());
        formula.setDorbPrice(updatedFeedFormula.getDorbPrice());

        formula.setMarblePercent(updatedFeedFormula.getMarblePercent());
        formula.setMarblePrice(updatedFeedFormula.getMarblePrice());

        formula.setPremixPercent(updatedFeedFormula.getPremixPercent());
        formula.setPremixPrice(updatedFeedFormula.getPremixPrice());

        return repo.save(formula);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteFeedFormula(@PathVariable Long id) {
        repo.deleteById(id);
    }
}