const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
  return knex("movies").select("*");
}

function listMovies() {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movies_id")
    .select("movies.*")
    .where({ "movies_theaters.is_showing": true })
    .groupBy("movies.movie_id");
}

module.exports = {
  list,
  //   read,
  listMovies,
  //   listMovieTheaters,
  //   listMovieReviews,
};
