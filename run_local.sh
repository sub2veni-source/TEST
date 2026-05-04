#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "Starting local server on http://127.0.0.1:4173"
python3 -m http.server 4173 --bind 0.0.0.0
