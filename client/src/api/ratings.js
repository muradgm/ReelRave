import axios from "axios";

export const fetchMovieRating = async (movieTitle) => {
  const omdbApiKey = "30c12724";

  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?t=${movieTitle}&apikey=${omdbApiKey}`
    );
    const imdbRating = response.data.imdbRating;
    return imdbRating;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieDuration = async (movieTitle) => {
  const omdbApiKey = "30c12724";
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?t=${movieTitle}&apikey=${omdbApiKey}`
    );
    const duration = response.data.Runtime;
    return duration;
  } catch (error) {
    console.log(error);
  }
};
