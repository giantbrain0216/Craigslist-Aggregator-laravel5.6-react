#!/bin/bash
export APP_NAME="clag-laravel-react"
export DOCKER_APP_DIR="laradock"
export DOCKER_FOLDER="${PWD}/${DOCKER_APP_DIR}/"
alias docker-${APP_NAME}="cd ${DOCKER_FOLDER}"
alias docker-${APP_NAME}-workspace="docker-${APP_NAME} && docker-compose exec workspace bash"
alias docker-${APP_NAME}-start="docker-${APP_NAME} && docker-compose up -d nginx php-fpm && cd ${PWD}"
alias docker-${APP_NAME}-stop="docker-${APP_NAME} && docker-compose down"
alias docker-${APP_NAME}-restart="docker-${APP_NAME}-stop && docker-${APP_NAME}-start"
