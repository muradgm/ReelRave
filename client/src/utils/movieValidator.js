export const validateMovieInfo = (movieInfo) => {
  const {
    title,
    storyLine,
    director,
    writers,
    cast,
    genres,
    releaseDate,
    poster,
    language,
    status,
    tags,
    type,
  } = movieInfo;
  if (!title.trim()) return { error: "Title is missing!" };
  if (!storyLine.trim()) return { error: "Story line is missing!" };
  if (!tags.length) return { error: "Tags are missing!" };
  if (!Object.keys(director).length) return { error: "Director is missing!" };
  if (!writers.length) return { error: "Writers are missing!" };
  if (!cast.length) return { error: "Cast is missing!" };
  if (!releaseDate || releaseDate < 1900 || releaseDate > 2100) {
    return { error: "Release date is missing or invalid!" };
  }
  if (!poster) return { error: "Poster is missing!" };
  if (!genres.length) return { error: "Genres are missing!" };
  if (!type) return { error: "Type is missing!" };
  if (!language) return { error: "Language is missing!" };
  if (!status) return { error: "Status is missing!" };
  return { error: null };
};
