#!/bin/bash

git pull && docker build -t terminal:latest . && docker container stop terminal && docker system prune -f && docker run --rm --name terminal -p 4020:4020 -d terminal:latest