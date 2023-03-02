import axios from "axios";

export const fetchPosterUrl = async (title) => {
  const omdbApiKey = "30c12724";
  const omdbApiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(
    title
  )}&apikey=${omdbApiKey}`;
  const response = await axios.get(omdbApiUrl);
  if (response.data && response.data.Poster) {
    return response.data.Poster;
  } else {
    return null;
  }
};
