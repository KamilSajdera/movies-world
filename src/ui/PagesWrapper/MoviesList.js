import classes from "./MoviesList.module.css";

const MoviesList = ({ title, movies }) => {
    
  return (
    <section className={classes.moviesList}>
      <h2>{title}</h2>
      {movies.map(movie => 
        <div className={classes['movie-item']} key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <p>{movie.title}</p>
        </div> 
      )}
    </section>
  );
};

export default MoviesList;
