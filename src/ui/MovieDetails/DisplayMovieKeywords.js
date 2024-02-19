import classes from "./DisplayMovieKeywords.module.css";

const DisplayMovieKeywords = ({ keywords }) => {
  return (
    <div className={classes.movieKeywords}>
      <h1>Keywords</h1>
      {keywords.length > 0 &&
        keywords.map((item) => (
          <div className={classes["keyword-item"]} key={item.id}>
            {item.name}
          </div>
        ))}
      {keywords.length === 0 && <p>No keywords here.</p>}
    </div>
  );
};

export default DisplayMovieKeywords;
