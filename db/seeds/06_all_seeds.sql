INSERT INTO users (
name, email, password, user_url)
VALUES (
'Jenny Carroll', 'jenny@gmail.com', 'password', 'www.google.com');
INSERT INTO users (
name, email, password, user_url)
VALUES (
'Tyler Chessa', 'Tchessa@mail.com', 'password', 'www.google.com');
INSERT INTO users (
name, email, password, user_url)
VALUES (
'Jason Waldick', 'WaldickJ@gmx.com', 'password', 'www.google.com');
INSERT INTO users (
name, email, password, user_url)
VALUES (
'Ariel Carroll', 'dogsarecute@mail.com', 'password', 'www.google.com');
INSERT INTO users (
name, email, password, user_url)
VALUES (
'Mike DiLuzio', 'ilovecars@outlook.com', 'password', 'www.google.com');
INSERT INTO users (
name, email, password, user_url)
VALUES (
'Jessica Robinson', 'jr98@aol.com', 'password', 'www.google.com');

-- maps
INSERT INTO maps (
user_id, map_title, map_description, map_url) VALUES (1, 'Jenny''s Map', 'Dogs i''ve found!', 'map url');
INSERT INTO maps (
user_id, map_title, map_description, map_url) VALUES (2, 'Tyler''s Map', 'Restaurant', 'map url');
INSERT INTO maps (
user_id, map_title, map_description, map_url) VALUES (3, 'Jason''s Map', 'Places to eat', 'map url');



INSERT INTO maps (user_id, map_title, map_description, map_url)
VALUES (2, 'Fast Food', 'Top Fast Food Restaurants in downtown Vancouver', 'map url');


-- pins
INSERT INTO pins (map_id, user_id, pin_title, pin_description, pin_url, latitude, longitude)
VALUES (1, 1, 'title', 'description', 'pin_url', 109, 093);

INSERT INTO pins (map_id, user_id, pin_title, pin_description, pin_url, latitude, longitude)
VALUES (1, 2, 'title', 'description', 'pin_url', 109, 093);

INSERT INTO pins (map_id, user_id, pin_title, pins_description, pin_url, latitude, longitude)
VALUES (2, 3, 'title', 'description', 'pin_url', 109, 093);

INSERT INTO pins (map_id, user_id, pin_title, pin_description, pin_url, latitude, longitude)
VALUES (2, 1, 'title', 'description', 'pin_url', 109, 093);

INSERT INTO pins (map_id, user_id, pin_title, pin_description, pin_url, latitude, longitude)
VALUES (3, 2, 'title', 'description', 'pin_url', 109, 093);


-- pins for map 1 (top fast food resteraunts)
INSERT INTO pins (map_id, user_id, pin_title, pin_description, pin_url, latitude, longitude)
VALUES (4, 2, 'Five Guys', 'Always fresh, never frozen', 'pin_url', 49.281059, -123.119019);

INSERT INTO pins (map_id, user_id, pin_title, pin_description, pin_url, latitude, longitude)
VALUES (4, 2, 'Fatburger', 'The Last Great Hamburger Stand', 'pin_url', 49.281059, -123.119019);

INSERT INTO pins (map_id, user_id, pin_title, pin_description, pin_url, latitude, longitude)
VALUES (4, 2, 'Chicken World', 'When Dad''s Not Cooking', 'pin_url', 49.281059, -123.119019);



-- pin_favourites
INSERT INTO pin_favourites (user_id, pin_id)
VALUES (1, 1);

INSERT INTO pin_favourites (user_id, pin_id)
VALUES (2, 2);

INSERT INTO pin_favourites (user_id, pin_id)
VALUES (3, 3);

INSERT INTO pin_favourites (user_id, pin_id)
VALUES (4, 4);

INSERT INTO pin_favourites (user_id, pin_id)
VALUES (5, 5);


-- map_favourites
INSERT INTO map_favourites (user_id, map_id)
VALUES (1, 1);

INSERT INTO map_favourites (user_id, map_id)
VALUES (2, 2);

INSERT INTO map_favourites (user_id, map_id)
VALUES (3, 3);

INSERT INTO map_favourites (user_id, map_id)
VALUES (4, 1);

INSERT INTO map_favourites (user_id, map_id)
VALUES (5, 2);
