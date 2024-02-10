import classes from "./CategoryMenu.module.css";

const CategoryMenu = ({ results }) => {
  return (
    <div className={classes.results_category}>
      <div className={classes["category-item"]}>
        Movies
        <span className={classes["category-amout"]}>
          {results.movies.total_results}
        </span>
      </div>
      <div className={classes["category-item"]}>
        Series
        <span className={classes["category-amout"]}>
          {results.series.total_results}
        </span>
      </div>
      <div className={classes["category-item"]}>
        People
        <span className={classes["category-amout"]}>
          {results.people.total_results}
        </span>
      </div>
    </div>
  );
};

export default CategoryMenu;
