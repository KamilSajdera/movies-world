import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./ResultsContent.module.css";

import CategoryMenu from "./CategoryMenu";
import MoviesSection from "./MoviesSection";
import SeriesSection from "./SeriesSection";
import PeopleSection from "./PeopleSection";
import PaginationSelection from "../../ui/PaginationSelection";

const ResultsContent = ({ results, title }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState(new URLSearchParams(location.search));
  const categoryNr = parseInt(searchParams.get("category")) || 1;
  const pageNumber = parseInt(searchParams.get("page")) || 1;

  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    setSearchParams(new URLSearchParams(location.search));
  }, [location.search]);

  const changeCategoryHandle = (value) => {
    if (categoryNr !== value) {
      params.set("category", value);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({ path: newUrl }, "", newUrl);

      if (pageNumber > 1) {
        params.delete("page");
        navigate(`?${params.toString()}`);
      } else setSearchParams(params);
    }
  };

  const totalPages =
    categoryNr === 1
      ? results.movies.total_pages
      : categoryNr === 2
      ? results.series.total_pages
      : results.people.total_pages;

  const changePageHandler = (value) => {
    params.delete("page");
    const newUrl = `?${params.toString()}&page=${value}`;
    navigate(newUrl);
  };

  return (
    <div className={classes.resultsContent}>
      <h3>
        Search results for: <b>{title}</b>
      </h3>
      <CategoryMenu
        totalMovies={results.movies.total_results}
        totalSeries={results.series.total_results}
        totalPeople={results.people.total_results}
        categoryNr={categoryNr}
        onChangeCategory={changeCategoryHandle}
      />
      <PaginationSelection
        totalPages={totalPages}
        onChangePage={changePageHandler}
      />
      {categoryNr === 1 && <MoviesSection movies={results.movies.results} />}
      {categoryNr === 2 && <SeriesSection series={results.series.results} />}
      {categoryNr === 3 && <PeopleSection people={results.people.results} />}
      <PaginationSelection
        totalPages={totalPages}
        onChangePage={changePageHandler}
      />
      
    </div>
  );
};

export default ResultsContent;
