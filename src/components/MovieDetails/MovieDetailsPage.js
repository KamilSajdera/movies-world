import classes from "./MovieDetailsPage.module.css";

import MovieBasics from "./MovieBasics";
import UsersRating from "./UsersRating";

const MovieDetailsPage = ({ movieData }) => {
  return (
    <div
      className={classes.movieWrapper}
      style={{
        backgroundImage: `linear-gradient( rgba(0,0,0,0.6), rgba(0, 0, 0, 0.6) ),url(https://image.tmdb.org/t/p/original${movieData.backdrop})`,
      }}
    >
      <div className={classes.movieIntroContent}>
        <h1>{movieData.title}</h1>
        <MovieBasics movieData={movieData} />
        <UsersRating
          usersRating={movieData.usersRating}
          quantityReviews={movieData.reviews.total_results}
        />
      </div>
      <div className={classes.overview}>{movieData.overview}</div>
    </div>
  );
};

export default MovieDetailsPage;
