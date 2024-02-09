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

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDE2OTgxZDhmYWFkNWQxYzYxMTM4ZjBiM2ZkZWQ4MyIsInN1YiI6IjY1NGE2YWE0NmJlYWVhMDE0YjY5YmEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RAp4YuNKXT0gyW8M0AhMQl2tIGrfPxe4jvUjxe4N-PY",
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${searchTerm}`,
    options
  );

  if (!response.ok) {
    throw json({
      message: "An error occured!",
      desc: "Failed to search this phrase. Please try again later.",
    },
    { status: 500 });
  }

  const responseData = await response.json();

  return { results: responseData, title: searchTerm };

}
