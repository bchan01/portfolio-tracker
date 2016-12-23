// Seed Local database with data
// Instruction: 
//   1. cd <project_directory>/acount-management-api/scripts
//   1. mongo init.js
db.Portfolio.insert({
    "userId" : "admin",
    "name" : "Tech"});

db = new Mongo().getDB('pt-account');
db.Portfolio.remove({});
db.Portfolio.insert({
    "userId" : "admin",
    "name" : "Tech"});