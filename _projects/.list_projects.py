#!/usr/bin/env python3
import os, sys
reg = '_projects/.makeprojects'
if not os.path.isfile(reg):
    print('  No _projects/.makeprojects file found')
    sys.exit(0)
print('📦 Registered Projects:')
with open(reg) as f:
    for raw in f:
        line = raw.strip()
        if not line or line.startswith('#'):
            continue
        proj = line
        d = os.path.join('_projects', proj)
        if os.path.isdir(d):
            if os.path.isfile(os.path.join(d, 'Makefile')):
                print(f'  ✅ {proj} (active)')
            else:
                print(f'  ⚠️  {proj} (missing Makefile)')
            for entry in sorted(os.listdir(d)):
                subp = os.path.join(d, entry)
                if os.path.isdir(subp) and os.path.isfile(os.path.join(subp, 'Makefile')):
                    print(f'    - {entry}')
        else:
            print(f'  ⚠️  {proj} (missing directory)')
