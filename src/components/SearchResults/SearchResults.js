import DefaultContent from "./DefaultContent";
import ResultsContent from "./ResultsContent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import classes from "./SearchResults.module.css";

const SearchResults = ({ title, results }) => {
  let content;

  if (!title) content = <DefaultContent />;
  if (results && title) content = <ResultsContent title={title} results={results} />;
  if (title?.trim().length > 0 && results?.total_results === 0)
    content = (
      <>
        <div className={classes.noResults}><FontAwesomeIcon icon={faX} /><p>Sorry, we could not find any results for <b>{title}</b></p></div>
        <DefaultContent />
      </>
    );

  return <div className={classes.resultsContainer}>{content}</div>;
};

export default SearchResults;
