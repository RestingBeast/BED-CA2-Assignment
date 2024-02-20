//--------------------------------------
// imports
//--------------------------------------
let db = require("../controller/databaseConfig");

//--------------------------------------
// main code implementations
//--------------------------------------
let Product = {
  insert: function (product, callback) {
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
                    product(name, description, categoryid, brand, price)
                VALUES
                (?, ?, ?, ?, ?)`;
        dbConn.query(sql, [product.d_name, product.d_description, product.d_categoryid,
        product.d_brand, product.d_price], (error, result) => {
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
  findProduct: function (productName, brand, callback) {
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
                    product
                WHERE
                    name LIKE ? OR
                    brand = ?;`;
        dbConn.query(sql, [productName, brand], (error, result) => {
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
                    p.name,
                    p.description,
                    p.categoryid,
                    c.category AS categoryname,
                    p.brand,
                    p.price
                FROM
                    product AS p,
                    category AS c
                WHERE
                    p.productid = ?;`;
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
              return callback(null, result[0]);
            }
          }
        });
      }
    });
  },
  delete: function (productID, callback) {
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
              product
            WHERE
              productid = ?
            `;
        dbConn.query(sql, [productID], (error, result) => {
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
  review: function (productID, review, callback) {
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
                    reviews(userid, productid, rating, review)
                VALUES
                (?, ?, ?, ?)`;
        dbConn.query(sql, [review.d_userid, productID, review.d_rating,
        review.d_review], (error, result) => {
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
  findReviewByID: function (reviewID, callback) {
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
            r.productid,
            r.userid,
            u.username,
            r.rating,
            r.review,
            r.created_at 
          FROM
            reviews AS r,
            user AS u
          WHERE
            r.reviewsid = ? AND
            r.userid = u.userid;
        `;
        dbConn.query(sql, [reviewID], (error, result) => {
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
  findAllReviews: function (productID, callback) {
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
                    r.productid,
                    r.userid,
                    u.username,
                    r.rating,
                    r.review,
                    r.created_at
                FROM
                    reviews AS r,
                    user AS u
                WHERE
                    r.productid = ? AND
                    r.userid = u.userid
                ORDER BY
                    r.created_at DESC`;
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
                  product`;
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
  findAllBrands: function (callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        console.log("Database connection error");
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = `
              SELECT DISTINCT
                  brand
              FROM
                  product`;
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
module.exports = Product;