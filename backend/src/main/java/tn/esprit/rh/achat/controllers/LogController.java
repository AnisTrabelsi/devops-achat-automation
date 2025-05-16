package tn.esprit.rh.achat.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/logs")   // ← corrigé
public class LogController {

    public static class LogEntry {
        public String level;
        public String timestamp;
        public String message;
    }

    @PostMapping
    public ResponseEntity<Void> receive(@RequestBody LogEntry entry) {
        switch (entry.level) {
            case "DEBUG":
                log.debug("{} - {}", entry.timestamp, entry.message);
                break;
            case "ERROR":
                log.error("{} - {}", entry.timestamp, entry.message);
                break;
            default:
                log.info("{} - {}", entry.timestamp, entry.message);
                break;
        }
        return ResponseEntity.ok().build();
    }
}
