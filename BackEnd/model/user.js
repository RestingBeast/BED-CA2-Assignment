//--------------------------------------
// imports
//--------------------------------------
let db = require("../controller/databaseConfig");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

//--------------------------------------
// main code implementations
//--------------------------------------

let User = {
  insert: function (user, callback) {
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
                    user(username, email, contact, password, type, profile_pic_url)
                VALUES
                (?, ?, ?, ?, ?, ?)`;
        dbConn.query(sql, [user.d_username, user.d_email, user.d_contact, user.d_password,
        user.d_type, user.d_profile_pic_url], (error, result) => {
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
                    user`;
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
  findByID: function (userID, callback) {
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
                    user
                WHERE 
                    userid = ?;`;
        dbConn.query(sql, [userID], (error, result) => {
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
              return callback(null, result[0]);
            }
          }
        });
      }
    });
  },
  edit: function (userID, user, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        console.log("Database connection error");
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = `
              UPDATE
                user
              SET
                username = ?,
                email = ?,
                contact = ?,
                password = ?,
                type = ?,
                profile_pic_url = ?
              WHERE
                userid = ?;
              `;
        dbConn.query(sql, [user.d_username, user.d_email, user.d_contact, user.d_password,
        user.d_type, user.d_profile_pic_url, userID], function (error, result) {
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
  addInterst: function (userID, interest, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err, result) {
      if (err) {
        console.log("Database connection error");
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        for (var i = 0; i < interest.length; i++) {
          var sql = `
                  INSERT INTO
                      userinterests(userid, categoryid)
                  VALUES
                      (?,?);
                  `;
          dbConn.query(sql, [userID, interest[i]], (err, result) => {
            if (err) {
              console.log("query error");
              console.log(err);
              return callback(err, null);
            } else {
              console.log(result.insertId);
            }
          });
        }
        dbConn.end();
        return callback(null, null);
      }
    });
  },
  login: function (data, callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = `
        SELECT
          *
        FROM
          sp_it.user
        WHERE
          email = ? AND
          password = ?;
      `;
        conn.query(sql, [data.email, data.password], function (error, result) {
          if (error) {
            console.log("query error");
            console.log(error);
            return callback(error, null);
          } else {
            console.log(result);
            if (result.length == 0) {
              return callback(null, null);
            } else {
              return callback(null, result[0]);
            }
          }
        });
      }
    });
  }
}

//--------------------------------------
// exports
//--------------------------------------
module.exports = User;