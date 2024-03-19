import { useLoaderData, json } from "react-router-dom";

import PagesWrapper from "../ui/PagesWrapper/PagesWrapper";

const UpcomingPage = () => {
  const data = useLoaderData();
  return <PagesWrapper movies={data.results} totalPages={data.total_pages} title="Upcoming movies" />;
};

export default UpcomingPage;

export async function loader({params, request}) {
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

  const todayDate = new Date();
  const minDate = new Date(todayDate);
  const maxDate = new Date(todayDate);

  minDate.setDate(todayDate.getDate() - 5);
  maxDate.setDate(todayDate.getDate() + 210);
  
  const minFormattedDate = `${minDate.getFullYear()}-${minDate.getMonth()+1 < 10 ? `0${minDate.getMonth()+1}` : minDate.getMonth()+1}-${minDate.getDate() < 10 ? `0${minDate.getDate()}` : minDate.getDate()}`
  const maxFormattedDate = `${maxDate.getFullYear()}-${maxDate.getMonth()+1 < 10 ? `0${maxDate.getMonth()+1}` : maxDate.getMonth()+1}-${maxDate.getDate() < 10 ? `0${maxDate.getDate()}` : maxDate.getDate()}`

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_date.gte=${minFormattedDate}&primary_release_date.lte=${maxFormattedDate}`,
    options
  );

  if (!response.ok) {
    const responseError = await response.json();
    throw json(
      {
        message: "Something went wrong while loading the upcoming page.",
        desc: responseError.status_message
      },
      { status: 500 }
    );
  } else return response;
}
