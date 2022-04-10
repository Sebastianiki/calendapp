# boiler-plate-pern
boiler plate to use with pern stack ( PosgreSQL - Express - React - Node )

HOW TO RUN APP IN DEVELOPMENT

First of all you have to install :

-Nodejs
-PostgreSql

Exec npm run install-nodes, this command will install depencies of client and server

to use the app you have to create .env on the root directory with this var

SECRET_JWT_SEED=ThisIsASecretPassword

and one .env on client folder with this var

REACT_APP_API_URL=http://localhost:5000/api/

in server/config/config.json put your db credentials

and then run sequelize-cli commands inside in the server folder

npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

this would create the database with his depencencies and create 3 users, 1 dev and 2 user, you can see this users on seeders folder.

after all, just run the app with npm run dev, this command use concurrently that exec server and client.