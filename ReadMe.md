# User-Management

## Introduction

This is an User-Management System where you can create User with one or more Directories where they have access to.
It's main purpose is to show M:N Relations with the Sequelize OR-Mapper.
Or if you just want to know how to use Handlebars as Templating Engine with Express to serve static HTML Files.

- A user can be added.
- All users are displayed in a List.
- A user can be deleted. (WIP)
- A user can be edited. (WIP)

## Prerequisites

### MySQL Database

You need an existing MySQL Database.
If you don't have one use PHPMyAdmin or something similar.

### Sequelize CLI

The Sequelize CLI is used for the Migrations.
Open a console and type in the following Command `npm i -g sequelize-cli`

## Get Started

Clone the Project with `git clone https://github.com/MatthiasHerzog2000/User-Management.git`.
After this you need to install the node modules. Type `npm install` into the console.
The next Step is to create a config Folder which holds a _config.json_ File. This File stores your DB credentials for Sequelize so it knows where it has to connect.
It can look like this.

```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "UserDB",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

After successfully setting up the _config.json_ file you need to add the tables to the DB. Just use the following command `sequelize db:migrate --env development` and you should see three tables in your Database.
Now you can use nodemon or just `npm start` to start a local server.
