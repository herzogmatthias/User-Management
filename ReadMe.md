# User-Management

## Introduction

This Project is part of the File Browser Project which currently consists of following Projects

- https://github.com/MatthiasHerzog2000/download-file-microservice
- https://github.com/MatthiasHerzog2000/generate-image-preview-microservice
- https://github.com/MatthiasHerzog2000/file-browser-client
- https://github.com/MatthiasHerzog2000/file-browser-server
- https://github.com/MatthiasHerzog2000/User-Management

The aim of this Projects is to recreate a Google Drive like experience for your own Files e.g. you want to access data of your private NAS from outside with a better UI. This Program will be working as a local User-Management-System where you can add, edit and remove user who can access the file system.

This is an User-Management System where you can create User with one or more Directories where they have access to.
It's main purpose is to show M:N Relations with the Sequelize OR-Mapper.
Or if you just want to know how to use Handlebars as Templating Engine with Express to serve static HTML Files and JQuery.

- A user can be added.
- All users are displayed in a List.
- A user can be deleted and his dependencies too.
- A user can be edited.
- Directories will be deleted if they have no dependencies.
- Every User has individually managed write and/or read rights for every Directory he has access to.

## Prerequisites

### Node-gyp

`npm install -g node-gyp`

### Python 2.7

https://linuxconfig.org/install-python-2-on-ubuntu-18-04-bionic-beaver-linux

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
