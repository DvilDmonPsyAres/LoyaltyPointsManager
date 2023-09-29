DROP TABLE customers;
DROP TABLE products;
DROP TABLE orders;


CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(80),
  email VARCHAR(255) UNIQUE,
  contact_number INTEGER,
  loyalty_points INTEGER DEFAULT 10,
  loyalty_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  product_id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name VARCHAR(150) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price NUMERIC(4,2) NOT NULL,
  loyalty_points INTEGER NOT NULL CHECK (loyalty_points >= 0 AND loyalty_points <= 50),
  price_in_points INTEGER CHECK (price_in_points >= 20 AND price_in_points <= 250)
);

CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  order_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

INSERT INTO customers (customer_id, name, email, contact_number, loyalty_points, loyalty_time) VALUES (10000, 'Initial Customer', 'initial@email.com', 1234567890, 0, CURRENT_TIMESTAMP);
