#!/bin/bash
# Start the Cymru Wizard server
cd "$(dirname "$0")"

# Kill any existing instance
kill $(lsof -ti:18801) 2>/dev/null
sleep 0.5

# Export API key - set ANTHROPIC_API_KEY env var before running
# Needs a real API key (sk-ant-api...), not an OAuth token
if [ -z "$ANTHROPIC_API_KEY" ]; then
  echo "⚠️  ANTHROPIC_API_KEY not set. AI features will be disabled."
  echo "   Set it with: export ANTHROPIC_API_KEY=sk-ant-api..."
fi

# Start server
nohup node server.js > /tmp/cymru-wizard.log 2>&1 &
echo "Started with PID $!"
sleep 1
cat /tmp/cymru-wizard.log
