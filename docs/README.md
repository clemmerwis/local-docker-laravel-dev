# About
This repository contains everything you need to get started to run a 
Laravel application with Docker as fast as possible-- using Ngninx, MySQL, and PHP 8.2.

# Setup Requirements for local machine
docker & git

## Step 1: Create the project directory & Clone this repo
```sh
mkdir ~/{app-path}/{appname}-project/
cd ~/{app-path}/{appname}-project/
git clone git@github.com:clemmerwis/local-docker-laravel-dev.git
moveEverythingIntoParentFolder
cd ../
rm ./local-docker-laravel-dev

Result:
appname-project/
  dockerdir
  docs
  vite.config.js
```

## Step 2: Edit the .env
1. Rename all instances of "appex"

## Step 3: Build with Docker
```sh
cd ~/{app-path}/{appname}-project/
mkdir {appname}

cd ~/{app-path}/{appname}-project/dockerdir
docker compose -p {appname} build
```

Once the containers are built, you can launch the newly created Docker environment.

```sh
docker compose -p {appname} up -d
```

After the above command, there should be 3 containers running: Nginx, MySQL, App
& network and volume created.

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
~/{app-path}/{appname}-project/{appname}/{appname}
```
To fix this, simply move the second {appname} and everything inside into the parent.

PowerShell command below: 
```sh
Get-ChildItem -Path . | Move-Item -Destination ..
cd ../
rm {appname/appname}
```

## Step 6: Set up Laravel .env file
#### make sure db creds in `.env` match those in the docker-compose.yml `mysql environment variables`.
```sh
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE={appname}
DB_USERNAME={appname}_user
DB_PASSWORD={appname}_pass
```

#### Now that your app is in the project directory, replace the vite-config.js with the one that comes with this repo.
```sh
// package.json should include:
{
  "devDependencies": {
    "@tailwindcss/vite": "^...",
    "@vitejs/plugin-vue": "^...",
    "autoprefixer": "^...",
    "laravel-vite-plugin": "^...",
    "postcss": "^...",
    "tailwindcss": "^...",
    "vite": "^...",
    "vue": "^..."
  }
}
```

#### from inside the container's '/var/www/' directory, run the following commands in order.
```sh
composer install
php artisan key:generate

php artisan storage:link
chmod -R 777 storage bootstrap/cache
php artisan migrate:fresh --seed
```

Visit http://localhost/ and make sure the laravel welcome page loads without error

```sh
npm install
# Then add Vue support
npm install vue@latest
npm install --save-dev @vitejs/plugin-vue autoprefixer postcss

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