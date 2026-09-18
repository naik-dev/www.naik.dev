#!/usr/bin/env bash

set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_root"

node --check app.js

for file in index.html styles.css app.js favicon.svg; do
  if [[ ! -s "$file" ]]; then
    echo "Missing or empty public file: $file"
    exit 1
  fi
done

echo "Checks passed."

