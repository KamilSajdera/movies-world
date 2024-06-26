import { useLoaderData, json, useNavigate } from "react-router-dom";

import PeopleList from "../components/PeoplePage/PeopleList";
import PaginationSelection from "../ui/PaginationSelection";
import noImage from "../assets/people/noProfileImage.png";

const PeoplePage = () => {
  const data = useLoaderData();
  const fetchedPeopleList = data.results;
  const trendingPeopleList = [];
  const totalPages = 500;

  const navigate = useNavigate();

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

  function changePageHandler(nr) {
    navigate("?page=" + nr);
  }

  return (
    <>
      <PaginationSelection
        totalPages={totalPages}
        onChangePage={changePageHandler}
      />
      <PeopleList trendingPeople={trendingPeopleList} currentPage={data.page} />
      <PaginationSelection
        totalPages={totalPages}
        onChangePage={changePageHandler}
      />
    </>
  );
};

const loader = async ({ request, params }) => {
  const searchParams = new URL(request.url).searchParams;
  const pageNumber = searchParams.get("page") || 1;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_BEARER_KEY}`,
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
