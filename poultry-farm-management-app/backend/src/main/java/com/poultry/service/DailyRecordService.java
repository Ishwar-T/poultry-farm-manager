package com.poultry.service;

import com.poultry.model.DailyRecord;
import com.poultry.repository.DailyRecordRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class DailyRecordService {
    private final DailyRecordRepository repo;

    public DailyRecordService(DailyRecordRepository repo) { this.repo = repo; }

    public List<DailyRecord> findAll() { return repo.findAll(); }

    public DailyRecord save(DailyRecord r) { return repo.save(r); }

    public DailyRecord findByDate(LocalDate d) {
        return repo.findByRecordDate(d).orElse(null);
    }

    public void deleteById(Long id) { repo.deleteById(id); }
}