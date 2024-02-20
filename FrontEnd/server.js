
const express = require('express');

var app = express();

app.get("/", (req, res) => {
    res.sendFile("/public/index.html", { root: __dirname });
});

app.get("/searchResult/:pname/:brand", (req, res) => {
    res.sendFile("/public/searchResult.html", { root: __dirname });
});

app.get("/productDetails/:pid", (req, res) => {
    res.sendFile("/public/productDetails.html", { root: __dirname });
});

app.get("/addProduct", (req, res) => {
    res.sendFile("/public/addProduct.html", { root: __dirname });
});

app.get("/addCategory", (req, res) => {
    res.sendFile("/public/addCategory.html", { root: __dirname });
});

app.get("/login", (req, res) => {
    res.sendFile("/public/login.html", { root: __dirname });
});

app.get("/preference", (req, res) => {
    res.sendFile("/public/preference.html", { root: __dirname });
});

app.get("/product", (req, res) => {
    res.sendFile("/public/product.html", { root: __dirname });
});

app.use(express.static(__dirname + '/public'));

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Client server has started listening on port ${PORT}`);
});