import { useLoaderData, json } from "react-router-dom";

import PeopleList from "../components/PeoplePage/PeopleList";
import Pagination from "../components/PeoplePage/Pagination";
import noImage from "../assets/people/noImage.png";

const PeoplePage = () => {
  const data = useLoaderData();
  const fetchedPeopleList = data.results;
  const trendingPeopleList = [];
  const currentPage = data.page;

  for (const index in fetchedPeopleList) {
    const person = fetchedPeopleList[index];

    const personData = {
      id: person.id,
      name: person.original_name,
      image:
        person.profile_path === null
          ? noImage
          : `https://image.tmdb.org/t/p/w500${person.profile_path}`,
      profession: person.known_for_department,
      popularity: person.popularity,
      films:
        person.known_for.length > 0
          ? {
              id: person.known_for[0].id,
              title:
                person.known_for[0].title === undefined
                  ? person.known_for[0].name
                  : person.known_for[0].title,
            }
          : {},
    };

    trendingPeopleList.push(personData);
  }

  return (
    <>
      <Pagination currentPage={currentPage} />
      <PeopleList
        trendingPeople={trendingPeopleList}
        currentPage={currentPage}
      />
      <Pagination currentPage={currentPage} />
    </>
  );
};

const loader = async ({ request, params }) => {
  const searchParams = new URL(request.url).searchParams;
  const pageNumber = searchParams.get('page') || 1;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDE2OTgxZDhmYWFkNWQxYzYxMTM4ZjBiM2ZkZWQ4MyIsInN1YiI6IjY1NGE2YWE0NmJlYWVhMDE0YjY5YmEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RAp4YuNKXT0gyW8M0AhMQl2tIGrfPxe4jvUjxe4N-PY",
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/person/popular?language=en-US&page=${pageNumber}`,
    options
  );

  if (!response.ok)
    throw json(
      {
        message: "Could not fetch people page",
        desc: "Something went wrong while loading the people page. Check the correctness of the link.",
      },
      { status: 500 }
    );

  return response;
};

export { PeoplePage, loader };
