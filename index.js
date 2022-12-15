const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());
app.use(cors());

  const connection = mysql.createPool(
    {
      database: "datos",
      user: "bxjggkti68y4fpvz96rg",
      host: "eu-central.connect.psdb.cloud",
      password: "pscale_pw_AhhI0ddRj7TppDbQXI4y3qBA4MzFmH0TMAfDAmybPH4",
      ssl: {rejectUnauthorized: false}
    });

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});


app.get('/tablas', (req, res) => {
  const sql = 'SELECT table_name AS nombre FROM information_schema.tables WHERE table_schema = "datos"';
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});


// all customers
app.get('/sucesos', (req, res) => {
  const sql = 'SELECT * FROM cvagueda';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});


app.get('/tabla/:tabla', (req, res) => {
  const { tabla } = req.params;
  const sql = `SELECT * FROM ${tabla}`;

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

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}, para acceder vaya al sitio: http://localhost:3050/`));

