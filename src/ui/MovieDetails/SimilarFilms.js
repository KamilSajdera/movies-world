import { useNavigate } from "react-router-dom";
import classes from "./SimilarFilms.module.css";

import noMovieImg from "../../assets/people/noImage.png";

const SimilarFilms = ({ movies, title }) => {
  const navigate = useNavigate();

  const navigateToMovie = (id, name) => {
    const urlName = name.toLowerCase().replace(/\s+/g, "-").trim();

    if(movies.find(movie => movie.id === id).first_air_date === undefined)
      navigate(`/movie?id=${id}-${urlName}`);
    else 
      navigate(`/tv?id=${id}-${urlName}`);
  };

  let content =
    movies.length > 0 ? (
      movies.map((movie) => {
        const img =
          movie.backdrop_path === null
            ? noMovieImg
            : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
            
        return (
          <div
            className={classes["movie-item"]}
            key={movie.id}
            onClick={() => navigateToMovie(movie.id, movie.title || movie.name)}
          >
            <img src={img} alt="Movie poster" />
            <p>{movie.title || movie.name}</p>
          </div>
        );
      })
    ) : (
      <p className={classes.noInfoMessage}>
        We don't have informations about {title} for this movie.
      </p>
    );

  return (
    <div className={classes.similarWrapper}>
      <h1>{title}</h1>
      <div className={classes.moviesItems}>{content}</div>
    </div>
  );
};

export default SimilarFilms;
