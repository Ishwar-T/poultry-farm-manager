package com.poultry.service;

import com.poultry.model.Expense;
import com.poultry.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // GET ALL
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // SAVE
    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // DELETE
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
}