import DefaultContent from "./DefaultContent";
import classes from "./SearchResults.module.css";

const SearchResults = ({ results }) => {
  let content;

  if (!results) content = <DefaultContent />

  return <div className={classes.resultsContainer}>
    {content}
  </div>
};

export default SearchResults;
