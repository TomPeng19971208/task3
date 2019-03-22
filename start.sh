#!/bin/bash
export MIX_ENV=prod
export PORT=6002
echo "Stopping old copy of app, if any..."

_build/prod/rel/task3/bin/task3 stop || true

echo "Starting app..."

# Start to run in background from shell.
#_build/prod/rel/task3/bin/task3 start
# Foreground for testing and for systemd
_build/prod/rel/task3/bin/task3 foreground
