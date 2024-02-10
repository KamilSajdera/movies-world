import DefaultContent from "./DefaultContent";
import ResultsContent from "./ResultsContent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import classes from "./SearchResults.module.css";

const SearchResults = ({ title, results }) => {
  let content;

  const anyResults =
    results.movies.total_results +
      results.series.total_results +
      results.people.total_results >
    0;

  const hasTitle = title?.trim().length > 0;
  
  if (!hasTitle || !title) {
    content = <DefaultContent />;
  }

  if (results && title && hasTitle)
    content = <ResultsContent title={title} results={results} />;

  if (hasTitle && !anyResults)
    content = (
      <>
        <div className={classes.noResults}>
          <FontAwesomeIcon icon={faX} />
          <p>
            Sorry, we could not find any results for <b>{title}</b>
          </p>
        </div>
        <DefaultContent />
      </>
    );

  return <div className={classes.resultsContainer}>{content}</div>;
};

export default SearchResults;
