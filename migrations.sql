-- Migrations: create tables orders and items

CREATE TABLE IF NOT EXISTS orders (
  orderId VARCHAR PRIMARY KEY,
  value NUMERIC NOT NULL,
  creationDate TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  orderId VARCHAR NOT NULL REFERENCES orders(orderId) ON DELETE CASCADE,
  productId INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC NOT NULL
);
