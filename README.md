# Portfolio Tracker

This project is a work in progress. Features implemented so far are listed below:

* Basic User management (create, update, change password)
* Create and maintain Portfolio which holds a list of stocks (Holding)
* Add and maintain Holdings within a Portfolio
* For a given Holding Entry, display the following fields: 
  * Stored: symbol, number of shared, purchase date, purchase price, commission
  * Calculated on demand: current stock price, gain/loss
* Retrieve Detailed Stock Quote(s) for one or more symbols
* Retrieve Historical Stock Quote for a given symbol
* PLot Stock Price Chart

---------------------------------------
### Microservices Architecture ###

* user-management-api - http://localhost:3001/user-management/api
* account-management-api - http://localhost:3002/account-management/api
* finance-api - http://localhost:3003/finance/api
* portfolio-tracker-web - http://localhost:3000/pt

![Swagger Docs](docs/architecture.png)

---------------------------------------

#### Generated Swagger Docs for API projects ####
* Run: grunt swagger-docs
This will generate /public/swagger/swagger.json

#### Build & Run API Projects Locally ####
* Build: npm install
* Edit "config/config.js" to point to the desired Database
* Run "/scripts/init.js" to create and seed database
* Run: node server
* API Base URL: http://localhost:<port>/<api-name>/api
* Swagger: http://localhost:<port>/<api-name>/api/docs 
# For at the top enter admin/admin, click "Set Token" before testing API

#### Run Microservices with NGINX ####
* Prereq: Install NGINX and copy '/scripts/nginx.conf' to your local installation (ex: /usr/local/etc/nginx/nginx.conf)
* Start each API with: "node server" or "nodemon server"
* Start NGINX (ex: sudo nginx on MacOS)
* User Management: http://localhost/user-management/api/docs
* Account-Management: http://localhost/account-management/api/docs
* Financial Data: http://localhost/finance/api/docs

---------------------------------------

#### API Project Directory Structure ####
    XX-api
      |- config (environment-specific configurations, such as MongoDB connection, JWT parameters)
      |- routes (API routes)
      |- controllers
      |- models (mongoose schemas)
      |- app.js (tie together all the routes)
      |- server.js (application starting point)
  
---------------------------------------

#### Implementation Overview ####
This API is implemented with Express using Token-based security, the following support modules are used:
* Common utils used in all API's: https://github.com/bchan01/common-api-utils
* bcrypt for password encryption
* jsonwebtoken to generate and verify JWT token
* mongoose to handle MongoDB persistence
* Q to handle Async callbacks
* lodash for utilities functions
* papaparse for converting CSV to JSON
* reqquest to make HTTP requests to external services
* grunt swagger-docs for generating swagger docs for the API.


