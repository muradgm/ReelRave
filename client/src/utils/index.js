import genres from "./genres.js";
import { renderItem } from "./helper.js";
import { defaultMovieInfo } from "./helper.js";
import { validateMovieInfo } from "./movieValidator.js";
import { typeOptions } from "./options.js";
import { statusOptions } from "./options.js";
import { languageOptions } from "./options.js";
import { commonModalClasses } from "./theme.js";
import { classes } from "./theme.js";
import { inputWrapperClasses } from "./theme.js";

export {
  genres,
  renderItem,
  defaultMovieInfo,
  validateMovieInfo,
  typeOptions,
  statusOptions,
  languageOptions,
  commonModalClasses,
  classes,
  inputWrapperClasses,
};

/**
 * // Fetching poster from OMDB API if no file is provided
  // uploading poster
  let posterUrl;
  if (file) {
    const {
      secure_url: url,
      public_id,
      responsive_breakpoints,
    } = await cloudinary.uploader.upload(file.path, {
      transformation: {
        width: 1280,
        height: 720,
      },
      responsive_breakpoints: {
        create_derived: true,
        max_width: 640,
        max_images: 3,
      },
    });
    posterUrl = url;
    const poster = { url, public_id, responsive: [] };
    const { breakpoints } = responsive_breakpoints[0];
    if (breakpoints.length) {
      for (let imgObj of breakpoints) {
        const { secure_url } = imgObj;
        poster.responsive.push(secure_url);
      }
    }
    newMovie.poster = poster;
  } else {
    const ombdApiKey = "30c12724";
    const ombdApiUrl = `http://www.ombdapi.com/?t=${encodedURIComponent(
      title
    )}&apikey=${ombdApiKey}`;
    const response = await fetch(ombdApiUrl);
    const data = await response.json();
    if (data && data.Poster) {
      posterUrl = data.Poster;
    }
  }
  if (posterUrl) {
    const {
      secure_url: url,
      public_id,
      responsive_breakpoints,
    } = await cloudinary.uploader.upload(posterUrl, {
      transformation: {
        width: 1280,
        height: 720,
      },
      responsive_breakpoints: {
        create_derived: true,
        max_width: 640,
        max_images: 3,
      },
    });
    const poster = { url, public_id, responsive: [] };
    const { breakpoints } = responsive_breakpoints[0];
    if (breakpoints.length) {
      for (let imgObj of breakpoints) {
        const { secure_url } = imgObj;
        poster.responsive.push(secure_url);
      }
    }
    newMovie.poster = poster;
  }
 */
