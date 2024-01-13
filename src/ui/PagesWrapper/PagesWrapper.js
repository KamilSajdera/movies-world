import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import classes from "./PagesWrapper.module.css";

const PagesWrapper = ({ movies }) => {
  const movie = movies[0];

  const movieDate = new Date(movie.release_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <section
      className={classes.backgroundWrapper}
      style={{
        backgroundImage: `linear-gradient( rgba(0,0,0,0.6), rgba(0, 0, 0, 0.6) ),url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className={classes.backgroundContent}>
        <h1>{movie.title}</h1>
        <p>{movieDate}</p>
      </div>

      <div className={classes.overview}>{movie.overview}</div>

      <button className={classes["visit-movie-profile"]}>
        <FontAwesomeIcon icon={faPlay} /> Check more
      </button>

      <div className={classes.sliderControls}>
        <div className={classes["control-item"]}></div>
        <div className={classes["control-item"]}></div>
        <div
          className={`${classes["control-item"]} ${classes["control-mid"]} `}
        ></div>
        <div className={classes["control-item"]}></div>
        <div className={classes["control-item"]}></div>
      </div>
    </section>
  );
};

export default PagesWrapper;
