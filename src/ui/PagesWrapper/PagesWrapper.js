import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import classes from "./PagesWrapper.module.css";

import MoviesList from "./MoviesList";
import SliderControls from "./SliderControls";

const PagesWrapper = ({ movies, title }) => {
  const [currentlyMovieNumber, setCurrentlyMovieNumber] = useState(0);
  const pageWrapperRef = useRef();
  const navigate = useNavigate();

  const movie = movies[currentlyMovieNumber];

  const movieDate = new Date(movie.release_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    const changeMovieInterval = setInterval(() => {
      if (currentlyMovieNumber < 19)
        setCurrentlyMovieNumber(currentlyMovieNumber + 1);
      else setCurrentlyMovieNumber(0);
    }, 9000);

    return () => {
      clearInterval(changeMovieInterval);
    };
  }, [currentlyMovieNumber]);

  const visitProfileHandler = () => {
    const urlName = movie.title.toLowerCase().replace(/\s+/g, "-").trim();
    navigate(`/movie?id=${movie.id}-${urlName}`);
  };

  useEffect(() => {
    pageWrapperRef.current.classList.add(classes.changingBg);

    const removeClassTimeout = setTimeout(() => {
      pageWrapperRef.current.classList.remove(classes.changingBg);
    }, 600);

    return () => clearTimeout(removeClassTimeout);
  }, [currentlyMovieNumber]);

  return (
    <>
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
          <div className={classes.overview}>{movie.overview}</div>
        </div>

        <button
          className={classes["visit-movie-profile"]}
          onClick={visitProfileHandler}
        >
          <FontAwesomeIcon icon={faPlay} /> Check more
        </button>
        <SliderControls
          currentlyShowingMovie={currentlyMovieNumber}
          moviesLength={movies.length}
          onChangeNumber={(value) => setCurrentlyMovieNumber(value)}
        />
      </section>
      <MoviesList
        title={title}
        movies={movies}
        onChangeMovie={(value) => setCurrentlyMovieNumber(value)}
      />
    </>
  );
};

export default PagesWrapper;
