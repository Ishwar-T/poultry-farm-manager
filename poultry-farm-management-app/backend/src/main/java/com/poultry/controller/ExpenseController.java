package com.poultry.controller;

import com.poultry.model.Expense;
import com.poultry.service.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // ADD EXPENSE
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.saveExpense(expense);
    }

    // GET ALL
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(
            @PathVariable Long id,
            @RequestBody Expense expense
    ) {

        List<Expense> expenses = expenseService.getAllExpenses();

        Expense existing = expenses.stream()
                .filter(e -> e.getId().equals(id))
                .findFirst()
                .orElse(null);

        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        existing.setCategory(expense.getCategory());
        existing.setAmount(expense.getAmount());
        existing.setDate(expense.getDate());
        existing.setNote(expense.getNote());

        Expense updated = expenseService.saveExpense(existing);

        return ResponseEntity.ok(updated);
    }
}