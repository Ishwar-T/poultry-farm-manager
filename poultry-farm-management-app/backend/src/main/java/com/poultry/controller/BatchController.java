package com.poultry.controller;

import com.poultry.model.Batch;
import com.poultry.service.BatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "*")
public class BatchController {

    private final BatchService batchService;

    public BatchController(BatchService batchService) {
        this.batchService = batchService;
    }

    // ✅ GET ALL
    @GetMapping
    public List<Batch> getAll() {
        return batchService.getAllBatches();
    }

    // ✅ CREATE
    @PostMapping
    public ResponseEntity<Batch> add(@RequestBody Batch batch) {
        Batch saved = batchService.saveBatch(batch);
        return ResponseEntity.ok(saved);
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Batch> update(@PathVariable Long id, @RequestBody Batch batch) {
        Batch updated = batchService.updateBatch(id, batch);
        return ResponseEntity.ok(updated);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        batchService.deleteBatch(id);
        return ResponseEntity.noContent().build();
    }
}