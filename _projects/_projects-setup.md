# Adding Projects In Hunger Heroes

This file is the repo-specific setup guide for extending `_projects/`.

The important change from the old generic version is that you should follow the
two patterns already present in this repository instead of treating `_projects/`
as an abstract framework.

## Choose The Right Pattern First

### Use a standalone project when

- the feature owns a single gameplay or interaction surface
- it can publish directly to `assets/js/projects/<name>/...`
- it does not need nested modules beneath it

Current example: `hunger-heroes-game/`

### Use a parent project with nested modules when

- the feature is a larger area such as Training Hub
- the parent owns shared shell logic or shared assets
- one or more subdirectories need their own `Makefile` and deployment path

Current example: `training-hub/` with `training-game/`

## Adding A New Standalone Project

### 1. Create the directory

```bash
mkdir -p _projects/my-project/levels
```

### 2. Add a project `Makefile`

Use the same shape as `hunger-heroes-game/Makefile`:

```makefile
PROJECT_SRC = $(CURDIR)
PROJECT_NAME = $(notdir $(PROJECT_SRC))
WORKSPACE_ROOT = ../..
JS_DEST = $(WORKSPACE_ROOT)/assets/js/projects/$(PROJECT_NAME)

build:
	@mkdir -p $(JS_DEST)/levels
	@cp levels/*.js $(JS_DEST)/levels/ 2>/dev/null || true

clean:
	@rm -rf $(JS_DEST)

watch:
	@if command -v fswatch >/dev/null 2>&1; then \
		fswatch -l 0.3 -r $(PROJECT_SRC)/levels 2>/dev/null | while read changed_file; do \
			mkdir -p $(JS_DEST)/levels; \
			cp "$$changed_file" $(JS_DEST)/levels/ 2>/dev/null || true; \
		done; \
	else \
		echo "fswatch not installed - run 'make -C _projects/$(PROJECT_NAME) build' manually"; \
		while true; do sleep 3600; done; \
	fi
```

If you need optional compatibility targets such as `docs` and `docs-clean`, keep
them as no-op targets like the existing top-level projects.

### 3. Register it

Add the directory name to `_projects/.makeprojects`.

```text
my-project
```

### 4. Validate it

```bash
make list-projects
make -C _projects/my-project build
```

## Adding A Nested Module Under An Existing Parent

Nested modules are the right fit when the feature belongs under a larger area,
such as Training Hub.

### 1. Create the nested directory

```bash
mkdir -p _projects/training-hub/my-module/levels
```

### 2. Add a nested `Makefile`

Use the same pattern as `training-hub/training-game/Makefile`:

```makefile
PROJECT_SRC = $(CURDIR)
PROJECT_NAME = $(notdir $(PROJECT_SRC))
MASTER_NAME = training-hub
WORKSPACE_ROOT = ../../..
JS_DEST = $(WORKSPACE_ROOT)/assets/js/projects/$(MASTER_NAME)/$(PROJECT_NAME)

build:
	@if [ -d levels ]; then \
		mkdir -p $(JS_DEST)/levels; \
		cp levels/*.js $(JS_DEST)/levels/ 2>/dev/null || true; \
	fi

clean:
	@rm -rf $(JS_DEST)
```

### 3. Do not add it to `.makeprojects`

Register only the parent project root. The parent `Makefile` discovers nested
sub-projects automatically.

### 4. Validate it

```bash
make -C _projects/training-hub build
make -C _projects/training-hub/my-module build
```

## Runtime Import Rules

Source files in `_projects/` should import other runtime JavaScript using the
published path structure, not the source path structure.

Example from a generated level file:

```javascript
import Player from '../../../GameEnginev1.1/essentials/Player.js';
```

Site pages should import built assets using `{{site.baseurl}}` paths, for
example:

```javascript
import GameLevelHungerHeroes from '{{site.baseurl}}/assets/js/projects/hunger-heroes-game/levels/GameLevelHungerHeroes.js';
```

## Quick Checks

```bash
make list-projects
make build-registered-projects
make clean-registered-projects
```

Use `make list-projects` first whenever you change `_projects/.makeprojects` or a
top-level project `Makefile`. It is the fastest way to confirm the registry still
matches the directory structure.
