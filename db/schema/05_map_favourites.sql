
DROP TABLE IF EXISTS map_favourites CASCADE;
CREATE TABLE map_favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES pins(id) ON DELETE CASCADE,
  fav_status BOOLEAN DEFAULT true,

  CONSTRAINT unique_favourite UNIQUE (user_id, map_id)
);
