# About
This repository contains everything you need to get started to run a 
Laravel application with Docker as fast as possible-- using Ngninx, MySQL, and PHP 8.2.

# Setup Requirements
docker

git

laravel cli installer


## Step 1: Copy files in your directory
It's assumed that you are adding this to an existing project.

Copy all files except `.env` and `readme.md` in your current project folder. 
Overwrite the credentials from your `.env` locally with those provided later in this readme.
If you dont want to overwrite database name and user, then please adjust the file in `docker-compose/mysql/init/db.sql` according to your needs.


## Step 2: Execute docker
Run container (the project name can be anything)

  ```sh
  docker compose -p project-name build
  ```

## Step 1: Create the project directory & Clone this repo
```sh
mkdir ~/example-path/appex-project/
cd ~/example-path/appex-project/
git clone git@github.com:clemmerwis/local-docker-laravel-dev.git
```

## Step 2: Edit the docker-compose.yml
select all occurences of "appex" and edit to match the name of your project.

Note! Don't include hyphens in your database environment
```sh
This is good!
  mysql:
    image: mysql:latest
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=my-secret-pw
      - MYSQL_DATABASE=appex
      - MYSQL_USER=appex_user
      - MYSQL_PASSWORD=appex_pass

This is bad. Don't use hyphens!
    environment:
      - MYSQL_ROOT_PASSWORD=my-secret-pw
      - MYSQL_DATABASE=app-example
      - MYSQL_USER=app-example_user
      - MYSQL_PASSWORD=app-example_pass
```

Note! Update all volume paths to match your local project path
```sh
volumes:
  - ~/myComp/web-work/local-docker-dev/appex-project/appex:/var/www
  
  Example:
  - ~/example-path/appex-project/appex:/var/www
```

## Step 3: Clone your repo into the project directory & set up Vite config
```sh
cd ~/example-path/appex-project/
git clone git@github.com:your-name/your-repo.git

Or

cd ~/example-path/appex-project/
laravel new appex
```

Once you your app is in the project directory, replace the vite-config.js with the one that comes with this repo.

## Step 4: Build with Docker 
docker compose -p {appname} build

```sh
cd ~/example-path/appex-project/dockerdir
docker compose -p appex build 
```

Once the containers are built, you can launch the newly created Docker environment.

```sh
cd ~/example-path/appex-project/
docker compose -p appex up -d
```

After the above command, there should be 4 containers running: Nginx, MySQL, App, & Redis.

## Step 4: Install & Start the App
Now enter the app container

```sh
docker compose ps
```

The command above will display a list of running containers. Copy the id of the app container.

```sh
docker exec -it {app_container_id} bash
```

once inside the var/www directory, run the following commands in order.

```sh
composer install
npm install --save-dev @vitejs/plugin-vue
php artisan key:generate
php artisan migrate:fresh --seed
npm run dev
```

The last command should start the app on localhost. Open the welcome.blade.php
and test if Vite is HMR is working. You should see a loading symbol in the browser tab if the HMR is working, it may take longer than expected.

## Final Notes
Stop the project

```sh
docker compose -p {appname} stop 
```

Start the project

```sh
docker compose -p {appname} start 
```

Destroy the containers

```sh
docker compose -p {appname} down 
```

Build the containers

```sh
docker compose -p {appname} build --no-cache
```