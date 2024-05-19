# About
This repository contains everything you need to get started to run a 
Laravel application with Docker as fast as possible-- using Ngninx, MySQL, and PHP 8.2.

# Setup Requirements for local machine
docker & git

## Step 1: Create the project directory & Clone this repo
```sh
mkdir ~/{example-path}/{appname}-project/
cd ~/{example-path}/{appname}-project/
git clone git@github.com:clemmerwis/local-docker-laravel-dev.git
```

## Step 2: Edit the docker-compose.yml

#### select all occurences of "appex" rename to "{appname}".

Note! Don't include hyphens in your database environment
```sh
This is good!
  mysql:
    image: mysql:latest
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=my_secret_pw
      - MYSQL_DATABASE={appname}
      - MYSQL_USER={appname}_user
      - MYSQL_PASSWORD={appname}_pass

This is bad. Don't use hyphens!
    environment:
      - MYSQL_ROOT_PASSWORD=my-secret-pw
      - MYSQL_DATABASE=app-example
      - MYSQL_USER=app-example_user
      - MYSQL_PASSWORD=app-example_pass
```

#### Update all volume & network references

1. Name them at the bottom of the file
```sh
networks:
  {appname}-network:
```

```sh
volumes:
  {appname}-mysql-data:
```

2. Update the containers
```sh
  nginx:
    networks:
      - {appname}-network

  mysql:
    networks:
      - {appname}-network

  app:
    networks:
      - {appname}-network
```

## Step 3: Build with Docker
```sh
cd ~/{example-path}/{appname}-project/
mkdir {appname}

cd ~/example-path/appex-project/dockerdir
docker compose -p {appname} build
```

Once the containers are built, you can launch the newly created Docker environment.

```sh
docker compose -p {appname} up -d
```

After the above command, there should be 4 containers running: Nginx, MySQL, App, & Redis.

## Step 4: Enter the App & Clone or create your repo into the project 
Now enter the app container by listing the running containers

```sh
docker compose ps
```

Copy the id of the app container.

```sh
docker exec -it {app_container_id} bash
```

## Step 5: Clone or create your repo into the project directory

The deafult folder inside that container should be set to: ':/var/www#'
Inside of that folder utilize the conatainer's composer to create a new laravel project

```sh
git clone git@github.com:your-name/your-repo.git

Or

composer create-project laravel/laravel {appname}
```

The empty folder needed to be there for docker to make it the default path in the container, but once you run one the above commands&mdash; you will get a repeat folder issue that looks like: 

```sh
~/{example-path}/{appname}-project/{appname}/{appname}
```
To fix this, simply move the second {appname} and everything inside into the parent.

PowerShell command below: 
```sh
Get-ChildItem -Path . | Move-Item -Destination ..
cd ../
rm {appname}
```

## Step 6: Set up Vite and the ENV file
#### make sure db creds in `.env` match those in the docker-compose.yml `mysql environment variables`.
```sh
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE={appname}
DB_USERNAME={appname}_user
DB_PASSWORD={appname}_pass
```
Also make sure this is in the env file for vite to use
```sh
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

#### Now that your app is in the project directory, replace the vite-config.js with the one that comes with this repo.

Add vite to welcome blade for testing
```sh
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
```

#### from inside the container's '/var/www/' directory, run the following commands in order.
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