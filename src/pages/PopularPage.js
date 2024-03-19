import { useLoaderData, json } from "react-router-dom";

import PagesWrapper from "../ui/PagesWrapper/PagesWrapper";

const PopularPage = () => {
  const data = useLoaderData();

  return <PagesWrapper movies={data.results} totalPages={data.total_pages} title="Popular movies" />;
};

export const loader = async ({params, request}) => {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get('page') || 1;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
      `Bearer ${process.env.REACT_APP_BEARER_KEY}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?page=${page}`,
    options
  );

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch popular movies page.",
        desc: "Something went wrong while loading the popular movies page. Check the correctness of the link.",
      },
      { status: 500 }
    );
  } else return response;
};

export default PopularPage;
