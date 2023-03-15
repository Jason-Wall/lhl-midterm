
DROP TABLE IF EXISTS map_favourites CASCADE;
CREATE TABLE map_favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES pins(id) ON DELETE CASCADE,
  fav_status BOOLEAN DEFAULT true,

  CONSTRAINT unique_favourite UNIQUE (user_id, map_id)
);


INSERT INTO map_favourites (user_id, map_id)
VALUES (1,3);

ON CONFLICT ON CONSTRAINT unique_favourite DO

UPDATE SET fav_status = NOT fav_status
WHERE user_id = 1
AND map_id = 3;
