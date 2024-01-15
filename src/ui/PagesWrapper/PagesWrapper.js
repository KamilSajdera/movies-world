import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import classes from "./PagesWrapper.module.css";

import MoviesList from "./MoviesList";

const PagesWrapper = ({ movies }) => {
  const [currentlyShowingMovie, setCurrentlyShowingMovie] = useState(0);
  const pageWrapperRef = useRef();
  const sliderControlsRef = useRef();
  const navigate = useNavigate();

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

  const changeMovieByUser = useCallback((e) => {
    const clickedNumber = parseInt(e.target.getAttribute("data-number-movie")) || 0;
    
    const newMovieIndex =
      (currentlyShowingMovie + clickedNumber + movies.length) % movies.length;

    if(newMovieIndex === currentlyShowingMovie)
      return;

    pageWrapperRef.current.classList.add(classes.changingBg);
    setTimeout(() => {
      pageWrapperRef.current.classList.remove(classes.changingBg);
    }, 600);
    setCurrentlyShowingMovie(newMovieIndex);
  }, [currentlyShowingMovie, movies]);
  

  useEffect(() => {
    const sliderItems = sliderControlsRef.current.querySelectorAll(
      `.${classes["control-item"]}`
    );
    sliderItems.forEach((item) =>
      item.addEventListener("click", changeMovieByUser)
    );

    return () =>
      sliderItems.forEach((item) =>
        item.removeEventListener("click", changeMovieByUser)
      );
  }, [changeMovieByUser]);
  
  const visitProfileHandler = () => 
  {
    const urlName = movie.title.toLowerCase().replace(/\s+/g, '-').trim();
    navigate(`/movie/${movie.id}-${urlName}`)
  }

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
      
      <button className={classes["visit-movie-profile"]} onClick={visitProfileHandler}>
        <FontAwesomeIcon icon={faPlay} /> Check more
      </button>
      <div className={classes.sliderControls} ref={sliderControlsRef}>
        <div className={classes["control-item"]} data-number-movie="-2"></div>
        <div className={classes["control-item"]} data-number-movie="-1"></div>
        <div
          className={`${classes["control-item"]} ${classes["control-mid"]} `}
        ></div>
        <div className={classes["control-item"]} data-number-movie="1"></div>
        <div className={classes["control-item"]} data-number-movie="2"></div>
      </div>
    </section>
    <MoviesList title="Currently playing in cinemas" movies={movies}/>
    </>
  );
};

export default PagesWrapper;
