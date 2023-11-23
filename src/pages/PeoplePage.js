import { useLoaderData } from "react-router-dom";

import PeopleList from "../components/PeoplePage/PeopleList";
import noImage from "../assets/people/noImage.png";

const PeoplePage = () => {
  const data = useLoaderData();
  const fetchedPeopleList = data.results;
  const trendingPeopleList = [];

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
      films: person.known_for.length > 0 ? 
      [
        {
          id: person.known_for[0].id,
          title:
            person.known_for[0].title === undefined
              ? person.known_for[0].name
              : person.known_for[0].title,
        },
        {
          id: person.known_for[1].id,
          title:
            person.known_for[1].title === undefined
              ? person.known_for[1].name
              : person.known_for[1].title,
        },
        {
          id: person.known_for[2].id,
          title:
            person.known_for[2].title === undefined
              ? person.known_for[2].name
              : person.known_for[2].title,
        },
      ]
      : [],
    };

    trendingPeopleList.push(personData);
  }

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
