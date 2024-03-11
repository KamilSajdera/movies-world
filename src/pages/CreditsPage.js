import { useLoaderData, json } from "react-router-dom";

import CreditsMain from "../components/credits/CreditsMain";

const CreditsPage = () => {
  const data = useLoaderData();
  return <CreditsMain credits={data}/>;
};

export async function loader({request, params}) {

  const searchParams = new URL(request.url).searchParams;
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${process.env.REACT_APP_BEARER_KEY}`,
    },
  };

  let url;

  if(type === "1")
    url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  
  if(type === "2") 
    url = `https://api.themoviedb.org/3/tv/${id}/aggregate_credits`;

  const response = await fetch(url, options);

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch credits page.",
        desc: "Something went wrong while loading the credits page. Check the correctness of the link.",
      },
      { status: 500 }
    );
  }
  return response;
}

export default CreditsPage;
