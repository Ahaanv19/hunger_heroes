# Setting Up the `_projects` System in Your Repository

A step-by-step guide for adding the `_projects` auto-registration build system to any Jekyll-based repository.

---

## What This System Does

The `_projects` system provides a clean way to organize self-contained project source code (JavaScript modules, CSS, images, data files, etc.) separately from your Jekyll site structure. A Makefile-based auto-registration mechanism discovers registered projects and distributes their files to runtime locations before Jekyll starts.

**Key benefits:**
- The root Makefile contains zero project-specific code
- Each project owns its own build rules
- Adding or removing a project is a one-line change
- Distributed files are auto-generated and gitignored
- Works with any file type — not limited to game engines or JavaScript

---

## What Can a Project Contain?

A project can contain **any combination** of directories and file types. The Makefile you write for the project controls what gets copied and where. Some examples:

| Project Type | Source Directories | Distribution Destinations |
|---|---|---|
| Game with levels | `levels/`, `images/` | `assets/js/projects/<name>/`, `images/projects/<name>/` |
| JS utility library | `src/` | `assets/js/projects/<name>/` |
| CSS theme pack | `styles/` | `assets/css/projects/<name>/` |
| Data-driven page | `data/`, `scripts/` | `assets/js/projects/<name>/` |
| Full app module | `levels/`, `model/`, `images/`, `docs/` | Multiple locations |

The directory names (`levels/`, `model/`, `src/`, etc.) are entirely up to you. The system doesn't enforce any internal structure — your project Makefile defines the mapping.

---

## Setup Instructions

### Step 1: Create the `_projects` Directory

```bash
mkdir -p _projects
```

### Step 2: Create the Registry File

Create `_projects/.makeprojects`:

```
# Project Auto-Registration
# List enabled projects (one per line, no paths needed)
# Projects must have: _projects/<name>/Makefile
# Each Makefile must provide generic targets: build, clean, watch
#
# Format: <project-name>

```

This file starts empty (comments only). You'll add project names here as you create them.

**Registry rules:**
- One project name per line
- Name must match a directory under `_projects/`
- Lines starting with `#` are comments
- Blank lines are ignored
- Comment out a line to temporarily disable a project without deleting it

### Step 3: Add Registration Targets to Your Root Makefile

Paste the following block at the end of your root `Makefile`:

```makefile
###########################################
# Project Auto-Registration
###########################################

# Projects are registered in _projects/.makeprojects (one per line)
# Each project must have: _projects/<name>/Makefile with generic targets: build, clean, watch
# Main Makefile calls projects via: make -C _projects/<name> <target>

# Build all registered projects
build-registered-projects:
	@if [ -f _projects/.makeprojects ]; then \
		grep -v '^\#' _projects/.makeprojects | grep -v '^$$' | while read proj; do \
			if [ -f "_projects/$$proj/Makefile" ]; then \
				echo "📦 Building project: $$proj"; \
				make -C "_projects/$$proj" build 2>/dev/null || echo "  ⚠️  Build failed for $$proj"; \
			fi; \
		done; \
	fi

# Clean all registered project distributions
clean-registered-projects:
	@if [ -f _projects/.makeprojects ]; then \
		grep -v '^\#' _projects/.makeprojects | grep -v '^$$' | while read proj; do \
			if [ -f "_projects/$$proj/Makefile" ]; then \
				make -C "_projects/$$proj" clean 2>/dev/null || true; \
			fi; \
		done; \
	fi

# List all registered projects
list-projects:
	@echo "📦 Registered Projects:"
	@if [ -f _projects/.makeprojects ]; then \
		grep -v '^\#' _projects/.makeprojects | grep -v '^$$' | while read proj; do \
			if [ -f "_projects/$$proj/Makefile" ]; then \
				echo "  ✅ $$proj (active)"; \
			else \
				echo "  ⚠️  $$proj (missing Makefile)"; \
			fi; \
		done; \
	else \
		echo "  No _projects/.makeprojects file found"; \
	fi
```

### Step 4: Wire Into Your Existing Targets

Add `build-registered-projects` as a dependency of your server/serve target so projects are built before Jekyll starts:

```makefile
# BEFORE:
server: stop convert

# AFTER:
server: stop build-registered-projects convert
```

Add `clean-registered-projects` to your `clean` target:

```makefile
clean: stop
	# ...existing clean steps...
	@make clean-registered-projects
	# ...rest of clean...
```

### Step 5: Update `.gitignore`

Add distribution paths so auto-generated files aren't committed. Add whichever paths your projects distribute to:

```gitignore
# Project distributions (auto-generated from _projects/ source)
assets/js/projects/
assets/css/projects/
images/projects/
```

Only `_projects/` source files should be tracked in git.

---

## Creating a New Project

### 1. Create the project directory

```bash
mkdir -p _projects/my-project
```

Add whatever subdirectories your project needs:

```bash
mkdir -p _projects/my-project/levels    # game levels, JS modules, etc.
mkdir -p _projects/my-project/model     # data layer
mkdir -p _projects/my-project/images    # image assets
mkdir -p _projects/my-project/styles    # CSS files
mkdir -p _projects/my-project/docs      # documentation
```

### 2. Add your source files

Place source files in the directories you created. These are the single source of truth — distributed copies are auto-generated.

### 3. Create the project Makefile

Create `_projects/my-project/Makefile`. Here is a full template you can adapt:

```makefile
# my-project Makefile
# Generic targets: build, clean, watch, docs, docs-clean
# Called from root via: make -C _projects/my-project <target>

PROJECT_SRC = $(CURDIR)
PROJECT_NAME = $(notdir $(PROJECT_SRC))
WORKSPACE_ROOT = ../..

# Distribution destinations — add/remove as needed
JS_DEST = $(WORKSPACE_ROOT)/assets/js/projects/$(PROJECT_NAME)
CSS_DEST = $(WORKSPACE_ROOT)/assets/css/projects/$(PROJECT_NAME)
IMAGES_DEST = $(WORKSPACE_ROOT)/images/projects/$(PROJECT_NAME)

# Build: copy source files to distribution locations
build:
	@# JavaScript / levels
	@if [ -d levels ]; then \
		mkdir -p $(JS_DEST)/levels; \
		cp levels/*.js $(JS_DEST)/levels/ 2>/dev/null || true; \
	fi
	@# Models
	@if [ -d model ]; then \
		mkdir -p $(JS_DEST)/model; \
		cp model/*.js $(JS_DEST)/model/ 2>/dev/null || true; \
	fi
	@# Stylesheets
	@if [ -d styles ]; then \
		mkdir -p $(CSS_DEST); \
		cp styles/*.css $(CSS_DEST)/ 2>/dev/null || true; \
	fi
	@# Images
	@if [ -d images ]; then \
		mkdir -p $(IMAGES_DEST); \
		cp -r images/* $(IMAGES_DEST)/ 2>/dev/null || true; \
	fi
	@echo "✅ $(PROJECT_NAME) built successfully"

# Clean: remove all distributed files
clean:
	@echo "🧹 Cleaning $(PROJECT_NAME) distribution..."
	@rm -rf $(JS_DEST)
	@rm -rf $(CSS_DEST)
	@rm -rf $(IMAGES_DEST)

# Watch: auto-copy on file changes (requires fswatch)
watch:
	@if command -v fswatch >/dev/null 2>&1; then \
		echo "👀 Watching $(PROJECT_NAME)..."; \
		fswatch -l 0.3 -r $(PROJECT_SRC) 2>/dev/null | while read f; do \
			$(MAKE) build 2>/dev/null; \
		done; \
	else \
		echo "⚠️  fswatch not installed — run 'make -C _projects/$(PROJECT_NAME) build' manually"; \
		while true; do sleep 3600; done; \
	fi

# Documentation (optional)
docs:
	@echo "ℹ️  No docs for $(PROJECT_NAME)"

docs-clean:
	@echo "ℹ️  No docs to clean for $(PROJECT_NAME)"

.PHONY: build clean watch docs docs-clean
```

**Simplify as needed.** If your project only has JS files in `levels/`, strip out the CSS, images, and model sections. The only required targets are `build` and `clean`.

### 4. Register the project

Add one line to `_projects/.makeprojects`:

```
my-project
```

### 5. Test

```bash
make build-registered-projects    # Should print "✅ my-project built successfully"
make list-projects                # Should show "✅ my-project (active)"
make clean-registered-projects    # Should clean distributed files
make build-registered-projects    # Rebuild to confirm clean cycle works
```

---

## Import Paths

### From a distributed JS file → shared engine or library

Files get distributed to `assets/js/projects/<name>/<subdir>/`. Use relative paths to reach other asset directories:

```javascript
// From assets/js/projects/my-project/levels/MyFile.js
// To reach assets/js/GameEnginev1.1/essentials/:
import Player from '../../../GameEnginev1.1/essentials/Player.js';

// To reach another file in the same project:
import Helper from './Helper.js';

// To reach the model directory in the same project:
import DataStore from '../model/DataStore.js';
```

### From a Jekyll page (.md file) → project files

Use `{{site.baseurl}}` absolute paths:

```javascript
// From any .md page:
import MyLevel from '{{site.baseurl}}/assets/js/projects/my-project/levels/MyLevel.js';
```

### From a Jekyll page → shared engine files

These paths stay the same as before — the engine lives at its original location:

```javascript
import { GameCore } from '{{site.baseurl}}/assets/js/GameEnginev1.1/essentials/Game.js';
```

---

## Commands Quick Reference

| Command | Scope | Description |
|---------|-------|-------------|
| `make` | All | Full start — build projects + convert + serve |
| `make build-registered-projects` | All | Build every registered project |
| `make clean-registered-projects` | All | Clean all distributed project files |
| `make list-projects` | All | Show registration status |
| `make -C _projects/<name> build` | One | Build a single project |
| `make -C _projects/<name> clean` | One | Clean a single project |
| `make -C _projects/<name> watch` | One | Watch a single project for changes |

---

## Troubleshooting

**"Build failed for my-project"**
- Check that `_projects/my-project/Makefile` exists and has a `build` target
- Run `make -C _projects/my-project build` directly to see the full error

**Files not appearing at runtime**
- Verify the distributed files exist: `ls assets/js/projects/my-project/`
- If empty, run `make build-registered-projects`
- Check that your project Makefile `cp` commands match your directory names

**Import errors (404) in the browser**
- Check the relative path from the distributed location, not the source location
- Count directory levels: `assets/js/projects/<name>/levels/` is 5 levels deep from root
- Use browser DevTools Network tab to see exactly which path is failing

**Project not showing in `make list-projects`**
- Check `_projects/.makeprojects` — the name must match the directory exactly
- Ensure no leading/trailing spaces on the line
- Ensure the line isn't commented out with `#`

**`make` still works even without `_projects/`**
- Yes — if `_projects/.makeprojects` doesn't exist, `build-registered-projects` silently does nothing. The system is fully optional and backwards-compatible.
