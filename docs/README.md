# About
This repository contains everything you need to get started to run a 
Laravel application with Docker as fast as possible.


# Setup Requirements
docker & docker compose


## Step 1: Copy files in your directory
It's assumed that you are adding this to an existing project.

Copy all files except `.env` and `readme.md` in your current project folder. 
Overwrite the credentials from your `.env` locally with those provided here. 
If you dont want to overwrite database name and user, then please adjust the file in `docker-compose/mysql/init/db.sql` according to your needs.


## Step 2: Execute docker
Run container (the project name can be anything)

  ```sh
  docker compose -p project-name build
  ```

this may take a moment. After the container has been setup, check the status with

  ```sh
  docker-compose ps
  ```

you should see three containers are running.


## Step 3: Install Composer dependencies
Bash into your container:

  ```sh
  docker compose exec -it app_container_id bash
  ```

Note*: These commands can be run from inside that container

  ```
  container> vendor/bin/phpunit"
  container> php artisan"
  container> composer"
  ```

Install composer dependencies (this may also take a moment):

  ```sh
  composer install
  ```

and finally generate a key

  ```sh
  php artisan key:generate
  ```

The app should now be accessible under `localhost:8005`


# Enhancements
These commands can be run from the

  ```
  container> vendor/bin/phpunit"
  container> php artisan"
  container> composer"
  ```

Also, if you want to keep you laravel docker container
running after a restart of your computer, you may add

  ```
  restart: unless-stopped
  ```

to each of your services (app,db,nginx).






