import { useEffect, useState } from "react";
import { json, useActionData, useLoaderData } from "react-router-dom";

import FiltersContainer from "../components/DiscoverPage/FiltersContainer";
import ResultsContainer from "../components/DiscoverPage/ResultsContainer";
import ErrorBlock from "../ui/ErrorBlock";

const DiscoverPage = () => {
  const languagesFetchData = useLoaderData();
  const filteredResults = useActionData();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (filteredResults?.errorMessage) {
      setIsError(true);
      const timer = setTimeout(() => {
        setIsError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [filteredResults]);

  const languagesArray = languagesFetchData.map((lang, index) => ({
    id: index,
    name: lang.english_name,
    short: lang.iso_639_1,
  }));

  return (
    <>
      {isError && <ErrorBlock message={filteredResults?.errorMessage} />}
      <FiltersContainer langs={languagesArray} />
      <ResultsContainer results={filteredResults} />
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
    sort: formData.get("sort_option") || "popularity.desc",
    min_rated: formData.get("min_rated"),
    min_user_votes: formData.get("min_user_votes"),
    with_keywords: formData.get("with_keywords").split(/\s+/).join(""),
  };

  if (
    parseInt(filterData.min_rated) < 0 ||
    parseInt(filterData.min_rated) > 10
  ) {
    return {
      errorMessage: "Value in min. rated input should be in 0-10 range.",
    };
  }

  if (
    parseInt(filterData.min_user_votes) < 0 ||
    parseInt(filterData.min_user_votes) > 500
  ) {
    return {
      errorMessage: "Value in min. user votes input should be in 0-500 range.",
    };
  }

  if (filterData.release_start > filterData.release_end) {
    return {
      errorMessage:
        "Start release date cannot be grather than end release date.",
    };
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_BEARER_KEY}`,
    },
  };

  let url = `https://api.themoviedb.org/3/discover/movie?&language=en-US&page=1&sort_by=${filterData.sort}`;

  if (filterData.genres.length > 0)
    url += `&with_genres=${filterData.genres.toString()}`;

  if (filterData.release_start.length > 0)
    url += `&primary_release_date.gte=${filterData.release_start}`;

  if (filterData.release_end.length > 0)
    url += `&primary_release_date.lte=${filterData.release_end}`;

  if (filterData.language.length > 0)
    url += `&with_original_language=${filterData.language}`;

  if (filterData.min_rated.trim().length > 0)
    url += `&vote_average.gte=${filterData.min_rated}`;

  if (filterData.min_user_votes.trim().length > 0)
    url += `&vote_count.gte=${filterData.min_user_votes}`;

  if (filterData.with_keywords.trim().length > 0)
    url += `&with_keywords=${filterData.with_keywords}`;

  const response = await fetch(url, options);

  return response;
}
