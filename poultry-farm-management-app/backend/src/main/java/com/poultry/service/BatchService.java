package com.poultry.service;

import com.poultry.model.Batch;
import com.poultry.repository.BatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BatchService {

    @Autowired
    private BatchRepository batchRepository;

    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    public Batch saveBatch(Batch batch) {
        return batchRepository.save(batch);
    }

    public Batch updateBatch(Long id, Batch batch) {
        Batch existing = batchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found with id: " + id));

        existing.setName(batch.getName());
        existing.setTotalBirds(batch.getTotalBirds());
        existing.setMortality(batch.getMortality());

        return batchRepository.save(existing);
    }
    public void deleteBatch(Long id) {
        batchRepository.deleteById(id);
    }
}