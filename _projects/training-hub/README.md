# Training Hub

This is the `training-hub` master project. It orchestrates nested sub-projects (for example, `training-game`).

Structure:

- `levels/` — master-level JS files (optional)
- `training-game/` — nested sub-project containing its own `Makefile` and assets

Use `make -C _projects/training-hub build` to build the master and its nested projects.
