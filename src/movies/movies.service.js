const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
  return knex("movies").select("*");
}

function listMovies() {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .select("movies.*")
    .where({ "movies_theaters.is_showing": true })
    .groupBy("movies.movie_id");
}

function read(movieId) {
    return knex("movies")
    .select("movies.*")
    .where({"movies.movie_id": movieId})
    .first()
}

function listMovieTheaters() {
  return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*")
    .groupBy("t.theater_id");
} 

module.exports = {
  list,
  read,
  listMovies,
  listMovieTheaters,
  //   listMovieReviews,
};
