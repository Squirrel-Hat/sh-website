#!/usr/bin/env bash
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT="${PORT:-8000}"
PID_FILE="$DIR/.preview.pid"

if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  echo "Preview already running (pid $(cat "$PID_FILE")) at http://localhost:$PORT"
  exit 0
fi

cd "$DIR"
nohup python3 -m http.server "$PORT" >/tmp/sh-website-preview.log 2>&1 &
echo $! > "$PID_FILE"

echo "Preview running at http://localhost:$PORT"
