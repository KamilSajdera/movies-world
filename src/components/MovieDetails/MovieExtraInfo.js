import { useRef, useState, useEffect, useMemo } from "react";
import classes from "./MovieExtraInfo.module.css";

import previousArrow from "../../assets/preview.png";
import nextArrow from "../../assets/next.png";

const MovieExtraInfo = ({ movieData }) => {
  const posterRef = useRef();
  const postersTab = useMemo(
    () => [
      movieData.poster,
      ...movieData.posters.map((item) => item.file_path),
    ],
    [movieData.posters, movieData.poster]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [actualPoster, setActualPoster] = useState(postersTab[currentIndex]);

  const changePosterHandle = (action) => {
    let nextIndex;

    if (action === "next") {
      nextIndex = (currentIndex + 1) % postersTab.length;
      posterRef.current.classList.add(classes.nextImage);
      setTimeout(() => {
        posterRef.current.classList.remove(classes.nextImage);
      }, 400);
    } else if (action === "prev") {
      nextIndex = (currentIndex - 1 + postersTab.length) % postersTab.length;
      posterRef.current.classList.add(classes.prevImage);
      setTimeout(() => {
        posterRef.current.classList.remove(classes.prevImage);
      }, 400);
    }

    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    setActualPoster(postersTab[currentIndex]);
  }, [currentIndex, postersTab]);

  return (
    <div className={classes.extraInfoSection}>
      <div className={classes.movieImages}>
        <img
          src={previousArrow}
          alt="Previous poster img"
          className={classes.controlPoster}
          onClick={() => changePosterHandle("prev")}
        />
        <div className={classes.actualPoster}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${actualPoster}`}
            alt="Movie poster"
            ref={posterRef}
          />
        </div>
        <img
          src={nextArrow}
          alt="Next poster img"
          className={classes.controlPoster}
          onClick={() => changePosterHandle("next")}
        />
      </div>
      <div className={classes.informations}>
        <div className={classes["info-item"]}>
          <p className={classes.personName}>
            { movieData.movieCrew.director[0] ? movieData.movieCrew.director[0].name : "No data"}
          </p>
          <p className={classes.personName}>  
            { movieData.movieCrew.director[1] ? movieData.movieCrew.director[1].name : ""}
          </p>
          <p>Directing</p>
        </div>
        <div className={classes["info-item"]}>
          <p className={classes.personName}>
            { movieData.movieCrew.writer[0] ? movieData.movieCrew.writer[0].name : "No data"}
          </p>
         <p className={classes.personName}>
            { movieData.movieCrew.writer[1] ? movieData.movieCrew.writer[1].name : ""}
          </p>
          <p>Screenplay</p> 
        </div>
        <div className={classes["info-item"]}>
          <p className={classes.personName}>
            { movieData.movieCrew.producer[0] ? movieData.movieCrew.producer[0].name : "No data"}
          </p>
          <p className={classes.personName}>
            { movieData.movieCrew.producer[1] ? movieData.movieCrew.producer[1].name : ""}
          </p>
          <p>Production</p>
        </div>
        <div className={classes["info-item"]}>
          <p className={classes.personName}>{movieData.status}</p>
          <p>Status</p>
        </div>
        <div className={classes["info-item"]}>
          <p className={classes.personName}>{movieData.budget}</p>
          <p>Budget</p>
        </div>
        <div className={classes["info-item"]}>
          <p className={classes.personName}>{movieData.profit}</p>
          <p>Profit</p>
        </div>
      </div>
    </div>
  );
};

export default MovieExtraInfo;
