import { useLoaderData, json } from "react-router-dom";

import MovieDetailsPage from "../ui/MovieDetails/MovieDetailsPage";

const SerialDetailsPage = () => {
  const fetchedDetails = useLoaderData();

  const lastRelease = new Date(fetchedDetails.last_air_date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  const tvLength = `SE: ${fetchedDetails.number_of_seasons} | EP: ${fetchedDetails.number_of_episodes}`;

  const movieTrailer = fetchedDetails.videos?.results.find(
    (item) => item.type === "Trailer"
  );

  let uniqeMovieCast = new Set();
  let crewWithoutRepetitions = fetchedDetails.aggregate_credits?.crew.filter(
    (item) => {
      if (!uniqeMovieCast.has(item.name)) {
        uniqeMovieCast.add(item.name);
        return true;
      }
      return false;
    }
  );

  const returnCrewMember = (job) => {
    if(crewWithoutRepetitions === undefined) 
      return [];

    return crewWithoutRepetitions
      .filter((item) => item.known_for_department === job)
      .sort((a, b) => b.popularity - a.popularity);
  };

  const tvDetails = {
    id: fetchedDetails.id,
    title: fetchedDetails.name,
    backdrop: fetchedDetails.backdrop_path,
    poster: fetchedDetails.poster_path,
    posters: fetchedDetails.images?.posters || [],
    overview: fetchedDetails.overview,
    status: fetchedDetails.status,
    releaseDate: fetchedDetails.first_air_date,
    genres: fetchedDetails.genres,
    reviews: fetchedDetails.reviews || [],
    adult: fetchedDetails.adult,
    usersRating: Math.floor(fetchedDetails.vote_average * 10),
    topActors: fetchedDetails.aggregate_credits?.cast.slice(0, 15) || [],
    tvLength: tvLength,
    lastRelease: lastRelease,
    providers: fetchedDetails.networks.map(item => { return item.name}),
    movieCrew: {
      director: returnCrewMember("Directing"),
      writer: returnCrewMember("Writing"),
      producer: returnCrewMember("Production"),
    },
    trailer: movieTrailer ? movieTrailer.key : null,
    homepage: fetchedDetails.homepage,
    keywords: fetchedDetails.keywords || [],
    similar: fetchedDetails.similar || [],
    recommendations: fetchedDetails.recommendations?.results || [],
  };

  return <MovieDetailsPage movieData={tvDetails} />;
};

export const loader = async ({ request, params }) => {
  const searchParams = new URL(request.url).searchParams;
  const serialId = searchParams.get("id").split("-")[0];

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDE2OTgxZDhmYWFkNWQxYzYxMTM4ZjBiM2ZkZWQ4MyIsInN1YiI6IjY1NGE2YWE0NmJlYWVhMDE0YjY5YmEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RAp4YuNKXT0gyW8M0AhMQl2tIGrfPxe4jvUjxe4N-PY",
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${serialId}?append_to_response=reviews%2Csimilar%2Caggregate_credits%2Cvideos%2Cimages%2Ckeywords%2Crecommendations`,
    options
  );

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch tv series details page.",
        desc: "Something went wrong while loading the tv series details page. Check the correctness of the link.",
      },
      { status: 500 }
    );
  }

  return response;
};

export default SerialDetailsPage;
