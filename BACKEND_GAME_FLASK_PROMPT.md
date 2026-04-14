# 🐍 Flask Backend Prompt — Hunger Heroes Game Leaderboard

> **Purpose**: Copy this prompt into an AI assistant to generate the Flask backend for Hunger Heroes game scoring and leaderboard.
>
> **Reference**: Based on `nighthawk/gameflask/` — Open Coding Society Flask game backend patterns.

---

## Prompt

Build a **Flask** backend module for the **Hunger Heroes** game leaderboard system. This module tracks player scores from the food bank exploration game (GameEngine v1.1), where players walk around a food bank, interact with NPCs, and learn about the donation system.

### Architecture Pattern (from gameflask)

Follow the **Open Coding Society Flask pattern** used in `gameflask/`:

```
api/
  game_leaderboard.py      ← Blueprint + Resource classes
model/
  game_leaderboard.py      ← SQLAlchemy models
```

### Model: `model/game_leaderboard.py`

Create a SQLAlchemy model with these requirements:

```python
"""
Hunger Heroes Game Leaderboard Model

Table: hunger_heroes_leaderboard

Pattern reference: gameflask/model/leaderboard.py (ScoreCounterEvent)
"""
from datetime import datetime
from sqlite3 import IntegrityError
from __init__ import db


class HungerHeroScore(db.Model):
    """
    Tracks scores from the Hunger Heroes food bank game.

    Fields:
    - id: auto-increment PK
    - _user_id: FK to users.id (nullable for anonymous play)
    - _player_name: display name (string, max 100)
    - _npcs_visited: number of NPCs interacted with (0-5)
    - _dialogues_completed: total dialogue lines read
    - _score: computed score (int)
    - _level_id: which game level (default: 'hunger-heroes-foodbank')
    - _time_played_seconds: how long the player spent in-game
    - _payload: JSON blob for extensible data
    - _timestamp: UTC datetime, auto-set

    Score formula:
      score = (npcs_visited * 100) + (dialogues_completed * 25) + time_bonus
      time_bonus = max(0, 300 - time_played_seconds)  # bonus for speed

    CRUD methods:
    - create()  → persist & return self
    - read()    → dict with camelCase keys for frontend
    - update()  → update fields
    - delete()  → remove row
    - get_by_id(id) → static lookup
    - get_all(level_id=None, limit=50) → ordered by score DESC
    - get_user_scores(user_id) → all scores for one user
    - get_top_scores(limit=10) → top N scores
    """
```

**Key requirements for the model:**

1. Use `db.relationship('User', ...)` with `backref='hunger_hero_scores'`
2. The `read()` method must return **camelCase** keys to match the frontend:
   ```python
   def read(self):
       return {
           'id': self.id,
           'userId': self._user_id,
           'playerName': self._player_name,
           'npcsVisited': self._npcs_visited,
           'dialoguesCompleted': self._dialogues_completed,
           'score': self._score,
           'levelId': self._level_id,
           'timePlayedSeconds': self._time_played_seconds,
           'payload': self._payload or {},
           'timestamp': self._timestamp.isoformat() if self._timestamp else None,
           'user': {
               'id': self.user.id,
               'uid': self.user.uid,
               'name': self.user.name,
           } if self.user else None,
       }
   ```
3. Wrap `db.session.add/commit` in try/except with rollback on IntegrityError
4. `get_all()` should filter by `level_id` if provided, order by `_score DESC`

### API: `api/game_leaderboard.py`

Create Flask-RESTful endpoints:

```python
"""
Hunger Heroes Game Leaderboard API

Endpoints:
  GET  /api/hunger-heroes/leaderboard          → all scores (optional ?levelId=&limit=)
  GET  /api/hunger-heroes/leaderboard/top/<n>   → top N scores
  POST /api/hunger-heroes/leaderboard           → submit a new score (auth required)
  GET  /api/hunger-heroes/leaderboard/user/<id> → scores for specific user

Pattern reference: gameflask/api/leaderboard.py (ScoreCounterAPI)
"""
from flask import Blueprint, g, jsonify, request
from flask_restful import Api, Resource
from flask_login import current_user
from api.authorize import token_required
from model.game_leaderboard import HungerHeroScore


hunger_heroes_api = Blueprint('hunger_heroes_api', __name__, url_prefix='/api/hunger-heroes')
hunger_heroes_restful = Api(hunger_heroes_api)
```

**Key requirements for the API:**

1. **GET leaderboard**: Return all scores, support `?levelId=` and `?limit=50` query params
2. **POST leaderboard**: Requires `@token_required()` decorator. Accept JSON body:
   ```json
   {
     "playerName": "HeroPlayer",
     "npcsVisited": 5,
     "dialoguesCompleted": 23,
     "timePlayedSeconds": 180,
     "levelId": "hunger-heroes-foodbank",
     "payload": { "bonus": true }
   }
   ```
   - Server-side score calculation (don't trust client score)
   - Extract `user_id` from `g.current_user`
3. **GET top/N**: Return top N scores across all users
4. **GET user scores**: Return all scores for a specific user ID

### Blueprint Registration

In `main.py` (or `__init__.py`), register the blueprint:

```python
from api.game_leaderboard import hunger_heroes_api
app.register_blueprint(hunger_heroes_api)
```

### Init Data (Optional)

Add a static `init_leaderboard()` method or use `HungerHeroScore.init()` to seed sample data:

```python
@staticmethod
def init():
    scores = [
        HungerHeroScore(
            player_name="DemoHero",
            npcs_visited=5,
            dialogues_completed=25,
            score=825,
            level_id="hunger-heroes-foodbank",
            time_played_seconds=150,
        ),
        # ... more seed data
    ]
    for s in scores:
        try:
            db.session.add(s)
            db.session.commit()
        except:
            db.session.rollback()
```

### CORS

The leaderboard GET endpoints should allow CORS from the frontend origins:
- http://127.0.0.1:4887/hunger_heroes/ (dev)
- https://ahaanv19.github.io/hunger_heroes/

### Testing Checklist

- [ ] `GET /api/hunger-heroes/leaderboard` returns `[]` when empty
- [ ] `POST /api/hunger-heroes/leaderboard` with valid token creates a score
- [ ] Score is **server-calculated**, not from request body
- [ ] `GET /api/hunger-heroes/leaderboard/top/5` returns max 5 entries
- [ ] `GET /api/hunger-heroes/leaderboard/user/1` returns only user 1's scores
- [ ] Unauthorized POST returns 401
- [ ] Missing `npcsVisited` field returns 400

### Frontend Integration

The frontend game page (`navigation/donate/game.md`) will call these endpoints via:

```javascript
import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

// Submit score after game session
const response = await fetch(`${pythonURI}/api/hunger-heroes/leaderboard`, {
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
gameflask/
├── api/
│   └── game_leaderboard.py    ← Blueprint + 4 Resource classes
├── model/
│   └── game_leaderboard.py    ← HungerHeroScore SQLAlchemy model
└── main.py                    ← Register hunger_heroes_api blueprint
```

---

## Reference Code (from nighthawk/gameflask/)

### Pattern: Blueprint + Resource (gameflask/api/leaderboard.py)

```python
from flask import Blueprint, g, jsonify, request
from flask_restful import Api, Resource
from api.authorize import token_required

dynamic_api = Blueprint('dynamic_api', __name__, url_prefix='/api/dynamic')
dynamic_restful = Api(dynamic_api)

class ScoreCounterAPI(Resource):
    def get(self):
        game_name = request.args.get('gameName')
        limit = request.args.get('limit', 200, type=int)
        events = ScoreCounterEvent.get_all(game_name=game_name, limit=limit)
        return jsonify([event.read() for event in events])

    @token_required()
    def post(self):
        body = request.get_json() or {}
        payload = body.get('payload', {})
        user_id = getattr(g, 'current_user', None).id
        event = ScoreCounterEvent(payload=payload, user_id=user_id)
        created = event.create()
        return jsonify(created.read())

dynamic_restful.add_resource(ScoreCounterAPI, '/leaderboard')
```

### Pattern: Model with CRUD (gameflask/model/leaderboard.py)

```python
class ScoreCounterEvent(db.Model):
    __tablename__ = 'leaderboard'
    id = db.Column(db.Integer, primary_key=True)
    _user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    _payload = db.Column(db.JSON, nullable=False)
    _timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def create(self):
        try:
            db.session.add(self)
            db.session.commit()
            return self
        except IntegrityError:
            db.session.rollback()
            return None

    def read(self):
        return {
            'id': self.id,
            'userId': self._user_id,
            'payload': self._payload or {},
            'timestamp': self._timestamp.isoformat(),
        }
```
