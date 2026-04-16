# Project Registration System

## Overview

The `_projects/` directory holds self-contained project source code (game levels, sprites, models, etc.). A Makefile-based auto-registration system discovers and builds each project, copying distributed files to their runtime locations under `assets/js/projects/`.

This keeps the root Makefile project-agnostic — all project-specific build logic lives inside each project's own `Makefile`.

## Directory Layout

```
_projects/
├── .makeprojects              # Registry — one project name per line
├── REGISTRATION.md            # This file
└── hunger-heroes-game/        # Example project
    ├── Makefile               # Build rules (required)
    └── levels/                # Source JS files
        ├── GameLevelHungerHeroes.js
        └── SpriteGenerator.js
```

Distributed output (auto-generated, gitignored):

```
assets/js/projects/hunger-heroes-game/
└── levels/
    ├── GameLevelHungerHeroes.js
    └── SpriteGenerator.js
```

## How to Register a New Project

### Step 1: Create the project directory

```bash
mkdir -p _projects/my-project/levels
```

### Step 2: Add source files

Place your JS level files, sprites, models, etc. inside the project directory.

### Step 3: Create a Makefile

Create `_projects/my-project/Makefile` with these required targets:

```makefile
PROJECT_SRC = $(CURDIR)
PROJECT_NAME = $(notdir $(PROJECT_SRC))
WORKSPACE_ROOT = ../..
JS_DEST = $(WORKSPACE_ROOT)/assets/js/projects/$(PROJECT_NAME)

build:
	@mkdir -p $(JS_DEST)/levels
	@cp levels/*.js $(JS_DEST)/levels/ 2>/dev/null || true
	@echo "✅ $(PROJECT_NAME) built successfully"

clean:
	@rm -rf $(JS_DEST)

watch:
	@if command -v fswatch >/dev/null 2>&1; then \
		fswatch -l 0.3 -r $(PROJECT_SRC)/levels 2>/dev/null | while read f; do \
			mkdir -p $(JS_DEST)/levels; \
			cp "$$f" $(JS_DEST)/levels/ 2>/dev/null || true; \
		done; \
	else \
		echo "fswatch not installed — run 'make -C _projects/$(PROJECT_NAME) build' manually"; \
		while true; do sleep 3600; done; \
	fi

docs:
	@echo "No docs for $(PROJECT_NAME)"

docs-clean:
	@echo "No docs to clean for $(PROJECT_NAME)"

.PHONY: build clean watch docs docs-clean
```

Adjust the `build` target if your project has subdirectories beyond `levels/` (e.g. `model/`, `images/`).

### Step 4: Register in `.makeprojects`

Add one line to `_projects/.makeprojects`:

```
my-project
```

Rules for `.makeprojects`:
- One project name per line (no paths)
- Lines starting with `#` are comments
- Blank lines are ignored
- Name must match the directory under `_projects/`

### Step 5: Test

```bash
make build-registered-projects   # Build all registered projects
make list-projects               # Verify registration
```

## Commands Reference

### Root Makefile Targets

| Command | Description |
|---------|-------------|
| `make` | Full server start — builds projects, converts notebooks, serves Jekyll |
| `make build-registered-projects` | Build all registered projects (copy source → distribution) |
| `make clean-registered-projects` | Remove all distributed project files |
| `make list-projects` | Show registered projects and their status |

### Per-Project Targets

Run these from the repo root using `make -C`:

| Command | Description |
|---------|-------------|
| `make -C _projects/hunger-heroes-game build` | Build one project |
| `make -C _projects/hunger-heroes-game clean` | Clean one project's distribution |
| `make -C _projects/hunger-heroes-game watch` | Watch for changes and auto-copy (requires `fswatch`) |

Or run directly from the project directory:

```bash
cd _projects/hunger-heroes-game
make build
make clean
```

## How It Works

1. `make` (default target) calls `server`, which depends on `build-registered-projects`
2. `build-registered-projects` reads `_projects/.makeprojects`, filters comments/blanks
3. For each project name, it runs `make -C _projects/<name> build`
4. Each project's `Makefile` copies source files to `assets/js/projects/<name>/`
5. Jekyll serves from `assets/js/projects/<name>/` at runtime
6. `make clean` calls `clean-registered-projects` to remove all distributed files

## Import Paths

Source files in `_projects/` use relative imports that resolve from their distributed location.

For a file at `assets/js/projects/my-project/levels/MyLevel.js` importing from the shared GameEngine:

```javascript
// Goes up 3 dirs (levels → my-project → projects → js) then into GameEnginev1.1
import Player from '../../../GameEnginev1.1/essentials/Player.js';
```

For imports within the same project:

```javascript
import SpriteGenerator from './SpriteGenerator.js';
```

Page files (`.md`) use `{{site.baseurl}}` absolute paths:

```javascript
import MyLevel from '{{site.baseurl}}/assets/js/projects/my-project/levels/MyLevel.js';
```

## Gitignore

Distributed files are auto-generated and should not be committed. The `.gitignore` includes:

```
assets/js/projects/
```

Only `_projects/` source files are tracked in git.

## Testing a Project

1. **Build**: `make build-registered-projects` — should print `✅ <name> built successfully`
2. **Verify files**: `ls assets/js/projects/<name>/levels/` — should contain your JS files
3. **Run server**: `make` — starts Jekyll; navigate to the page that loads your project
4. **Clean cycle**: `make clean-registered-projects && make build-registered-projects` — verifies clean rebuild
5. **Browser console**: Open DevTools and check for import errors (404s or syntax errors)
