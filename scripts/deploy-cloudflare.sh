#!/usr/bin/env bash

set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
staging_dir="$(mktemp -d "${TMPDIR:-/tmp}/www-naik-dev.XXXXXX")"

cleanup() {
  rm -rf "$staging_dir"
}
trap cleanup EXIT

cd "$project_root"
./scripts/check.sh

cp index.html styles.css app.js favicon.svg robots.txt sitemap.xml social-card.svg "$staging_dir/"

commit_hash="$(git rev-parse --short HEAD)"
commit_message="$(git log -1 --pretty=%s)"

CLOUDFLARE_ACCOUNT_ID="206af19c8ad658c40528f31e39cf6ca6" \
  npx wrangler pages deploy "$staging_dir" \
  --project-name www-naik-dev \
  --branch main \
  --commit-hash "$commit_hash" \
  --commit-message "$commit_message" \
  --commit-dirty=true
