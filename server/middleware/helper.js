export const parseData = (req, res, next) => {
  const { trailer, cast, genres, tags, writers, directors } = req.body;

  if (trailer) req.body.trailer = JSON.parse(trailer);
  if (cast) req.body.cast = JSON.parse(cast);
  if (genres) req.body.genres = JSON.parse(genres);
  if (tags) req.body.tags = JSON.parse(tags);
  if (writers) req.body.writers = JSON.parse(writers);
  if (directors) req.body.directors = JSON.parse(directors);

  next();
};
