import classes from "./ResultsContent.module.css";

import CategoryMenu from "./CategoryMenu";
import MoviesSection from "./MoviesSection";

const ResultsContent = ({ results, title }) => {
 
  return (
    <div className={classes.resultsContent}>
      <h3>
        Search results for: <b>{title}</b>
      </h3>
      <CategoryMenu results={results} />
      <MoviesSection movies={results.movies.results} />
    </div>
  );
};

export default ResultsContent;
