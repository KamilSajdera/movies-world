import { json, useLoaderData } from "react-router-dom";
import FiltersContainer from "../components/DiscoverPage/FiltersContainer";
import ResultsContainer from "../components/DiscoverPage/ResultsContainer";

const DiscoverPage = () => {
  const languagesFetchData = useLoaderData();
  let languagesArray = [];

  for (const index in languagesFetchData) {
    const langItem = {
      id: index,
      name: languagesFetchData[index].english_name,
      short: languagesFetchData[index].iso_639_1,
    };

    languagesArray.push(langItem);
  }

  return (
    <>
      <FiltersContainer langs={languagesArray} />
      <ResultsContainer />
    </>
  );
};

export default DiscoverPage;

export const loader = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_BEARER_KEY}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/configuration/languages`,
    options
  );

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch discover page.",
        desc: "The data needed to load this page cannot be fetched. Please try again later.",
      },
      { status: 500 }
    );
  }

  return response;
};

export async function action({ request }) {
  let formData = await request.formData();

  let filterData = {
    genres: formData.getAll("genres"),
    release_start: formData.get("release_from"),
    release_end: formData.get("release_to"),
    language: formData.get("language").trim(),
    sort: formData.get("sort_option"),
    min_rated: formData.get("min_rated"),
    min_user_votes: formData.get("min_user_votes"),
    with_people: formData.get("with_people").trim(),
  };

  return {};
}
