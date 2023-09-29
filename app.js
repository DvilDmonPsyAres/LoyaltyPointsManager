const express = require('express');
const path = require('path'); // Import the 'path' module
const app = express();
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
  console.log('Body:', req.body);
  next();
});

// Serve the index.html file when navigating to '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'create-customer.html'));// Replace 'index.html' with your actual file path
});

app.post('/register', (req, res) => {
  console.log('testing')
  const formData = req.body; // Access the form data here
  // Process the form data as needed
  console.log('form DATA:', formData);

  const params = [
    formData.name,
    formData.email,
    formData.number
  ]

  console.log(params);
  // Respond to the client
  res.json({ message: 'Form data received successfully' });
});

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
