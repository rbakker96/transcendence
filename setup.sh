#!/bin/bash

# Set color
Color_Off='\033[0m'       # Text Reset
Green='\033[0;32m'        # Green
Cyan='\033[0;36m'         # Cyan

echo "$Green install Nestjs packages $Color_Off"
cd Nestjs
npm install

echo "$Green install React packages $Color_Off"
cd ../React
npm install

echo "$Green run docker-compose $Color_Off"
cd ..
docker-compose up
