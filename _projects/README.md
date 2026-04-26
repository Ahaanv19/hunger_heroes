# `_projects` in Hunger Heroes

`_projects/` is the source workspace for the interactive parts of this site.
Instead of editing published JavaScript directly under `assets/`, developers work
inside `_projects/` and let the project Makefiles copy runtime files into the
locations the site actually serves.

## How It Fits This Repo

This repository currently uses `_projects/` for two different kinds of site work:

- `hunger-heroes-game/` is the donation journey game used by
  `navigation/donate/game.md`.
- `training-hub/` is the source area for training-related interactive work. The
  `/training-hub/` page is defined in `navigation/training.md`, and the nested
  `training-game/` module is where its game-specific JavaScript lives.

That means `_projects/` is not a generic sandbox here. It is the authoring area
for the site's custom game and training experiences.

## Current Structure

```text
_projects/
|- .makeprojects
|- .list_projects.py
|- README.md
|- REGISTRATION.md
|- _projects-setup.md
|- hunger-heroes-game/
|  |- Makefile
|  |- docs/
|  `- levels/
`- training-hub/
   |- Makefile
   |- README.md
   |- levels/
   `- training-game/
      |- Makefile
      `- levels/
```

## Build Flow

1. Root `make` runs `build-registered-projects` from the main `Makefile`.
2. `build-registered-projects` reads `_projects/.makeprojects`.
3. Each registered top-level directory must have its own `Makefile`.
4. That `Makefile` copies source files from `_projects/` into publishable runtime
   paths under `assets/js/projects/`.
5. Site pages import from `assets/js/projects/...`, not from `_projects/`
   directly.

Examples from the current repo:

- `hunger-heroes-game/levels/*.js` builds to
  `assets/js/projects/hunger-heroes-game/levels/`
- `training-hub/training-game/levels/*.js` builds to
  `assets/js/projects/training-hub/training-game/levels/`

## Project Patterns Used Here

### Standalone project

`hunger-heroes-game/` is a standalone project. Its top-level `Makefile` copies
its own `levels/` files straight into the published assets directory.

### Hub project with nested modules

`training-hub/` is a parent project. Its top-level `Makefile` can build any
shared files in `training-hub/levels/`, then it delegates to nested modules such
as `training-hub/training-game/`.

Only the parent directory is registered in `.makeprojects`. Nested modules are
discovered and built by their parent project.

## Commands

```bash
make list-projects
make build-registered-projects
make clean-registered-projects

make -C _projects/hunger-heroes-game build
make -C _projects/training-hub build
make -C _projects/training-hub/training-game build
```

## When To Edit `_projects/`

Edit `_projects/` when you are changing gameplay logic, training modules, or
other site-specific interactive assets.

Edit `assets/js/projects/...` only if you are inspecting generated output. Those
published files should be treated as build artifacts, not the source of truth.

## Related Docs

- `REGISTRATION.md` explains how the project registry works in this repo.
- `_projects-setup.md` shows how to add a new standalone project or a new nested
  module using the patterns already present in Hunger Heroes.