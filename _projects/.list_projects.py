#!/usr/bin/env python3

import os
import sys

REGISTRY_PATH = '_projects/.makeprojects'
PROJECTS_ROOT = '_projects'


def iter_registered_projects():
    with open(REGISTRY_PATH, encoding='utf-8') as registry_file:
        for raw_line in registry_file:
            project_name = raw_line.strip()
            if project_name and not project_name.startswith('#'):
                yield project_name


def find_nested_projects(project_dir):
    nested_projects = []
    for entry in sorted(os.listdir(project_dir)):
        if entry.startswith('.'):
            continue
        nested_dir = os.path.join(project_dir, entry)
        nested_makefile = os.path.join(nested_dir, 'Makefile')
        if os.path.isdir(nested_dir) and os.path.isfile(nested_makefile):
            nested_projects.append(entry)
    return nested_projects


if not os.path.isfile(REGISTRY_PATH):
    print('No _projects/.makeprojects file found')
    sys.exit(0)

print('Hunger Heroes interactive project registry:')
for project_name in iter_registered_projects():
    project_dir = os.path.join(PROJECTS_ROOT, project_name)
    project_makefile = os.path.join(project_dir, 'Makefile')

    if not os.path.isdir(project_dir):
        print(f'  ! {project_name} (missing directory)')
        continue

    if not os.path.isfile(project_makefile):
        print(f'  ! {project_name} (missing Makefile)')
        continue

    nested_projects = find_nested_projects(project_dir)
    project_kind = 'hub project' if nested_projects else 'standalone project'
    print(f'  - {project_name} ({project_kind})')

    for nested_name in nested_projects:
        print(f'    sub-project: {nested_name}')
