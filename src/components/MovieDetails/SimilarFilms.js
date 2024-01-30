import { useNavigate } from "react-router-dom";
import classes from "./SimilarFilms.module.css";

const SimilarFilms = ({ movies, title }) => {
  const navigate = useNavigate();

  const navigateToMovie = (id, name) => {
    const urlName = name.toLowerCase().replace(/\s+/g, "-").trim();
    navigate(`/movie?id=${id}-${urlName}`);
  };

  let content =
    movies.length > 0
      ? movies.map((movie) => (
          <div
            className={classes["movie-item"]}
            key={movie.id}
            onClick={() => navigateToMovie(movie.id, movie.title)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt="Movie poster"
            />
            <p>{movie.title}</p>
          </div>
        ))
      : <p className={classes.noInfoMessage}>We don't have informations about {title} for this movie.</p>

  return (
    <div className={classes.similarWrapper}>
      <h1>{title}</h1>
      <div className={classes.moviesItems}>{content}</div>
    </div>
  );
};

export default SimilarFilms;
