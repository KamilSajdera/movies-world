import { useNavigate } from "react-router-dom";

import classes from "./ResultsContent.module.css";
import noImage from "../../assets/people/noImage.png";

const MoviesSection = ({ movies }) => {

  const navigate = useNavigate();

  return (
    <div className={classes["results_items"]}>
      {movies.map((movie) => {
        const date = new Date(movie.release_date).toLocaleDateString("en-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        const image = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          : noImage;

        const navigateUrl = `/movie?id=${movie.id}-${movie.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .trim()}`;

        return (
          <div
            className={classes["result-item"]}
            key={movie.id}
            onClick={() => navigate(navigateUrl)}
          >
            <div className={classes["result-img"]}>
              <img src={image} alt="alt" />
            </div>
            <div className={classes["result-item-data"]}>
              <h4>{movie.title}</h4>
              <p className={classes.date}>{date}</p>
              <p className={classes.results_overview}>{movie.overview}</p>
            </div>
          </div>
        );
      })}
      {movies.length === 0 && <p>No data for section movies.</p>}
    </div>
  );
};

export default MoviesSection;
