var express = require("express");
var app = express();
var db = require("./database.js");
var bodyParser = require("body-parser");
const cors = require('cors');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

let HTTP_PORT = 8080;

// Start server
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});

// Fetch all products
app.get("/api/products", (req, res) => {
    var sql = "SELECT * FROM products";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Fetch a single product by ID
app.get("/api/products/:id", (req, res) => {
    var sql = "SELECT * FROM products WHERE id = ?";
    var params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

// Fetch products with quantity greater than a given value
app.get("/api/products/quantity/:quantity", (req, res) => {
    var sql = "SELECT * FROM products WHERE quantity > ?";
    var params = [req.params.quantity];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Fetch products with unit price greater than a given value
app.get("/api/products/unitPrice/:unitPrice", (req, res) => {
    var sql = "SELECT * FROM products WHERE unitPrice > ?";
    var params = [req.params.unitPrice];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Create a new product
app.post("/api/products", (req, res) => {
    const {
        productName, description, category, brand, expiredDate,
        manufacturedDate, batchNumber, unitPrice, quantity, createdDate
    } = req.body;

    var sql = 'INSERT INTO products (productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate) VALUES (?,?,?,?,?,?,?,?,?,?)';
    var params = [productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate];
    
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": req.body,
            "id": this.lastID
        });
    });
});

// Update an existing product
app.put("/api/products", (req, res) => {
    const {
        id, productName, description, category, brand, expiredDate,
        manufacturedDate, batchNumber, unitPrice, quantity, createdDate
    } = req.body;

    db.run(`UPDATE products SET 
        productName = ?, description = ?, category = ?, brand = ?, 
        expiredDate = ?, manufacturedDate = ?, batchNumber = ?, 
        unitPrice = ?, quantity = ?, createdDate = ? 
        WHERE id = ?`,
        [productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate, id],
        function (err) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({ "message": "success", updated: this.changes });
        });
});

// Delete a product by ID
app.delete("/api/products/delete/:id", (req, res) => {
    db.run('DELETE FROM products WHERE id = ?', req.params.id, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", rows: this.changes });
    });
});

// Delete products greater than a given ID
app.delete("/api/products/deleteAll/:id", (req, res) => {
    db.run('DELETE FROM products WHERE id > ?', req.params.id, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", rows: this.changes });
    });
});

// Fetch all suppliers
app.get("/api/suppliers", (req, res) => {
    var sql = "SELECT * FROM suppliers";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Create a new supplier
app.post("/api/suppliers", (req, res) => {
    const { supplierName, address, joinedDate, mobileNo } = req.body;

    var sql = 'INSERT INTO suppliers (supplierName, address, joinedDate, mobileNo) VALUES (?,?,?,?)';
    var params = [supplierName, address, joinedDate, mobileNo];
    
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": req.body,
            "id": this.lastID
        });
    });
});

// Delete suppliers greater than a given ID
app.delete("/api/suppliers/deleteAll/:id", (req, res) => {
    db.run('DELETE FROM suppliers WHERE id > ?', req.params.id, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", rows: this.changes });
    });
});

// Create a new customer
app.post("/api/register-customer", (req, res) => {
    const {
        name, address, email, dateOfBirth, gender, age,
        cardHolderName, cardNumber, expiryDate, cvv, timestamp
    } = req.body;

    // Here you would normally insert the customer data into a database
    // For now, we'll just respond with a success message
    res.status(200).json({
        message: `Customer ${name} has registered`,
        customerId: "1" // This would typically be generated from the database
    });
});

// Root endpoint
app.get("/", (req, res) => {
    res.json({ "message": "University of Moratuwa" });
});
