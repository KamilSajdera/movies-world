import { useEffect, useState } from "react";
import { json, useLoaderData } from "react-router-dom";

import FiltersContainer from "../components/DiscoverPage/FiltersContainer";
import ResultsContainer from "../components/DiscoverPage/ResultsContainer";
import ErrorBlock from "../ui/ErrorBlock";

const DiscoverPage = () => {
  const fetchedData = useLoaderData();
  const [isError, setIsError] = useState(false);

  const languagesArray = fetchedData?.availableLangs?.map((lang, index) => ({
    id: index,
    name: lang.english_name,
    short: lang.iso_639_1,
  }));

  useEffect(() => {
    if (fetchedData?.errorMessage) {
      setIsError(true);
      const timer = setTimeout(() => {
        setIsError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [fetchedData]);

  return (
    <>
      {isError && <ErrorBlock message={fetchedData?.errorMessage} />}
      <FiltersContainer langs={languagesArray} />
      <ResultsContainer results={fetchedData.data} />
    </>
  );
};

export default DiscoverPage;

export const loader = async ({ request }) => {
  let url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_BEARER_KEY}`,
    },
  };

  const responseLangs = await fetch(
    `https://api.themoviedb.org/3/configuration/languages`,
    options
  );

  if (!responseLangs.ok) {
    throw json(
      {
        message: "Could not fetch discover page.",
        desc: "The data needed to load this page cannot be fetched. Please try again later.",
      },
      { status: 500 }
    );
  }

  let filterData = {
    genres: url?.searchParams?.getAll("genres") || [],
    release_start: url?.searchParams?.get("release_from") || "",
    release_end: url?.searchParams?.get("release_to") || "",
    language: url?.searchParams?.get("language") || "",
    sort: url?.searchParams?.get("sort_option") || "popularity.desc",
    min_rated: url?.searchParams?.get("min_rated") || 0,
    min_user_votes: url?.searchParams?.get("min_user_votes") || 0,
    with_keywords: url?.searchParams?.get("with_keywords") || "",
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

  let urlFetch = `https://api.themoviedb.org/3/discover/movie?&language=en-US&page=${page}&sort_by=${filterData.sort}`;

  if (filterData?.genres.length > 0)
    urlFetch += `&with_genres=${filterData.genres.toString()}`;

  if (filterData.release_start.length > 0)
    urlFetch += `&primary_release_date.gte=${filterData.release_start}`;

  if (filterData.release_end.length > 0)
    urlFetch += `&primary_release_date.lte=${filterData.release_end}`;

  if (filterData.language.length > 0)
    urlFetch += `&with_original_language=${filterData.language}`;

  if (filterData.min_rated.length > 0)
    urlFetch += `&vote_average.gte=${filterData.min_rated}`;

  if (filterData.min_user_votes.length > 0)
    urlFetch += `&vote_count.gte=${filterData.min_user_votes}`;

  if (filterData.with_keywords.length > 0)
    urlFetch += `&with_keywords=${filterData.with_keywords}`;

  const responseFilteredData = await fetch(urlFetch, options);

  if (!responseFilteredData.ok) {
    throw json(
      {
        message: "Could not fetch discover page.",
        desc: "The filtered data cannot be fetched. Please try again later.",
      },
      { status: 500 }
    );
  }

  const resLangs = await responseLangs.json();
  const resData = await responseFilteredData.json();

  return { availableLangs: resLangs, data: resData };
};
