import { useSearchParams } from "react-router-dom";
import classes from "./ResultsContent.module.css";

import CategoryMenu from "./CategoryMenu";
import MoviesSection from "./MoviesSection";
import SeriesSection from "./SeriesSection";
import PeopleSection from "./PeopleSection";

const ResultsContent = ({ results, title }) => {
  
  let [searchParams, setSearchParams] = useSearchParams();
  let categoryNr = parseInt(searchParams.get("category")) || 1

  const changeCategoryHandle = (value) => {
    if (categoryNr !== value) {
      setSearchParams(`query=${searchParams.get("query")}&category=${value}`);
    }
  };

  return (
    <div className={classes.resultsContent}>
      <h3>
        Search results for: <b>{title}</b>
      </h3>
      <CategoryMenu
        results={results}
        categoryNr={categoryNr}
        onChangeCategory={changeCategoryHandle}
      />
      {categoryNr === 1 && <MoviesSection movies={results.movies.results} />}
      {categoryNr === 2 && <SeriesSection series={results.series.results} />}
      {categoryNr === 3 && <PeopleSection people={results.people.results} />}
    </div>
  );
};

export default ResultsContent;
