# ☕ Spring Boot Backend Prompt — Hunger Heroes Game Leaderboard

> **Purpose**: Copy this prompt into an AI assistant to generate the Spring Boot backend for Hunger Heroes game scoring and leaderboard.
>
> **Reference**: Based on `nighthawk/gamespring2/` — Open Coding Society Spring Boot game backend patterns.

---

## Prompt

Build a **Spring Boot** backend module for the **Hunger Heroes** game leaderboard system. This module tracks player scores from the food bank exploration game (GameEngine v1.1), where players walk around a food bank, interact with NPCs, and learn about the donation system.

### Architecture Pattern (from gamespring2)

Follow the **Open Coding Society Spring Boot pattern** used in `gamespring2/`:

```
src/main/java/com/open/spring/mvc/hungerheroes/
  HungerHeroScore.java              ← JPA Entity (Lombok)
  HungerHeroScoreRepository.java    ← JpaRepository interface
  HungerHeroScoreController.java    ← @RestController
```

### Entity: `HungerHeroScore.java`

Create a JPA entity with Lombok:

```java
package com.open.spring.mvc.hungerheroes;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Hunger Heroes Game Leaderboard Entity.
 *
 * Tracks scores from the food bank exploration game.
 * Players earn points by visiting NPCs and completing dialogues.
 *
 * Score formula (calculated server-side):
 *   score = (npcsVisited * 100) + (dialoguesCompleted * 25) + timeBonus
 *   timeBonus = max(0, 300 - timePlayedSeconds)
 *
 * Pattern reference: gamespring2 rpg/games/Game.java
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hunger_heroes_leaderboard")
public class HungerHeroScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link to person/user table
    private Long personId;
    private String personUid;

    // Player info
    @Column(length = 100)
    private String playerName;

    // Game metrics
    private Integer npcsVisited;          // 0-5 (5 NPC stations)
    private Integer dialoguesCompleted;   // total dialogue lines read
    private Integer score;                // server-calculated
    private Integer timePlayedSeconds;    // session duration

    // Level info
    @Column(length = 64)
    private String levelId;               // e.g. "hunger-heroes-foodbank"

    // Extensible JSON data
    @Lob
    private String details;               // JSON string for extra payload

    private LocalDateTime createdAt;

    /**
     * Compute score server-side.
     * Call this before persisting.
     */
    public void computeScore() {
        int npcPoints = (npcsVisited != null ? npcsVisited : 0) * 100;
        int dialoguePoints = (dialoguesCompleted != null ? dialoguesCompleted : 0) * 25;
        int timeBonus = Math.max(0, 300 - (timePlayedSeconds != null ? timePlayedSeconds : 0));
        this.score = npcPoints + dialoguePoints + timeBonus;
    }

    /**
     * Seed data for testing.
     */
    public static HungerHeroScore[] init() {
        HungerHeroScore s1 = new HungerHeroScore();
        s1.setPersonId(1L);
        s1.setPersonUid("uid-demo-hero");
        s1.setPlayerName("DemoHero");
        s1.setNpcsVisited(5);
        s1.setDialoguesCompleted(25);
        s1.setTimePlayedSeconds(150);
        s1.setLevelId("hunger-heroes-foodbank");
        s1.setDetails("{\"allNpcsFound\": true}");
        s1.setCreatedAt(LocalDateTime.now());
        s1.computeScore();

        HungerHeroScore s2 = new HungerHeroScore();
        s2.setPersonId(2L);
        s2.setPersonUid("uid-speed-runner");
        s2.setPlayerName("SpeedRunner");
        s2.setNpcsVisited(3);
        s2.setDialoguesCompleted(12);
        s2.setTimePlayedSeconds(60);
        s2.setLevelId("hunger-heroes-foodbank");
        s2.setDetails("{\"speedRun\": true}");
        s2.setCreatedAt(LocalDateTime.now());
        s2.computeScore();

        return new HungerHeroScore[] { s1, s2 };
    }
}
```

### Repository: `HungerHeroScoreRepository.java`

```java
package com.open.spring.mvc.hungerheroes;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HungerHeroScoreRepository extends JpaRepository<HungerHeroScore, Long> {

    // All scores for a specific user, newest first
    List<HungerHeroScore> findByPersonIdOrderByCreatedAtDesc(Long personId);

    // All scores for a level, highest score first
    List<HungerHeroScore> findByLevelIdOrderByScoreDesc(String levelId);

    // Top N scores across all levels
    @Query("SELECT s FROM HungerHeroScore s ORDER BY s.score DESC LIMIT ?1")
    List<HungerHeroScore> findTopScores(int limit);

    // Top scores for a specific level
    @Query("SELECT s FROM HungerHeroScore s WHERE s.levelId = ?1 ORDER BY s.score DESC LIMIT ?2")
    List<HungerHeroScore> findTopScoresByLevel(String levelId, int limit);
}
```

### Controller: `HungerHeroScoreController.java`

```java
package com.open.spring.mvc.hungerheroes;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for Hunger Heroes Game Leaderboard.
 *
 * Endpoints:
 *   GET  /api/hunger-heroes/leaderboard              → all scores (optional ?levelId=&limit=)
 *   GET  /api/hunger-heroes/leaderboard/top/{limit}   → top N scores
 *   POST /api/hunger-heroes/leaderboard               → submit score (requires auth)
 *   GET  /api/hunger-heroes/leaderboard/user/{personId} → user's scores
 *
 * Pattern reference: gamespring2 rpg/games/GameApiController.java
 *                    gamespring2 leaderboard/LeaderboardController.java
 *
 * CORS: Allow all origins for GET, require auth for POST.
 */
@RestController
@RequestMapping("/api/hunger-heroes")
@CrossOrigin(
    origins = "*",
    allowedHeaders = "*",
    methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.OPTIONS
    }
)
public class HungerHeroScoreController {

    @Autowired
    private HungerHeroScoreRepository repo;

    /**
     * GET /api/hunger-heroes/leaderboard
     * Optional query params: ?levelId=hunger-heroes-foodbank&limit=50
     */
    @GetMapping("/leaderboard")
    public ResponseEntity<List<HungerHeroScore>> getLeaderboard(
            @RequestParam(required = false) String levelId,
            @RequestParam(defaultValue = "50") int limit) {
        try {
            List<HungerHeroScore> scores;
            if (levelId != null && !levelId.isEmpty()) {
                scores = repo.findTopScoresByLevel(levelId, limit);
            } else {
                scores = repo.findTopScores(limit);
            }
            return ResponseEntity.ok(scores != null ? scores : List.of());
        } catch (Exception e) {
            return ResponseEntity.ok(List.of());
        }
    }

    /**
     * GET /api/hunger-heroes/leaderboard/top/{limit}
     */
    @GetMapping("/leaderboard/top/{limit}")
    public ResponseEntity<List<HungerHeroScore>> getTopScores(
            @PathVariable int limit) {
        List<HungerHeroScore> scores = repo.findTopScores(Math.min(limit, 100));
        return ResponseEntity.ok(scores != null ? scores : List.of());
    }

    /**
     * POST /api/hunger-heroes/leaderboard
     *
     * Expects JSON body:
     * {
     *   "playerName": "HeroPlayer",
     *   "npcsVisited": 5,
     *   "dialoguesCompleted": 23,
     *   "timePlayedSeconds": 180,
     *   "levelId": "hunger-heroes-foodbank",
     *   "details": "{\"bonus\": true}"
     * }
     *
     * Score is computed SERVER-SIDE — do not trust the client.
     */
    @PostMapping("/leaderboard")
    public ResponseEntity<?> submitScore(@RequestBody HungerHeroScore score) {
        try {
            // Validate required fields
            if (score.getNpcsVisited() == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "npcsVisited is required"));
            }
            if (score.getDialoguesCompleted() == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "dialoguesCompleted is required"));
            }

            // Clamp values to valid ranges
            score.setNpcsVisited(Math.min(5, Math.max(0, score.getNpcsVisited())));
            score.setDialoguesCompleted(Math.max(0, score.getDialoguesCompleted()));
            score.setTimePlayedSeconds(
                score.getTimePlayedSeconds() != null ? Math.max(0, score.getTimePlayedSeconds()) : 0
            );

            // Server-side score calculation (never trust client)
            score.computeScore();

            // Set timestamp
            score.setCreatedAt(LocalDateTime.now());

            // Default level ID
            if (score.getLevelId() == null || score.getLevelId().isEmpty()) {
                score.setLevelId("hunger-heroes-foodbank");
            }

            HungerHeroScore saved = repo.save(score);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("message", "Failed to save score: " + e.getMessage()));
        }
    }

    /**
     * GET /api/hunger-heroes/leaderboard/user/{personId}
     */
    @GetMapping("/leaderboard/user/{personId}")
    public ResponseEntity<List<HungerHeroScore>> getUserScores(
            @PathVariable Long personId) {
        List<HungerHeroScore> scores = repo.findByPersonIdOrderByCreatedAtDesc(personId);
        return ResponseEntity.ok(scores != null ? scores : List.of());
    }
}
```

### Model Init Registration

In your `ModelInit.java` (or equivalent init class), add:

```java
// In the @PostConstruct or CommandLineRunner
HungerHeroScore[] initScores = HungerHeroScore.init();
for (HungerHeroScore s : initScores) {
    hungerHeroScoreRepository.save(s);
}
```

### Security Configuration

In `SecurityConfig.java`, whitelist the GET endpoints:

```java
.requestMatchers(HttpMethod.GET, "/api/hunger-heroes/**").permitAll()
```

POST requires authentication via JWT (same as existing donation endpoints).

### Testing Checklist

- [ ] `GET /api/hunger-heroes/leaderboard` returns `[]` when empty
- [ ] `POST /api/hunger-heroes/leaderboard` with valid JWT creates a score
- [ ] Score is **server-calculated** via `computeScore()`, not from request body
- [ ] `GET /api/hunger-heroes/leaderboard/top/5` returns max 5 entries sorted by score DESC
- [ ] `GET /api/hunger-heroes/leaderboard/user/1` returns only person 1's scores
- [ ] Unauthorized POST returns 401/403
- [ ] `npcsVisited` is clamped to 0-5
- [ ] `timePlayedSeconds` negative values are clamped to 0
- [ ] `levelId` defaults to `"hunger-heroes-foodbank"` when not provided
- [ ] Init seed data persists on first startup

### Frontend Integration

The frontend game page (`navigation/donate/game.md`) will call these endpoints via:

```javascript
import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

// Submit score after game session (Spring-first, matching Hunger Heroes dual-backend pattern)
const response = await fetch(`${javaURI}/api/hunger-heroes/leaderboard`, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify({
        playerName: playerName,
        npcsVisited: npcCount,
        dialoguesCompleted: dialogueCount,
        timePlayedSeconds: elapsed,
        levelId: 'hunger-heroes-foodbank',
    }),
});
```

### File Structure Summary

```
src/main/java/com/open/spring/mvc/hungerheroes/
├── HungerHeroScore.java              ← @Entity with Lombok, computeScore(), init()
├── HungerHeroScoreRepository.java    ← JpaRepository with custom queries
└── HungerHeroScoreController.java    ← @RestController with 4 endpoints
```

---

## Reference Code (from nighthawk/gamespring2/)

### Pattern: JPA Entity with Lombok (gamespring2/rpg/games/Game.java)

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "UnifiedGame")
@Table(name = "games")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long personId;
    private String personUid;
    private String type;
    private Double betAmount;
    private Double amount;
    private Double balance;
    private String result;
    private Boolean success;
    @Lob
    private String details;
    private LocalDateTime createdAt;
}
```

### Pattern: REST Controller (gamespring2/rpg/games/GameApiController.java)

```java
@RestController
@RequestMapping("/game")
public class GameApiController {
    @Autowired
    private UnifiedGameRepository repo;

    @GetMapping("/combined/{personid}")
    public ResponseEntity<?> combined(@PathVariable("personid") Long personid) {
        List<Game> rows = repo.findByPersonId(personid);
        Map<String, Object> out = new HashMap<>();
        out.put("count", rows.size());
        out.put("rows", rows);
        return ResponseEntity.ok(out);
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody Game game) {
        Game saved = repo.save(game);
        return ResponseEntity.ok(saved);
    }
}
```

### Pattern: Leaderboard Controller (gamespring2/leaderboard/LeaderboardController.java)

```java
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "false")
public class LeaderboardController {
    @Autowired
    private LeaderboardService leaderboardService;

    @GetMapping({"/api/leaderboard", "/api/pausemenu/score/leaderboard"})
    public ResponseEntity<List<ScoreCounter>> getAllEntries() {
        List<ScoreCounter> entries = leaderboardService.getAllEntriesByScore();
        return ResponseEntity.ok(entries != null ? entries : List.of());
    }

    @GetMapping("/api/leaderboard/top/{limit}")
    public ResponseEntity<List<ScoreCounter>> getTopScores(@PathVariable int limit) {
        return ResponseEntity.ok(leaderboardService.getTopScores(limit));
    }
}
```
