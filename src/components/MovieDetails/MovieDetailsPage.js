import classes from "./MovieDetailsPage.module.css";

import MovieIntoContent from "./MovieIntroContent";
import IntroButtons from "./IntroButtons";
import MovieExtraInfo from "./MovieExtraInfo";
import DisplayMovieActors from "./DisplayMovieActors";
import DisplayMovieKeywords from "./DisplayMovieKeywords";
import MovieTrailer from "./MovieTrailer";

const MovieDetailsPage = ({ movieData }) => {
  return (
    <>
    <div
      className={classes.movieWrapper}
      style={{
        backgroundImage: `linear-gradient( rgba(0,0,0,0.6), rgba(0, 0, 0, 0.6) ),url(https://image.tmdb.org/t/p/original${movieData.backdrop})`,
      }}
    >
      <MovieIntoContent movieData={movieData} />
      <div className={classes.overview}>{movieData.overview}</div>
      <IntroButtons homepage={movieData.homepage} trailer={movieData.trailer} />
    </div>
    <MovieExtraInfo movieData={movieData}/>
    <div className={classes.actorsWrapper}>
      <DisplayMovieActors cast={movieData.topActors} />
      <DisplayMovieKeywords keywords={movieData.keywords.keywords} />
    </div>
    <MovieTrailer videoId={movieData.trailer} />
    </>
  );
};

export default MovieDetailsPage;
