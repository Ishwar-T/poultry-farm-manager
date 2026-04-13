package com.poultry.controller;

import com.poultry.model.Batch;
import com.poultry.repository.BatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "*")
public class BatchController {

    @Autowired
    private BatchRepository batchRepository;

    @GetMapping
    public List<Batch> getAll() {
        return batchRepository.findAll();
    }

    @PostMapping
    public Batch add(@RequestBody Batch batch) {
        return batchRepository.save(batch);
    }
}