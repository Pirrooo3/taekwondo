/*const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3050;

app.get('/', function (req, res) {
    res.send('Saludos desde express');
  });

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});

//app.use(bodyParser.json());

var mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sucesos2'
});

connection.connect();*/

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());
app.use(cors());

// MySql
const connection = mysql.createConnection(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'historia',
  port: '3307'
});

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

// all customers
app.get('/sucesos', (req, res) => {
  const sql = 'SELECT * FROM sucesos2';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/sucesos/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM sucesos2 WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

app.post('/add', (req, res) => {
  const sql = 'INSERT INTO customers SET ?';

  const customerObj = {
    name: req.body.name,
    city: req.body.city
  };

  connection.query(sql, customerObj, error => {
    if (error) throw error;
    res.send('Customer created!');
  });
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, city } = req.body;
  const sql = `UPDATE customers SET name = '${name}', city='${city}' WHERE id =${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Customer updated!');
  });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM customers WHERE id= ${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Delete customer');
  });
});

// Check connect
connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

