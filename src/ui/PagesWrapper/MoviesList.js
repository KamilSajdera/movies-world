import { useNavigate } from "react-router-dom";
import classes from "./MoviesList.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import PaginationSelection from "../PaginationSelection";

const MoviesList = (props) => {
  const { title, movies, totalPages } = props;
  const navigate = useNavigate();

  const handleItemClick = (value) => {
    props.onChangeMovie(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function changePageHandler(nr) {
    navigate("?page=" + nr)
  }

  return (
    <section className={classes.moviesList}>
      <h2>{title}</h2>
      <PaginationSelection onChangePage={changePageHandler} totalPages={totalPages} />
      {movies.map((movie, index) => (
        <div
          className={classes["movie-item"]}
          key={movie.id}
          onClick={() => handleItemClick(index)}
        >
          <div className={classes.overlay}>
            <div className={classes["movie-date"]}>
              {new Date(movie.release_date).toLocaleDateString("fr-CH")}
            </div>
            <div className={classes["movie-votes"]}>
              <FontAwesomeIcon icon={faStar} /> {movie.vote_average.toFixed(2)}{" "}
              / {movie.vote_count} <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.title}</p>
        </div>
      ))}
    </section>
  );
};

export default MoviesList;
