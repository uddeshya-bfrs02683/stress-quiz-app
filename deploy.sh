#!/bin/bash

PROJECT_DIR="/home/ubuntu/stress-quiz-app"

if [ ! -d "$PROJECT_DIR" ]; then
    git clone git@github.com:uddeshya-bfrs02683/stress-quiz-app.git
fi

cd "$PROJECT_DIR"
git reset --hard && git clean -fd && git checkout main
git pull

docker compose up -d --build

docker system prune -f