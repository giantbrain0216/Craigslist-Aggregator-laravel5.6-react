# Pre-requisites
--------------------------

Please make sure that http services are not running on your local machine, if so, locate the local nginx/apache service and stop the daemon
 
- `chmod +x ./install-env.sh && ./install-env.sh`

## Install Procedures
--------------------------

- `chmod +x ./install-init.sh && ./install-init.sh`
- once `install-init.sh` completes, it will take you to a bash prompt, run the following inside:
  - `composer install`
  - `artisan key:generate`
  - `yarn install`
  - `npm run dev`

### Workflow, Dev Post Install
--------------------------

- 1st thing after machine reboots
  - `source ./install-aliases.sh`
  - `docker-clag-laravel-react-start` or `docker-clag-laravel-react-stop`
- Updating code
  - `source ./install-aliases.sh`
  - `git pull`
  - `docker-clag-laravel-react-workspace`
  - `yarn install`
  - `composer install`
  - `npm run dev` or `npm run watch` for watch listener

### Troubleshooting
-------------------------
- sometimes you're in trouble, and things just break, you may need to rebuild your images
  - `docker-compose down`
  - `docker-compose build --no-cache nginx mysql phpmyadmin workspace php-fpm`
  - purge all docker images
    - docker stop $(docker ps -a -q)
    - docker rm $(docker ps -a -q)
    - docker rmi $(docker images -q)
