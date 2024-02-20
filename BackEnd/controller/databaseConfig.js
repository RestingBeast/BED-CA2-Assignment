//----------------------------------------
// imports
//----------------------------------------
const mysql = require('mysql');

//----------------------------------------
// code implementations
//----------------------------------------
var dbconnect = {
  getConnection: function () {

    var conn = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'user',
      password: 'password',
      database: 'sp_it',
      dateStrings: true,
    });

    return conn;
  }
};

//----------------------------------------
// exports
//----------------------------------------
module.exports = dbconnect;