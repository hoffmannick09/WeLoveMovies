const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

async function list(req, res, next) {
  const isShowing = req.query.is_showing;

  if (isShowing) {
    res.json({ data: await moviesService.listMovies() });
  } else {
    res.json({ data: await moviesService.list() });
  }
}

async function read(req, res, next) {
  const { movie: data } = res.locals
  res.json({ data })
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  list: asyncErrorBoundary(list),
  //   listMovieTheaters: [
  //     asyncErrorBoundary(movieExists),
  //     asyncErrorBoundary(listMovieTheaters),
  //   ],
  //   listMovieReviews: [
  //     asyncErrorBoundary(movieExists),
  //     asyncErrorBoundary(listMovieReviews),
  //   ],
};
