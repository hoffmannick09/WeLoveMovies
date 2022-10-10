const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const isShowing = req.query.is_showing;

  if (isShowing) {
    res.json({ data: await moviesService.listMovies() });
  } else {
    res.json({ data: await moviesService.list() });
  }
}



module.exports = {
  //read: [asyncErrorBoundary(movieExists), read],
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
