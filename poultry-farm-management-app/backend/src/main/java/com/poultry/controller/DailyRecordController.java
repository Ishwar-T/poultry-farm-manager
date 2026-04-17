package com.poultry.controller;

import com.poultry.model.DailyRecord;
import com.poultry.service.DailyRecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/daily-records")
public class DailyRecordController {
    private final DailyRecordService service;

    public DailyRecordController(DailyRecordService service) { this.service = service; }

    @GetMapping
    public List<DailyRecord> all() { return service.findAll(); }

    @GetMapping("/by-date")
    public ResponseEntity<DailyRecord> byDate(@RequestParam("date") String dateStr) {
        LocalDate date = LocalDate.parse(dateStr);
        DailyRecord r = service.findByDate(date);
        if (r == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(r);
    }

    @PostMapping
    public ResponseEntity<DailyRecord> create(@RequestBody DailyRecord record) {
        DailyRecord saved = service.save(record);
        return ResponseEntity.created(URI.create("/api/daily-records/" + saved.getId())).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}