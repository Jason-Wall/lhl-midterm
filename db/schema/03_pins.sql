-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  pin_title VARCHAR(255) NOT NULL,
  pin_description VARCHAR(255) NOT NULL,
  pin_url VARCHAR(255) NOT NULL,
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL
);

