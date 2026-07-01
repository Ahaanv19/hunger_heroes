# Hunger Heroes Project Registry

`_projects/.makeprojects` is the registry for top-level interactive project
collections in this repository.

The registry is intentionally small. It tells the root `Makefile` which project
roots to build, and each project root is responsible for copying its own source
files into the runtime asset paths the site serves.

## What Counts As A Registered Project Here

In Hunger Heroes, a registered project is a top-level directory under
`_projects/` with its own `Makefile`.

Current registry entries:

- `hunger-heroes-game` - standalone donation game content used by the donate
  flow game page.
- `training-hub` - parent training workspace that can build both shared hub
  files and nested training modules such as `training-game`.

Nested modules are not added to `.makeprojects`. They are built by their parent
project.

## Registry File Rules

- One project root per line.
- Use directory names only, not paths.
- Lines starting with `#` are comments.
- Blank lines are ignored.
- Each registered project must have `_projects/<name>/Makefile`.

Example:

```text
hunger-heroes-game
training-hub
```

## How The Registry Is Used

When you run `make` or `make build-registered-projects` from the repo root:

1. The main `Makefile` reads `_projects/.makeprojects`.
2. For each listed project, it runs `make -C _projects/<name> build`.
3. The project's own `Makefile` copies source files into
   `assets/js/projects/<name>/...`.
4. Pages then import those generated runtime files.

That is why source lives in `_projects/`, but live page imports point to
`assets/js/projects/...`.

## Current Project Shapes

### Standalone project

`hunger-heroes-game/` owns its gameplay files directly.

```text
_projects/hunger-heroes-game/
|- Makefile
`- levels/
```

Published output:

```text
assets/js/projects/hunger-heroes-game/levels/
```

### Parent project with nested module(s)

`training-hub/` acts as a parent project.

```text
_projects/training-hub/
|- Makefile
|- levels/
`- training-game/
   |- Makefile
   `- levels/
```

Published output:

```text
assets/js/projects/training-hub/levels/
assets/js/projects/training-hub/training-game/levels/
```

This pattern matches the site itself: the Training Hub route is a shared page,
while its game module is only one part of that experience.

## Commands

```bash
make list-projects
make build-registered-projects
make clean-registered-projects

make -C _projects/hunger-heroes-game build
make -C _projects/training-hub build
make -C _projects/training-hub/training-game build
```

## Adding A New Entry

Register a new line in `.makeprojects` only when you are adding a new top-level
project root under `_projects/`.

Do not add nested directories such as `training-hub/training-game` to the
registry. Those belong under the parent project and are discovered there.

## Validation

Use these checks after editing the registry or project Makefiles:

```bash
make list-projects
make build-registered-projects
```

`make list-projects` is the fastest check for registry wiring. It confirms the
registered roots exist and shows any nested sub-projects that will be built by a
parent project.
