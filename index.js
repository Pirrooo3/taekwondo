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
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_DATA = process.env.DB_DATA || '';
const DB_PORT = process.env.DB_PORT || 3050;
const DB_NAME = process.env.DB_NAME || '';

// MySql
const connection = mysql.createConnection(
  {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATA,
    port: DB_PORT
 //   name: DB_NAME
  });

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.get('/a', (req, res) => {
  res.send('Welcomeasfdasdf to my API!');
});

// all customers
app.get('/sucesos', (req, res) => {
  const sql = 'SELECT * FROM tabla';

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
  const sql = `SELECT * FROM tabla WHERE id = ${id}`;
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
/*connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
});
*/
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

