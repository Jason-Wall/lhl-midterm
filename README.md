# MapSHARE

MapSHARE is a single page application that allows users to create and collaborate on maps.\
This project was built over one week as a mid-term project for Lighthouse Labs. Students were required to build the front and back end from a [skeleton](https://github.com/lighthouse-labs/node-skeleton) containing a node server and limited pre-installed packages. For this project we opted to make use of the google maps api.

## Contributors

This project was created by [Jason Waldick](https://github.com/Jason-Wall), [Jenny Carroll](https://github.com/JennyCarroll), and [Tyler Chessa](https://github.com/tylerchessa).

## Things you can do

### View maps, create pins

<img src=https://github.com/Jason-Wall/lhl-midterm/blob/master/documents/01_view_maps.gif/>

### Mange your maps: Create, edit and delete

<img src=https://github.com/Jason-Wall/lhl-midterm/blob/master/documents/02_map_crud.gif/>

### Favourite maps

<img src=https://github.com/Jason-Wall/lhl-midterm/blob/master/documents/03_fav_maps.gif/>

## Dependencies:

```js
dependencies: {
    chalk: ^2.4.2,
    cookie-parser: ^1.4.6,
    dotenv: ^2.0.0,
    express: ^4.17.1,
    morgan: ^1.9.1,
    pg: ^8.5.0,
    sass: ^1.35.1
  },
  devDependencies: {
    nodemon: ^2.0.10
  }
```

## Getting Started

1. Clone or fork the project into a suitable working folder
2. Install dependencies: `npm i`
3. Start postgreSQL
4. Create an `.env` using the following entries:

```DB_HOST=localhost
DB_USER=labber
DB_PASS=labber
DB_NAME=midterm
DB_PORT=5432
GOOGLE_MAPS_API_KEY= <please provide your own key>
```

5. Reset database: `npm run db:reset`
6. Run the server: `npm run local`
7. Visit `http://localhost:8080/`

(optional)
Fix to binaries for sass: `npm rebuild node-sass` if planning to do work on the styles.
