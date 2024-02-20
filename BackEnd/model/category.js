//--------------------------------------
// imports
//--------------------------------------
let db = require("../controller/databaseConfig");

//--------------------------------------
// main code implementations
//--------------------------------------
let Category = {
  insert: function (category, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        console.log("Database connection error");
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = `
                INSERT INTO
                    category(category, description)
                VALUES
                    (?, ?)`;
        dbConn.query(sql, [category.d_category, category.d_description], (error, result) => {
          dbConn.end();
          if (error) {
            console.log("query error");
            console.log(error);
            return callback(error, null);
          } else {
            console.log(result);
            return callback(null, result);
          }
        });
      }
    });
  },
  findAll: function (callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        console.log("Database connection error");
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = `
                SELECT 
                    *
                FROM
                    category`;
        dbConn.query(sql, [], (error, result) => {
          dbConn.end();
          if (error) {
            console.log("query error");
            console.log(error);
            return callback(error, null);
          } else {
            console.log(result);
            if (result.length == 0) {
              return callback(null, null);
            } else {
              return callback(null, result);
            }
          }
        });
      }
    });
  },
}

//--------------------------------------
// exports
//--------------------------------------
module.exports = Category;