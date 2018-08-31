#!/usr/bin/env bash
git clone https://github.com/Laradock/laradock.git
cp ./env-laradock ./laradock/.env
chmod 777 ./bootstrap ./storage -R
cp ./env-laravel ./.env
cp ./resources/assets/js/environment-example.json ./resources/assets/js/environment.json
cd ./laradock
docker-compose up -d nginx mysql
cd ./laradock/

echo "Please modify files: ./resources/assets/js/environment.json"
echo "Please modify files: ./.env"
echo "Then Run: source ./install-aliases.sh && docker-advancedprogress-start"
