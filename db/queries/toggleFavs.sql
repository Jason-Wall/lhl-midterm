
INSERT INTO map_favourites (user_id, map_id)
VALUES (1,3)
ON CONFLICT ON CONSTRAINT unique_favourite DO
UPDATE
SET fav_status = NOT map_favourites.fav_status
WHERE map_favourites.user_id = 1 AND map_favourites.map_id = 3;

SELECT * FROM map_favourites WHERE user_id = 1 AND fav_status = true;
