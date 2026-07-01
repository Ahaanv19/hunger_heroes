# Hunger Heroes Game Project Makefile
# Generic targets: build, clean, watch, docs, docs-clean
# Called from main Makefile via: make -C _projects/hunger-heroes-game <target>

###########################################
# Project Configuration
###########################################

PROJECT_SRC = $(CURDIR)
PROJECT_NAME = $(notdir $(PROJECT_SRC))

# Workspace root (main Makefile directory - two levels up from here)
WORKSPACE_ROOT = ../..

# Distribution destination (relative to workspace root)
JS_DEST = $(WORKSPACE_ROOT)/assets/js/projects/$(PROJECT_NAME)

###########################################
# Build Targets
###########################################

# Main build target - copy level JS files to distribution
build:
	@mkdir -p $(JS_DEST)/levels
	@cp levels/*.js $(JS_DEST)/levels/ 2>/dev/null || true
	@echo "✅ $(PROJECT_NAME) built successfully"
	@echo "   Source: _projects/$(PROJECT_NAME)/levels/"
	@echo "   JavaScript: assets/js/projects/$(PROJECT_NAME)/levels/"

# Clean distributed files (keeps source intact)
clean:
	@echo "🧹 Cleaning $(PROJECT_NAME) distribution..."
	@rm -rf $(JS_DEST)
	@echo "✓ Distribution cleaned (source files preserved in _projects/$(PROJECT_NAME))"

###########################################
# Watch Target (for dev mode)
###########################################

watch:
	@echo "👀 Watching $(PROJECT_NAME) project (auto-copy on save)..."
	@if command -v fswatch >/dev/null 2>&1; then \
		fswatch -l 0.3 -r $(PROJECT_SRC)/levels 2>/dev/null | while read changed_file; do \
			filename=$$(basename "$$changed_file"); \
			echo "  🔄 Level changed: $$filename"; \
			mkdir -p $(JS_DEST)/levels; \
			cp "$$changed_file" $(JS_DEST)/levels/ 2>/dev/null || true; \
		done; \
	else \
		echo "⚠️  fswatch not installed (sudo apt install fswatch for auto-watch)"; \
		echo "   Falling back to manual: run 'make -C _projects/$(PROJECT_NAME) build' after edits"; \
		while true; do sleep 3600; done; \
	fi

###########################################
# Documentation Targets (no docs for this project)
###########################################

docs:
	@echo "ℹ️  No documentation to publish for $(PROJECT_NAME)"

docs-clean:
	@echo "ℹ️  No documentation to clean for $(PROJECT_NAME)"

.PHONY: build clean watch docs docs-clean
