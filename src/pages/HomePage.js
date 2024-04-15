import { json, useLoaderData } from "react-router-dom";
import Home from "../components/Home/Home";

const HomePage = () => {
  const data = useLoaderData();
  return <Home trendingArray={data.results} />
};

export default HomePage;

export async function loader() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_BEARER_KEY}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day`,
    options
  );

  if (!response.ok)
    throw json(
      {
        message: "Could not fetch HomePage",
        desc: "Something went wrong while loading the home page. Check the correctness of the link.",
      },
      { status: 500 }
    );

  return response;
}
