# Portfolio Tracker

This project is a work in progress. Features implemented so far are listed below:

* Basic user management (create, update, change password)
* Create and maintain portfolio which holds a list of stocks (holding)
* Add and maintain holdings within a portfolio
* For a given holding, display the following fields: 
  * Stored: symbol, number of shared, purchase date, purchase price, commission
  * Calculated on demand: current stock price, gain/loss
* Retrieve detailed stock quotes for one or more symbols
* Retrieve historical stock quote for a given symbol
* PLot a chart of stock prices for a given symbol within a time range

---------------------------------------
### Microservice Architecture (MEAN Stack) ###

* user-management-api: manages users
* account-management-api: manage user accounts
* finance-api: retrieve financial data
* portfolio-tracker-web: web application to be developed

![Swagger Docs](docs/architecture.png)

---------------------------------------
### API Project Directory Structure ###
    XX-api
      |- config (environment-specific configurations, such as MongoDB connection, JWT parameters)
      |- routes (define routes for endpoints)
      |- controllers (implement endpoint logic)
      |- models (define mongoose schemas)
      |- app.js (initialize Express components and connect to database)
      |- server.js (application starting point)

---------------------------------------
### Generate Swagger for API Projects ###
* Run "grunt swagger-docs" to generate swagger docs for each API project
* Swagger Home Page
  * user-management-api: [http://localhost:3001/user-management/api/docs](http://localhost:3001/user-management/api/docs)
  * account-management-api: [http://localhost:3002/account-management/api/docs](http://localhost:3002/account-management/api/docs)
  * finance-api: [http://localhost:3003/finance/api/docs](http://localhost:3003/finance/api/docs)
* To execute secured endpoints, at the top of swagger home page, enter admin/admin and click "Set Token" to authenticate once

---------------------------------------
### Build and Run API Projects Locally ###
* Build project by running "npm install"
* Create and seed database by runnning "/scripts/init.js"
* Start API by running "node server" or "nodemon server"
* API Base URL: 
  * user-management-api: [http://localhost:3001/user-management/api](http://localhost:3001/user-management/api)
  * account-management-api: [http://localhost:3002/account-management/api](http://localhost:3002/account-management/api)
  * finance-api: [http://localhost:3003/finance/api](http://localhost:3003/finance/api)

---------------------------------------
### Deploy and Run Microservices using NGINX ###
* Install NGINX
* copy '/scripts/nginx.conf' to your local installation (ex: /usr/local/etc/nginx/nginx.conf)
* Start each API by running "node server" or "nodemon server"
* Start NGINX (ex: "sudo nginx")
* All API's can be accessed without port number
  * User Management: [http://localhost/user-management/api/docs](http://localhost/user-management/api/docs)
  * Account-Management: [http://localhost/account-management/api/docs](http://localhost/account-management/api/docs)
  * Financial Data: [http://localhost/finance/api/docs](http://localhost/finance/api/docs)

---------------------------------------
### Microservice Implementation Overview ###
The microservices are implemented with Express using Token-based security, the following node modules are used:

* Common utils used by all API's: https://github.com/bchan01/common-api-utils

Node Module  | Usage
------------- | -------------
Common utils used by all API's | ( https://github.com/bchan01/common-api-utils)
bcrypt  | password encryption
jsonwebtoken  | generate and verify JWT token
mongoose | MongoDB persistence
Q | handle Async callbacks
lodash | 
papaparse | convert CSV to JSON
grunt swagger-docs | generate swagger

