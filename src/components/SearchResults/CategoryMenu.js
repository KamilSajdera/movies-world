import classes from "./CategoryMenu.module.css";

const CategoryMenu = (props) => {
  const { results, categoryNr } = props;

  return (
    <div className={classes.results_category}>
      <div
        className={`${classes["category-item"]} ${
          categoryNr === 1 ? classes.category_active : ""
        }`}
        onClick={() => props.onChangeCategory(1)}
      >
        Movies
        <span className={classes["category-amout"]}>
          {results.movies.total_results}
        </span>
      </div>
      <div
        className={`${classes["category-item"]} ${
          categoryNr === 2 ? classes.category_active : ""
        }`}
        onClick={() => props.onChangeCategory(2)}
      >
        Series
        <span className={classes["category-amout"]}>
          {results.series.total_results}
        </span>
      </div>
      <div
        className={`${classes["category-item"]} ${
          categoryNr === 3 ? classes.category_active : ""
        }`}
        onClick={() => props.onChangeCategory(3)}
      >
        People
        <span className={classes["category-amout"]}>
          {results.people.total_results}
        </span>
      </div>
    </div>
  );
};

export default CategoryMenu;
