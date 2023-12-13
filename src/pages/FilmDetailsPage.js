import { useLoaderData, json } from "react-router-dom";

import MovieDetailsPage from "../components/MovieDetails/MovieDetailsPage";

const FilmDetailsPage = () => {
  const fetchedDetails = useLoaderData();

  const movieDetails = {
    id: fetchedDetails.id,
    title: fetchedDetails.title,
    backdrop: fetchedDetails.backdrop_path,
    poster: fetchedDetails.poster_path,
    overview: fetchedDetails.overview,
    status: fetchedDetails.status,
    releaseDate: fetchedDetails.release_date,
    genres: fetchedDetails.genres,
    reviews: fetchedDetails.reviews,
    duration: fetchedDetails.runtime,
    adult: fetchedDetails.adult,
    usersRating: Math.floor(fetchedDetails.vote_average * 10),
  };

  return <MovieDetailsPage movieData={movieDetails} />;
};

export const loader = async ({ request, params }) => {
  const movieId = params.movieId;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDE2OTgxZDhmYWFkNWQxYzYxMTM4ZjBiM2ZkZWQ4MyIsInN1YiI6IjY1NGE2YWE0NmJlYWVhMDE0YjY5YmEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RAp4YuNKXT0gyW8M0AhMQl2tIGrfPxe4jvUjxe4N-PY",
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=reviews,similar`,
    options
  );

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch film details page.",
        desc: "Something went wrong while loading the film details page. Check the correctness of the link.",
      },
      { status: 500 }
    );
  }

  return response;
};

export default FilmDetailsPage;
