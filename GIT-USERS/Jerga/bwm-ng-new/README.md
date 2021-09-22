# BwmNew

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.22.

## How to run this project

Create `dev.js` file in `server/config/dev.js` with content of:

```javascript
module.exports = {
  DB_URI: "your_mongo_db_connection_string", // Get it here -> https://www.mongodb.com/
  JWT_SECRET: "some_unique_value", // e.g: 'dasid7asd7xc68zxc!'
};
```

In base folder of project run `npm install` and then `npm start`

To run api server navigate to server folder `cd server` and run `node index.js`

## How to populate DB

In case your `dev.js` file is created you can run in `server` folder command to populate database `node fakeDB/cleanDB.js`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
