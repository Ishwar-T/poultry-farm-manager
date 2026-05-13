package com.poultry.service;

import com.poultry.model.Batch;
import com.poultry.repository.BatchRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BatchService {

    private final BatchRepository repo;

    public BatchService(BatchRepository repo) {
        this.repo = repo;
    }

    // ✅ GET ALL
    public List<Batch> getAllBatches() {
        return repo.findAll();
    }

    // ✅ SAVE
    public Batch saveBatch(Batch batch) {
        return repo.save(batch);
    }

    // ✅ UPDATE (SAFE)
    public Batch updateBatch(Long id, Batch batch) {

        Batch existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        // 🔥 only update required fields
        existing.setName(batch.getName());
        existing.setTotalBirds(batch.getTotalBirds());
        existing.setMortality(batch.getMortality());
        existing.setStartDate(batch.getStartDate());
        existing.setBreed(batch.getBreed());

        return repo.save(existing);
    }

    // ✅ DELETE
    public void deleteBatch(Long id) {
        repo.deleteById(id);
    }
}