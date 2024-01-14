import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import classes from "./PagesWrapper.module.css";

const PagesWrapper = ({ movies }) => {
  const [currentlyShowingMovie, setCurrentlyShowingMovie] = useState(0);
  const pageWrapperRef = useRef();

  const movie = movies[currentlyShowingMovie];

  const movieDate = new Date(movie.release_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    const changeMovieInterval = setInterval(() => {
      if (currentlyShowingMovie < 19) {
        pageWrapperRef.current.classList.add(classes.changingBg);
        setCurrentlyShowingMovie(currentlyShowingMovie + 1);
      } else setCurrentlyShowingMovie(0);
    }, 9000);

    const removeClassTimeout = setTimeout(() => {
      pageWrapperRef.current.classList.remove(classes.changingBg);
    }, 600);

    return () => {
      clearInterval(changeMovieInterval);
      clearTimeout(removeClassTimeout);
    };
  }, [currentlyShowingMovie]);

  return (
    <section
      className={classes.backgroundWrapper}
      style={{
        backgroundImage: `linear-gradient( rgba(0,0,0,0.6), rgba(0, 0, 0, 0.6) ),url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
      ref={pageWrapperRef}
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
