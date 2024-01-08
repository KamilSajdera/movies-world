import { useNavigate } from "react-router-dom";
import classes from "./SimilarFilms.module.css";

const SimilarFilms = ({ movies }) => {
  const navigate = useNavigate();

  const navigateToMovie = (id, name) => {
    const urlName = name.toLowerCase().replace(/\s+/g, '-').trim();
    navigate(`/movie/${id}-${urlName}`)
  };

  return (
    <div className={classes.similarWrapper}>
      <h1>Similar movies</h1>
      <div className={classes.moviesItems}>
        {movies.map((movie) => (
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
        ))}
      </div>
    </div>
  );
};

export default SimilarFilms;
