import { useLoaderData, json } from "react-router-dom";

import MovieDetailsPage from "../ui/MovieDetails/MovieDetailsPage";

const FilmDetailsPage = () => {
  const fetchedDetails = useLoaderData();

  const movieTrailer = fetchedDetails.videos.results.find((item) => item.type === "Trailer");

  const movieBudget = fetchedDetails.budget.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const movieProfit =  fetchedDetails.revenue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  let uniqeMovieCast = new Set();
  let crewWithoutRepetitions = fetchedDetails.credits.crew.filter((item) => {
    if (!uniqeMovieCast.has(item.name)) {
      uniqeMovieCast.add(item.name);
      return true;
    }
    return false;
  });

  const returnCrewMember = (job) => {
    return crewWithoutRepetitions
      .filter((item) => item.department === job)
      .sort((a, b) => b.popularity - a.popularity);
  };

  const movieDetails = {
    id: fetchedDetails.id,
    title: fetchedDetails.title,
    backdrop: fetchedDetails.backdrop_path,
    poster: fetchedDetails.poster_path,
    posters: fetchedDetails.images.posters,
    overview: fetchedDetails.overview,
    status: fetchedDetails.status,
    releaseDate: fetchedDetails.release_date,
    genres: fetchedDetails.genres,
    reviews: fetchedDetails.reviews,
    duration: fetchedDetails.runtime,
    adult: fetchedDetails.adult,
    usersRating: Math.floor(fetchedDetails.vote_average * 10),
    topActors: fetchedDetails.credits.cast.slice(0, 15),
    profit:movieProfit,
    budget: movieBudget,
    movieCrew: {
      director: returnCrewMember("Directing"),
      writer: returnCrewMember("Writing"),
      producer: returnCrewMember("Production"),
    },
    trailer: movieTrailer ? movieTrailer.key : null,
    homepage: fetchedDetails.homepage,  
    keywords: fetchedDetails.keywords,
    similar: fetchedDetails.similar,
    recommendations: fetchedDetails.recommendations.results
  };
  
  return <MovieDetailsPage movieData={movieDetails} />;
};

export const loader = async ({ request, params }) => {
  const searchParams = new URL(request.url).searchParams;
  const movieId = searchParams.get('id').split("-")[0];

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
      `Bearer ${process.env.REACT_APP_BEARER_KEY}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=reviews,similar,credits,videos,images,keywords,recommendations`,
    options
  );

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch movie details page.",
        desc: "Something went wrong while loading the movie details page. Check the correctness of the link.",
      },
      { status: 500 }
    );
  }

  return response;
};

export default FilmDetailsPage;
