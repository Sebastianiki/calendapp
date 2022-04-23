# boiler-plate-pern
boiler plate to use with pern stack ( PosgreSQL - Express - React - Node )

To run with docker just use this command :

- docker-compose -f docker-compose.dev.yaml up -d

HOW TO RUN APP IN DEVELOPMENT WITHOUT DOCKER

First of all you have to install :

Nodejs
PostgreSql

Install node modules for client and server

to use the app you have to create .env on the client folder with this var

REACT_APP_API_URL=localhost
REACT_APP_API_PORT=5000

and one .env on server folder with this var

SECRET_JWT_SEED=ThisIsASecretPassword

in server/config/config.js put your db credentials

and then run sequelize-cli commands inside in the server folder

npm run db:create in case that you dont have the db created.
npm run db:migrate
npm run db:seed:all

this would create the database with his depencencies and create 3 users, 1 dev and 2 user, you can see this users on seeders folder.

after all, just run the app with npm run dev on server, and npm start on client.