//--------------------------------
// imports
//--------------------------------
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require("cors");

const bodyParser = require("body-parser");
const verifyToken = require("../auth/verifyToken");

const User = require("../model/user");
const Category = require("../model/category");
const Product = require("../model/product");
const Promotion = require("../model/promotion");
const JWT_SECRET = require("../config");

//--------------------------------
//config
//--------------------------------

let urlEncodedParser = bodyParser.urlencoded({ extended: false });
let jsonParser = bodyParser.json();

app.use(urlEncodedParser);
app.use(jsonParser);
app.options('*', cors());
app.use(cors());

//----------------------------------------------
// endpoints (User)
//----------------------------------------------

// Insert user
app.post("/users", (req, res) => {
    let data = {
        'd_username': req.body.username,
        'd_email': req.body.email,
        'd_contact': req.body.contact,
        'd_password': req.body.password,
        'd_type': req.body.type,
        'd_profile_pic_url': req.body.profile_pic_url
    }

    User.insert(data, function (err, result) {
        let resultJSON = {
            'userId': -1
        }

        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(422).send("The new username OR new email provided already exists.");
            }
            res.status(500).send("Unkonwn Error");
        } else {
            if (result.affectedRows == 1) {
                resultJSON.userId = result.insertId;
                res.status(201).type("json").send(resultJSON);
            } else {
                res.status(500).send("Unknown Error");
            }
        }
    });
});

// Get all users
app.get("/users", (req, res) => {
    User.findAll(function (err, result) {
        if (err) {
            res.status(500).send("Unknown Error");
        } else {
            if (result == null) {
                res.status(500).send("Unknown Error");
            } else {
                res.status(200).send(result);
            }
        }
    });
});

// Get user by ID
app.get("/users/:userID", (req, res) => {
    let uid = parseInt(req.params.userID);

    if (isNaN(uid)) {
        res.statusCode = 500;
        res.send("Unknown Error");
        res.end();
        return;
    }

    User.findByID(uid, function (err, result) {
        if (err) {
            res.status(500).send("Unknown Error");
        } else {
            if (result == null) {
                res.status(500).send("Unknown Error");
            } else {
                res.status(200).send(result);
            }
        }
    });
});

// Edit user
app.put("/users/:userID", (req, res) => {
    let uid = parseInt(req.params.userID);
    if (isNaN(uid)) {
        res.statusCode = 500;
        res.send("Unknown");
        res.end();

        return;
    }

    let data = {
        'd_username': req.body.username,
        'd_email': req.body.email,
        'd_contact': req.body.contact,
        'd_password': req.body.password,
        'd_type': req.body.type,
        'd_profile_pic_url': req.body.profile_pic_url
    }

    User.edit(uid, data, function (err, result) {
        if (err) {
            res.status(500).send("Unknown Error");
        } else {
            if (result.affectedRows == 0) {
                res.status(500).send("Unknown Error");
            }

            if (result.changedRows == 1) {
                res.status(204).end();
            } else {
                res.status(422).send("The new username OR new email provided already exists.");
            }
        }
    });
});

// Add user interest
app.post("/interest/:userID", verifyToken, (req, res) => {
    let uid = parseInt(req.params.userID);
    if (isNaN(uid)) {
        res.statusCode = 500;
        res.send("Unknown Error");
        res.end();

        return;
    }

    arr = req.body.categoryid.split(',');
    User.addInterst(uid, arr, function (err, result) {
        if (err) {
            res.status(500).send("Unkonwn Error");
        } else {
            res.status(201).end();
        }
    });
});

//----------------------------------------------
// endpoints (Category)
//----------------------------------------------
// Insert category
app.post("/category", verifyToken, (req, res) => {
    if (req.role != "Admin") {
        let errData = {
            auth: 'false',
            message: 'Forbidden -- cannot add category'
        };
        return res.status(403).type('json').send(errData);
    }
    let data = {
        'd_category': req.body.category,
        'd_description': req.body.description
    }

    Category.insert(data, function (err, result) {
        let resultJSON = {
            'categoryid': -1
        }
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(422).send("The category name provided already exists.");
            }
            res.status(500).send("Unkonwn Error");
        } else {
            if (result.affectedRows == 1) {
                resultJSON.categoryid = result.insertId;
                res.status(201).send(resultJSON);
            } else {
                res.status(500).send("Unknown Error");
            }
        }
    });
});

// Get all categories
app.get("/category", (req, res) => {
    Category.findAll(function (err, result) {
        if (err) {
            res.status(500).send("Unknown Error");
        } else {
            if (result == null) {
                res.status(404).send("No Category Found");
            } else {
                res.status(200).send(result);
            }
        }
    });
});

//----------------------------------------------
// endpoints (Product)
//----------------------------------------------
// Insert product
app.post("/product", verifyToken, (req, res) => {
    if (req.role != "Admin") {
        let errData = {
            auth: 'false',
            message: 'Forbidden -- cannot add product'
        };
        return res.status(403).type('json').send(errData);
    }

    let data = {
        'd_name': req.body.name,
        'd_description': req.body.description,
        'd_categoryid': req.body.categoryid,
        'd_brand': req.body.brand,
        'd_price': req.body.price,
    }

    Product.insert(data, function (err, result) {
        let resultJSON = {
            'productid': -1
        }

        if (err) {
            res.status(500).send("Unkonwn Error");
        } else {
            if (result.affectedRows == 1) {
                resultJSON.productid = result.insertId;
                res.status(201).type("json").send(resultJSON);
            } else {
                res.status(500).send("Unknown Error");
            }
        }
    });
});

// Find Product by name or brand
app.get("/products/:productName/:brand", (req, res) => {
    pname = req.params.productName;
    if (pname != "") {
        pname += "%";
    }

    let brand = req.params.brand;
    Product.findProduct(pname, brand, function (err, result) {
        if (err) {
            res.status(500).send("Unknown Error");
        } else {
            if (result == null) {
                res.status(404).send("No Products");
            } else {
                res.status(200).send(result);
            }
        }
    });
});

// Find product by ID
app.get("/productDetails/:productID", (req, res) => {
    let pid = parseInt(req.params.productID);

    if (isNaN(pid)) {
        res.statusCode = 500;
        res.send("Unknown Error");
        res.end();
        return;
    }

    Product.findByID(pid, function (err, result) {
        if (err) {
            res.status(500).send("Unknown Error");
        } else {
            if (result == null) {
                res.status(500).send("Unknown Error");
            } else {
                res.status(200).send(result);
            }
        }
    });
});

// Delete product by ID
app.delete("/product/:productID", (req, res) => {
    let pid = parseInt(req.params.productID);

    if (isNaN(pid)) {
        res.statusCode = 500;
        res.send("Unknown Error");
        res.end();

        return;
    }

    Product.delete(pid, function (err, result) {
        if (err) {
            res.status(500).send("Unknown Error");
        } else {
            if (result.affectedRows == 0) {
                res.status(500).send("Unknown Error");
            } else {
                res.status(204).end();
            }
        }
    });
});

// Post product review
app.post("/product/:productID/review", verifyToken, (req, res) => {
    let data = {
        'd_userid': req.body.userid,
        'd_rating': req.body.rating,
        'd_review': req.body.review
    }

    let pid = parseInt(req.params.productID);
    if (isNaN(pid)) {
        res.statusCode = 500;
        res.send("Unknown Error");
        res.end();
        return;
    }

    Product.review(pid, data, function (err, result) {
        let resultJSON = {
            'reviewsid': -1
        }

        if (err) {
            res.status(500).send("Unkonwn Error");
        } else {
            if (result.affectedRows == 1) {
                resultJSON.reviewsid = result.insertId;
                res.status(201).type("json").send(resultJSON);
            } else {
                res.status(500).send("Unknown Error");
            }
        }
    });
});

// Get all product reviews
app.get("/product/:productID/reviews", (req, res) => {
    let pid = parseInt(req.params.productID);
    if (isNaN(pid)) {
        res.statusCode = 500;
        res.send("Unknown Error");
        res.end();
        return;
    }

    Product.findAllReviews(pid, function (err, result) {
        if (err) {
            res.status(500).send("Unknown Error");
        } else {
            if (result == null) {
                res.status(404).send("No reviews");
            } else {
                res.status(200).send(result);
            }
        }
    });
});

// Get review by id
app.get("/reviews/:reviewID", (req, res) => {
    let rid = parseInt(req.params.reviewID);

    if (isNaN(rid)) {
        res.statusCode = 500;
        res.send("Unknown Error");
        res.end();
        return;
    }

    Product.findReviewByID(rid, function (err, result) {
        if (err) {
            res.status(500).send("Unknown Error");
        } else {
            if (result == null) {
                res.status(404).send("No Review Found");
            } else {
                res.status(200).send(result);
            }
        }
    });
});

// Get all products
app.get("/allproducts", (req, res) => {
    Product.findAll(function (err, result) {
        if (err) {
            res.status(500).send("Unknown Error");
        } else {
            if (result == null) {
                res.status(500).send("Unknown Error");
            } else {
                res.status(200).send(result);
            }
        }
    });
});

// Get all brands
app.get("/brands", (req, res) => {
    Product.findAllBrands(function (err, result) {
        if (err) {
            res.status(500).send("Unknown Error");
        } else {
            if (result == null) {
                res.status(404).send("No brands Found");
            } else {
                res.status(200).send(result);
            }
        }
    });
});

//----------------------------------------------
// endpoints (Promotion)
//----------------------------------------------
// Insert promotion
app.post("/promotion", (req, res) => {
    let data = {
        'd_promotion_start': req.body.promotion_start,
        'd_promotion_end': req.body.promotion_end,
        'd_discount': req.body.discount,
        'd_productid': req.body.productid
    }

    Promotion.insert(data, function (err, result) {
        let resultJSON = {
            'promotionId': -1
        }

        if (err) {
            res.status(500).send("Unkonwn Error");
        } else {
            if (result.affectedRows == 1) {
                resultJSON.promotionId = result.insertId;
                res.status(201).type("json").send(resultJSON);
            } else {
                res.status(500).send("Unknown Error");
            }
        }
    });
});

// Get products that is on promotion period
app.get("/products/promotions", (req, res) => {
    Promotion.getLatestPromotion(function (err, result) {
        if (err) {
            res.status(500).send("Unknown Error");
        } else {
            if (result == null) {
                res.status(500).send("Unknown Error");
            } else {
                res.status(200).send(result);
            }
        }
    });
});

// Edit promotion
app.put("/promotion/:promotionID", (req, res) => {
    let pid = parseInt(req.params.promotionID);
    if (isNaN(pid)) {
        res.statusCode = 500;
        res.send("Unknown");
        res.end();

        return;
    }

    let data = {
        'd_promotion_start': req.body.promotion_start,
        'd_promotion_end': req.body.promotion_end,
        'd_discount': req.body.discount,
    }

    Promotion.edit(pid, data, function (err, result) {
        if (err) {
            res.status(500).send("Unknown Error");
        } else {
            if (result.affectedRows == 0) {
                res.status(500).send("Unknown Error");
            }
            res.status(204).end();
        }
    });
});

// Get promotion By ID(ignore promotion period)
app.get("/promotion/:productID", (req, res) => {
    let pid = parseInt(req.params.productID);

    if (isNaN(pid)) {
        res.statusCode = 500;
        res.send("Unknown Error");
        res.end();
        return;
    }

    Promotion.findByID(pid, function (err, result) {
        if (err) {
            res.status(500).send("Unknown Error");
        } else {
            if (result == null) {
                res.status(500).send("Unknown Error");
            } else {
                res.status(200).send(result);
            }
        }
    });
});

// Delete promotion
app.delete("/promotion/:promotionID", (req, res) => {
    let pid = parseInt(req.params.promotionID);

    if (isNaN(pid)) {
        res.statusCode = 500;
        res.send("Unknown Error");
        res.end();

        return;
    }

    Promotion.delete(pid, function (err, result) {
        if (err) {
            res.status(500).send("Unknown Error");
        } else {
            if (result.affectedRows == 0) {
                res.status(500).send("Unknown Error");
            } else {
                res.status(204).end();
            }
        }
    });
});

// Login
app.post('/login', function (req, res) {
    let data = {
        'email': req.body.email,
        'password': req.body.password
    }

    User.login(data, function (err, result) {
        if (err) {
            res.status(500).send("Bad...");
        } else {
            if (result == null) {
                res.status(404).send("Login failed");
            } else {
                let payload = {
                    "userid": result.userid,
                    "role": result.role,
                };
                let tokenConfig = {
                    expiresIn: 86400,
                    algorithm: "HS256"
                };
                jwt.sign(payload, JWT_SECRET, tokenConfig,
                    (error, token) => {
                        if (error) {
                            console.log(error);
                            res.status(401).send();
                            return;
                        }
                        res.status(200).send({
                            token: token,
                            userid: result.userid,
                            role: result.role
                        });
                    });
            }
        }
    });
});

//--------------------------------
// exports
//--------------------------------
module.exports = app;