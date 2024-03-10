import { useLoaderData, json } from "react-router-dom";

import PagesWrapper from "../ui/PagesWrapper/PagesWrapper";

const UpcomingPage = () => {
  const data = useLoaderData();
  return <PagesWrapper movies={data.results} title="Upcoming movies" />;
};

export default UpcomingPage;

export async function loader() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDE2OTgxZDhmYWFkNWQxYzYxMTM4ZjBiM2ZkZWQ4MyIsInN1YiI6IjY1NGE2YWE0NmJlYWVhMDE0YjY5YmEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RAp4YuNKXT0gyW8M0AhMQl2tIGrfPxe4jvUjxe4N-PY",
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
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${minFormattedDate}&primary_release_date.lte=${maxFormattedDate}`,
    options
  );

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch upcoming page",
        desc: "Something went wrong while loading the upcoming page. Check the correctness of the link.",
      },
      { status: 500 }
    );
  } else return response;
}
