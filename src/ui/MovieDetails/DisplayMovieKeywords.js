import classes from "./DisplayMovieKeywords.module.css";

const DisplayMovieKeywords = ({ keywords }) => {
  return (
    <div className={classes.movieKeywords}>
      <h1>Keywords</h1>
      {keywords.map((item) => (
        <div className={classes["keyword-item"]} key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default DisplayMovieKeywords;
