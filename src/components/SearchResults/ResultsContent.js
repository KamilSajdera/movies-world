import classes from "./ResultsContent.module.css";

import CategoryMenu from "./CategoryMenu";

const ResultsContent = ({ results, title }) => {
 
  return (
    <div className={classes.resultsContent}>
      <h3>
        Search results for: <b>{title}</b>
      </h3>
      <CategoryMenu results={results} />
    </div>
  );
};

export default ResultsContent;
