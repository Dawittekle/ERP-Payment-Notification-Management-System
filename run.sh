#!/usr/bin/env bash
# ==============================================================================
# QINDE ERP (ቅንደ) — Master Operations Launcher Script
# Tagline: Business, in order.
# Usage: ./run.sh [dev|build|test|docker|help]
# ==============================================================================

set -e

# Colors for terminal formatting
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================================${NC}"
echo -e "${GREEN}      QINDE ERP (ቅንደ) — Business, in order.       ${NC}"
echo -e "${BLUE}======================================================${NC}"

COMMAND=${1:-dev}

case "$COMMAND" in
  dev)
    echo -e "${YELLOW}Starting QINDE Frontend Development Server...${NC}"
    cd frontend
    if [ ! -d "node_modules" ]; then
      echo -e "${YELLOW}Installing frontend dependencies...${NC}"
      npm install
    fi
    npm run dev
    ;;

  build)
    echo -e "${YELLOW}Building QINDE Frontend Application...${NC}"
    cd frontend
    if [ ! -d "node_modules" ]; then
      npm install
    fi
    npm run build
    echo -e "${GREEN}Build completed successfully! Bundle located in frontend/dist${NC}"
    ;;

  test)
    echo -e "${YELLOW}Running QINDE ERP Automated & Smoke Test Suite...${NC}"
    if [ -f "tests/runner.js" ]; then
      node tests/runner.js
    else
      echo -e "${RED}Test runner script not found in tests/runner.js${NC}"
      exit 1
    fi
    ;;

  docker)
    echo -e "${YELLOW}Spinning up QINDE ERP Docker Stack (Frontend + Postgres)...${NC}"
    docker-compose up --build -d
    echo -e "${GREEN}Docker stack running at http://localhost:3000${NC}"
    ;;

  help|*)
    echo -e "Available commands:"
    echo -e "  ${GREEN}./run.sh dev${NC}     - Launch frontend dev server"
    echo -e "  ${GREEN}./run.sh build${NC}   - Build production frontend bundle"
    echo -e "  ${GREEN}./run.sh test${NC}    - Run automated smoke test suite"
    echo -e "  ${GREEN}./run.sh docker${NC}  - Launch Docker Compose environment"
    ;;
esac
