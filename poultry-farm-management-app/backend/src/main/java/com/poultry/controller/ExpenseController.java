package com.poultry.controller;

import java.util.Optional;
import com.poultry.model.Expense;
import com.poultry.repository.ExpenseRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    private final ExpenseRepository repo;
    @Autowired
    private ExpenseRepository expenseRepository;

    public ExpenseController(ExpenseRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return repo.save(expense);
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return repo.findAll();
    }
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        Optional<Expense> existing = repo.findById(id);

        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Expense ex = existing.get();

        ex.setCategory(expense.getCategory());
        ex.setAmount(expense.getAmount());
        ex.setDate(expense.getDate());
        ex.setNote(expense.getNote());

        return ResponseEntity.ok(repo.save(ex));
    }
}