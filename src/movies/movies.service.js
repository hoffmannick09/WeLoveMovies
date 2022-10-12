const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function addCritic(movies) {
  return movies.map((movie) => {
    return {
      review_id: movie.review_id,
      content: movie.content,
      score: movie.score,
      created_at: movie.created_at,
      updated_at: movie.updated_at,
      critic_id: movie.critic_id,
      movie_id: movie.movie_id,
      critic: {
        critic_id: movie.c_critic_id,
        preferred_name: movie.preferred_name,
        surname: movie.surname,
        organization_name: movie.organization_name,
        created_at: movie.c_created_at,
        updated_at: movie.c_updated_at,
      },
    };
  });
}

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
    .where({ "movies.movie_id": movieId })
    .first();
}

function listMovieTheaters() {
  return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*")
    .groupBy("t.theater_id");
}

function listMovieReview(movieId) {
  return knex("movies")
    .join("reviews", "movies.movie_id", "reviews.movie_id")
    .join("critics as c", "reviews.critic_id", "c.critic_id")
    .select(
      "movies.*",
      "reviews.*",
      "c.created_at as c_created_at",
      "c.updated_at as c_updated_at",
      "c.critic_id as c_critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name"
    )
    .where({ "reviews.movie_id": movieId })
    .then(addCritic);
}

module.exports = {
  list,
  read,
  listMovies,
  listMovieTheaters,
  listMovieReview,
};
