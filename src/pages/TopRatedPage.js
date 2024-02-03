import { json, useLoaderData } from "react-router-dom";
import PagesWrapper from "../ui/PagesWrapper/PagesWrapper";

const TopRatedPage = () => {
  const data = useLoaderData();

  return <PagesWrapper movies={data.results} title="Top rated movies" />;
};

export default TopRatedPage;

export async function loader() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDE2OTgxZDhmYWFkNWQxYzYxMTM4ZjBiM2ZkZWQ4MyIsInN1YiI6IjY1NGE2YWE0NmJlYWVhMDE0YjY5YmEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RAp4YuNKXT0gyW8M0AhMQl2tIGrfPxe4jvUjxe4N-PY",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated",
    options
  );

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch top rated page",
        desc: "Something went wrong while loading the top rated page. Check the correctness of the link.",
      },
      { status: 500 }
    );
  } else return response;
}
