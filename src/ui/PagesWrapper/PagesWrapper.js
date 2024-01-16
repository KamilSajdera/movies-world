import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import classes from "./PagesWrapper.module.css";

import MoviesList from "./MoviesList";
import SliderControls from "./SliderControls";

const PagesWrapper = ({ movies }) => {
  const [currentlyShowingMovie, setCurrentlyShowingMovie] = useState(0);
  const pageWrapperRef = useRef();
  const navigate = useNavigate();

  const movie = movies[currentlyShowingMovie];

  const movieDate = new Date(movie.release_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    const changeMovieInterval = setInterval(() => {
      if (currentlyShowingMovie < 19) 
        setCurrentlyShowingMovie(currentlyShowingMovie + 1);
      else 
        setCurrentlyShowingMovie(0);
    }, 9000);

    return () => {
      clearInterval(changeMovieInterval);
    };
  }, [currentlyShowingMovie]);

  const visitProfileHandler = () => {
    const urlName = movie.title.toLowerCase().replace(/\s+/g, "-").trim();
    navigate(`/movie/${movie.id}-${urlName}`);
  };

  const changeMovieByUser = (value) => setCurrentlyShowingMovie(value);

  useEffect(() => {
    pageWrapperRef.current.classList.add(classes.changingBg);

    const removeClassTimeout = setTimeout(() => {
      pageWrapperRef.current.classList.remove(classes.changingBg);
    }, 600);

    return () => clearTimeout(removeClassTimeout);

  }, [currentlyShowingMovie])

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
        <SliderControls currentlyShowingMovie={currentlyShowingMovie} moviesLength={movies.length} onChangeNumber={changeMovieByUser} />
      </section>
      <MoviesList
        title="Currently playing in cinemas"
        movies={movies}
        onChangeMovie={(value) => setCurrentlyShowingMovie(value)}
      />
    </>
  );
};

export default PagesWrapper;
