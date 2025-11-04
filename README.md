create migration file
- npx sequelize-cli migration:generate --name <create-tasks>

run migration file
- npx sequelize-cli db:migrate

create seeder file
- npx sequelize-cli seed:generate --name <demo-user>

run seeder file
- npx sequelize-cli db:seed:all