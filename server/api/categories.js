const config = require('./_config.js');
const express = require('express');
const mysql = require('mysql');
const app = express();
let connection = mysql.createConnection(config);

// app.get('/api/categories');

app.listen(3000);

connection.connect(err => { if (err) throw err; });
