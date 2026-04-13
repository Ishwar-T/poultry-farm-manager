package com.poultry.controller;

import com.poultry.model.Batch;
import com.poultry.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "*")
public class BatchController {

    @Autowired
    private BatchService batchService;
    @GetMapping
    public List<Batch> getAll() {
        return batchService.getAllBatches();
    }

    @PostMapping
    public Batch add(@RequestBody Batch batch) {
        return batchService.saveBatch(batch);
    }
    @PutMapping("/{id}")
    public Batch update(@PathVariable Long id, @RequestBody Batch batch) {
    return batchService.updateBatch(id, batch);    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        batchService.deleteBatch(id);
    }
}