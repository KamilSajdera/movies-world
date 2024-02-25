import { useSearchParams } from "react-router-dom";
import classes from "./ResultsContent.module.css";

import CategoryMenu from "./CategoryMenu";
import MoviesSection from "./MoviesSection";
import SeriesSection from "./SeriesSection";
import PeopleSection from "./PeopleSection";
import PaginationBox from "./PaginationBox";

const ResultsContent = ({ results, title }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let categoryNr = parseInt(searchParams.get("category")) || 1;

  const changeCategoryHandle = (value) => {
    if (categoryNr !== value) {
      setSearchParams(`query=${searchParams.get("query")}&category=${value}`);
    }
  };

  const totalPages =
    categoryNr === 1
      ? results.movies.total_pages
      : categoryNr === 2
      ? results.series.total_pages
      : results.people.total_pages;

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
      <PaginationBox totalPages={totalPages} />
      {categoryNr === 1 && <MoviesSection movies={results.movies.results} />}
      {categoryNr === 2 && <SeriesSection series={results.series.results} />}
      {categoryNr === 3 && <PeopleSection people={results.people.results} />}
      <PaginationBox totalPages={totalPages} />
    </div>
  );
};

export default ResultsContent;
