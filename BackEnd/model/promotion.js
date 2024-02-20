//--------------------------------------
// imports
//--------------------------------------
let db = require("../controller/databaseConfig");

//--------------------------------------
// main code implementations
//--------------------------------------
let Promotion = {
  insert: function (promotion, callback) {
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
                    promotion(promotion_start, promotion_end, discount, productid)
                VALUES 
                    (?, ?, ?, ?)`;
        dbConn.query(sql, [promotion.d_promotion_start, promotion.d_promotion_end,
        promotion.d_discount, promotion.d_productid], (error, result) => {
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
  getLatestPromotion: function (callback) {
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
                    pm.productid,
                    pd.name,
                    pd.price AS original_price,
                    pm.discount,
                    pd.price - (pd.price * pm.discount) AS discounted_price,
                    pm.promotion_start,
                    pm.promotion_end
                FROM
                    promotion AS pm,
                    product AS pd
                WHERE
                    CURRENT_DATE() > promotion_start AND
                    CURRENT_DATE() < promotion_end AND
                    pm.productid = pd.productid;`;
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
  edit: function (promotionId, promotion, callback) {
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
                promotion
              SET
                promotion_start = ?,
                promotion_end = ?,
                discount = ?
              WHERE
                promotionid = ?;
              `;
        dbConn.query(sql, [promotion.d_promotion_start, promotion.d_promotion_end,
        promotion.d_discount, promotionId], function (error, result) {
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
  findByID: function (productID, callback) {
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
                    p1.productid,
                    p2.name,
                    p1.discount,
                    p1.promotion_start,
                    p1.promotion_end
                FROM
                    promotion AS p1,
                    product AS p2
                WHERE 
                    p1.productid = ? AND
                    p1.productid = p2.productid;`;
        dbConn.query(sql, [productID], (error, result) => {
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
  delete: function (promotionID, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        console.log("Database connection error");
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = `
            DELETE FROM
              promotion
            WHERE
              promotionid = ?
            `;
        dbConn.query(sql, [promotionID], (error, result) => {
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
};

//--------------------------------------
// exports
//--------------------------------------
module.exports = Promotion;