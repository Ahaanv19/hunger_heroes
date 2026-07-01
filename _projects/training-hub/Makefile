# Training Hub master Makefile
# Orchestrates nested sub-projects (e.g., training-game)

PROJECT_SRC = $(CURDIR)
PROJECT_NAME = $(notdir $(PROJECT_SRC))
WORKSPACE_ROOT = ../..

# Distribution destination for master-level assets
JS_DEST = $(WORKSPACE_ROOT)/assets/js/projects/$(PROJECT_NAME)

.PHONY: build clean watch docs docs-clean

build:
	@echo "📦 Building master project: $(PROJECT_NAME)"
	@# Copy any master-level JS/levels if present
	@if [ -d levels ]; then \
		mkdir -p $(JS_DEST)/levels; \
		cp levels/*.js $(JS_DEST)/levels/ 2>/dev/null || true; \
	fi
	@# Build nested sub-projects
	@for sub in $(CURDIR)/*; do \
		if [ -d "$$sub" ] && [ -f "$$sub/Makefile" ]; then \
			subname=$$(basename "$$sub"); \
			echo "  ↳ Building nested project: $$subname"; \
			make -C "$$sub" build || echo "    ⚠️  Build failed for $$subname"; \
		fi; \
	done
	@echo "✅ $(PROJECT_NAME) built"

clean:
	@echo "🧹 Cleaning master project: $(PROJECT_NAME)"
	@# Clean nested sub-projects
	@for sub in $(CURDIR)/*; do \
		if [ -d "$$sub" ] && [ -f "$$sub/Makefile" ]; then \
			subname=$$(basename "$$sub"); \
			echo "  ↳ Cleaning nested project: $$subname"; \
			make -C "$$sub" clean || true; \
		fi; \
	done
	@# Remove master-distributed files
	@rm -rf $(JS_DEST)
	@echo "✓ Master cleaned"

watch:
	@echo "👀 Watching master project (nested watch not automatic)."
	@echo "Run 'make -C _projects/$(PROJECT_NAME) watch' and/or 'make -C _projects/$(PROJECT_NAME)/<sub> watch' as needed"

docs:
	@echo "ℹ️  No docs to publish for $(PROJECT_NAME)"

docs-clean:
	@echo "ℹ️  No docs to clean for $(PROJECT_NAME)"
