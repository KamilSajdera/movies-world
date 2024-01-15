import classes from "./MoviesList.module.css";

const MoviesList = (props) => {
  const { title, movies } = props;

  const handleItemClick = (value) => {
    props.onChangeMovie(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className={classes.moviesList}>
      <h2>{title}</h2>
      {movies.map((movie, index) => (
        <div
          className={classes["movie-item"]}
          key={movie.id}
          onClick={() => handleItemClick(index)}
        >
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
