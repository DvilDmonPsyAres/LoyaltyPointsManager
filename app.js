const express = require('express');
const path = require('path'); // Import the 'path' module
const app = express();
const fs = require('fs');
// set database file
const DATA_SOURCE = 'app.db';
// call database function
const sqlite3 = require('sqlite3');
// read and assign variable name to database
const db = new sqlite3.Database(
  DATA_SOURCE,
  sqlite3.OPEN_READWRITE, (err) => {
    if(err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('connected to sqlite database:', DATA_SOURCE);
    }
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('styles'));
app.use(express.static('templates'));

app.use((req, res, next) => {
  if(req.method === 'POST') {
    console.log('Body:', req.body);
  }
  // console.log('Body:', req.body);
  next();
});
// Serve the index.html file when navigating to '/'
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'admin.html'));// Replace 'index.html' with your actual file path
});
// REGISTER PRODUCTS
app.get('/register-products', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'register-products.html'));// Replace 'index.html' with your actual file path
});
//SUBMITING NEW PRODUCT
app.post('/register-products', (req, res, next) => {
  console.log('testing')
  console.log('Form Data:', req.body); // Add this line for debugging
  // Access the form data here
  const formData = req.body;
  // Process the form data as needed

  const params = [
    formData.product_name,
    formData.description,
    formData.price,
    formData.loyalty_points,
    formData.price_in_points
  ]
  console.log('testing params: ', params);
  // // database statements
  const sql = 'INSERT INTO products(product_name, description, price, loyalty_points, price_in_points) VALUES (?, ?, ?, ?, ?)';

  db.run(sql, params, (err) => {
    if(err) {
      next(err);
    }
  });

  // Respond to the client
  console.log('testing time message order:', { message: 'Form data received successfully' });
  res.redirect(`/new-product`);
});

// new product  route
app.get('/new-product', (req, res) => {
  try {

    const newUserTemplate = path.join(__dirname, 'templates', 'new-product.html');
    // res.sendFile(path.join(__dirname, 'templates', 'new-user.html'));
    const sql = "SELECT * FROM products ORDER BY product_id DESC LIMIT 1";
    db.get(sql, [], (err, row) => {
      console.log('new product:', row);
      fs.readFile(newUserTemplate, 'utf8', (htmlErr, htmlData) => {
        if (htmlErr) {
          console.error('Error reading HTML file:', htmlErr);
          return res.status(500).send('Error reading HTML file');
        }

        // Replace placeholders in HTML with actual values
        const modifiedHtml = htmlData
          .replace("#{product_id}", row.product_id)
          .replace("#{product_name}", row.product_name)
          .replace("#{description}", row.description)
          .replace("#{price}", row.price)
          .replace("#{loyalty_points}", row.loyalty_points)
          .replace("#{price_in_points}", row.price_in_points);

        // Send the modified HTML as the response
        res.send(modifiedHtml);
      });
    })

  } catch(err) {
    console.error('new Error', err);
  }
})

// Serve the index.html file when navigating to '/'
app.get('/register-customers', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'create-customer.html'));// Replace 'index.html' with your actual file path
});

app.post('/register-customers', (req, res, next) => {
  console.log('testing')
  console.log('Form Data:', req.body); // Add this line for debugging
  // Access the form data here
  const formData = req.body;
  // Process the form data as needed

  const params = [
    formData.customer_name,           // Use formData.customer_name
    formData.customer_email,          // Use formData.customer_email
    formData.customer_mobile_number   // Use formData.customer_mobile_number
  ]
  console.log('testing params: ', params);
  // database statements
  const sql = 'INSERT INTO customers(name, email, contact_number) VALUES (?, ?, ?)';

  db.run(sql, params, (err) => {
    if(err) {
      next(err);
    }
  });


  // Respond to the client
  console.log('testing time message order:', { message: 'Form data received successfully' });
  res.redirect(`/new-user`);
});

// new user route
app.get('/new-user', (req, res) => {
  try {

    const newUserTemplate = path.join(__dirname, 'templates', 'new-user.html');
    // res.sendFile(path.join(__dirname, 'templates', 'new-user.html'));
    const sql = "SELECT * FROM customers ORDER BY customer_id DESC LIMIT 1";
    db.get(sql, [], (err, row) => {
      console.log('new user:', row);
      fs.readFile(newUserTemplate, 'utf8', (htmlErr, htmlData) => {
        if (htmlErr) {
          console.error('Error reading HTML file:', htmlErr);
          return res.status(500).send('Error reading HTML file');
        }

        // Replace placeholders in HTML with actual values
        const modifiedHtml = htmlData
          .replace("#{name}", row.name)
          .replace("#{email}", row.email)
          .replace("#{number}", row.contact_number)
          .replace("#{id}", row.customer_id)
          .replace("#{loyalty_points}", row.loyalty_points);

        // Send the modified HTML as the response
        res.send(modifiedHtml);
      });
    })

  } catch(err) {
    console.error('new Error', err);
  }
})

// Create the "resource not found" middleware
app.use((req, res, next) => {
  const error = new Error("Sorry, the requested resource couldn't be found")
  error.statusCode = 404;
  next(error);
});

// Catch all middleware
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: "Sorry, the requested resource couldn't be found.",
    statusCode
  });
});

const port = 8000;
app.listen(port, () => console.log('Server is listening on port', port));
