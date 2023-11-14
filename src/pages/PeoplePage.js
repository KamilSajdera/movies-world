import { useLoaderData } from "react-router-dom";

import PeopleList from "../components/PeoplePage/PeopleList";

const PeoplePage = () => {
  const data = useLoaderData();
  const trendingPeopleList = data.results;

  return <PeopleList trendingPeople={trendingPeopleList} />;
};

const loader = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDE2OTgxZDhmYWFkNWQxYzYxMTM4ZjBiM2ZkZWQ4MyIsInN1YiI6IjY1NGE2YWE0NmJlYWVhMDE0YjY5YmEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RAp4YuNKXT0gyW8M0AhMQl2tIGrfPxe4jvUjxe4N-PY",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/trending/person/day?language=en-US",
    options
  );
  return response;
};

export { PeoplePage, loader };
