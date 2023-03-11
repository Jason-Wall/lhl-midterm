-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  pin_url VARCHAR(255) NOT NULL,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL
);

