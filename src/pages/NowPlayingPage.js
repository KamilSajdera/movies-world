import { json, useLoaderData } from "react-router-dom";
import PagesWrapper from "../ui/PagesWrapper/PagesWrapper";

const NowPlayingPage = () => {
  const data = useLoaderData();

  return (
    <PagesWrapper movies={data.results} totalPages={data.total_pages} title="Currently playing in cinemas" />
  );
};

export const loader = async ({params, request}) => {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get('page') || 1

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
      `Bearer ${process.env.REACT_APP_BEARER_KEY}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?page=${page}`,
    options
  );

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch now playing page",
        desc: "Something went wrong while loading the now playing page. Check the correctness of the link.",
      },
      { status: 500 }
    );
  } else return response;
};

export default NowPlayingPage;
