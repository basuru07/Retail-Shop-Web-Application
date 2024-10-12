var sqlite3 = require('sqlite3').verbose()
//var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')

        // Create products table
        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            productName text, 
            description text,
            category text,
            brand text,
            expiredDate text,
            manufacturedDate text,
            batchNumber INTEGER,
            unitPrice INTEGER,
            quantity INTEGER,
            createdDate text
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Insert sample data into products table
                var insert = 'INSERT INTO products (productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createdDate) VALUES (?,?,?,?,?,?,?,?,?,?)'
                db.run(insert, ["White Basmathi Rice", "White Basmathi Rice imported from Pakistan. High-quality rice with extra fragrance. Organically grown.", "Rice", "CIC", "2023.05.04", "2022.02.20", 324567, 1020, 200, "2022.02.24"])
            }
        })

        // Create suppliers table
        db.run(`CREATE TABLE IF NOT EXISTS suppliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            supplierName text, 
            address text,
            joinedDate text,
            mobileNo text
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Insert sample data into suppliers table
                var insert = 'INSERT INTO suppliers (supplierName, address, joinedDate, mobileNo) VALUES (?,?,?,?)'
                db.run(insert, ["D.J.Ishara", "345A, R.A De Mel Road, Colombo 3", "16/3/2022", "0776600933"])
            }
        })

        // Create customer table
        db.run(`CREATE TABLE IF NOT EXISTS customer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            address TEXT NOT NULL,
            email TEXT NOT NULL,
            dateOfBirth TEXT,
            gender TEXT,
            age INTEGER,
            cardHolderName TEXT,
            cardNumber TEXT,
            expiryDate TEXT,
            cvv TEXT,
            timestamp TEXT
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                console.log("Customer table created.")
            }
        })
    }
})

module.exports = db
