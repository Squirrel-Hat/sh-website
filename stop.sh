#!/usr/bin/env bash
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$DIR/.preview.pid"

if [ ! -f "$PID_FILE" ] || ! kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  echo "Preview is not running."
  rm -f "$PID_FILE"
  exit 0
fi

kill "$(cat "$PID_FILE")"
rm -f "$PID_FILE"
echo "Preview stopped."
