import ResultItem from "./result-item";
import classes from "./ResultsContainer.module.css";

export default function ResultsContainer({ results }) {
  const isSearched = results !== undefined;
  const isResults = results?.total_results > 0;

  return (
    <>
      {isSearched && !isResults && (
        <p className={classes.noResult}>No movies found with these filters.</p>
      )}
      {(!isSearched || !isResults) && (
        <>
          <div className={classes.default}>
            <span>D</span>
            <span>i</span>
            <span>s</span>
            <span>c</span>
            <span>o</span>
            <span>v</span>
            <span>e</span>
            <span>r</span>
          </div>
          <p className={classes.default_p}>
            Find movies using filters and sort options.
          </p>
        </>
      )}
      {results?.total_results > 0 && (
        <div className={classes["results-container"]}>
          <div className={classes["results-numbers"]}>
            Results: <b>{results.total_results}</b> | Pages:{" "}
            <b>{results.total_pages}</b>
          </div>
          <div className={classes["results-items"]}>
            {results.results.map((result) => (
              <ResultItem
                key={result.id}
                id={result.id}
                logo={result.poster_path}
                title={result.title}
                description={result.overview}
                rating={Math.round(result.vote_average)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
