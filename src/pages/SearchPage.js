import { json, useLoaderData } from "react-router-dom";
import SearchResults from "../components/SearchResults/SearchResults";

const SearchPage = () => {
  const data = useLoaderData();
  return <SearchResults results={data.results} title={data.title} />;
};

export default SearchPage;

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("query");
  const page = url.searchParams.get("page") || 1;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
      `Bearer ${process.env.REACT_APP_BEARER_KEY}`,
    },
  };

  const responseMovies = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&page=${page}`,
    options
  );

  const responseSeries = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&page=${page}`,
    options
  );

  const responsePeople = await fetch(
    `https://api.themoviedb.org/3/search/person?query=${searchTerm}&page=${page}`,
    options
  );

  if (!responseMovies.ok) {
    throw json(
      {
        message: "An error occured!",
        desc: "Failed to search movies section. Please try again later.",
      },
      { status: 500 }
    );
  }

  if (!responseSeries.ok) {
    throw json(
      {
        message: "An error occured!",
        desc: "Failed to search series section. Please try again later.",
      },
      { status: 500 }
    );
  }

  if (!responsePeople.ok) {
    throw json(
      {
        message: "An error occured!",
        desc: "Failed to search people section. Please try again later.",
      },
      { status: 500 }
    );
  }

  const responseMoviesData = await responseMovies.json();
  const responseSeriesData = await responseSeries.json();
  const responsePeopleData = await responsePeople.json();

  const results = {
    movies: responseMoviesData,
    series: responseSeriesData,
    people: responsePeopleData,
  };

  return { results: results, title: searchTerm };
}
