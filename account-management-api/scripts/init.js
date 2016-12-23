// Seed Local database with data
// Instruction: 
//   1. cd <project_directory>/acount-management-api/scripts
//   1. mongo
//   2. use pt-account;
//   3. load("init.js);
db.Portfolio.insert({
    "userId" : "admin",
    "name" : "Tech"});