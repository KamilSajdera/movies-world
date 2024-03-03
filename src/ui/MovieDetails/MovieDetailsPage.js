import classes from "./MovieDetailsPage.module.css";

import MovieIntoContent from "./MovieIntroContent";
import IntroButtons from "./IntroButtons";
import MovieExtraInfo from "./MovieExtraInfo";
import DisplayMovieActors from "./DisplayMovieActors";
import DisplayMovieKeywords from "./DisplayMovieKeywords";
import MovieTrailer from "./MovieTrailer";
import ReviewsSection from "./ReviewsSection";
import SimilarFilms from "./SimilarFilms";

import defaultBackgroundImg from "../../assets/background-default.jpg";

const MovieDetailsPage = ({ movieData }) => {
  const backgroundImage = movieData.backdrop
    ? `https://image.tmdb.org/t/p/original${movieData.backdrop}`
    : defaultBackgroundImg;

  return (
    <>
      <div
        className={classes.movieWrapper}
        style={{
          backgroundImage: `linear-gradient( rgba(0,0,0,0.6), rgba(0, 0, 0, 0.6) ),url(${backgroundImage})`,
        }}
      >
        <MovieIntoContent movieData={movieData} />
        <div className={classes.overview}>{movieData.overview}</div>
        <IntroButtons
          homepage={movieData.homepage}
          trailer={movieData.trailer}
        />
      </div>
      <MovieExtraInfo movieData={movieData} />
      <div className={classes.actorsWrapper}>
        <DisplayMovieActors cast={movieData.topActors} id={movieData.id} title={movieData.title}/>
        <DisplayMovieKeywords
          keywords={
            movieData.keywords.keywords?.slice(0, 17) ||
            movieData.keywords.results?.slice(0, 17) ||
            []
          }
        />
      </div>
      {movieData.trailer && <MovieTrailer videoId={movieData.trailer} />}
      <ReviewsSection reviews={movieData.reviews?.results || []} />
      <SimilarFilms
        movies={movieData.recommendations?.slice(0, 15) || []}
        title="Recommendations"
      />
      <SimilarFilms
        movies={movieData.similar.results?.slice(0, 15) || []}
        title="Similar movies"
      />
    </>
  );
};

export default MovieDetailsPage;
