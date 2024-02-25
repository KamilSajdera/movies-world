import classes from "./CategoryMenu.module.css";

const CategoryMenu = (props) => {
  const { totalMovies, totalSeries, totalPeople, categoryNr } = props;

  return (
    <div className={classes.results_category}>
      <div
        className={`${classes["category-item"]} ${
          categoryNr === 1 ? classes.category_active : ""
        }`}
        onClick={() => props.onChangeCategory(1)}
      >
        Movies
        <span className={classes["category-amout"]}>{totalMovies}</span>
      </div>
      <div
        className={`${classes["category-item"]} ${
          categoryNr === 2 ? classes.category_active : ""
        }`}
        onClick={() => props.onChangeCategory(2)}
      >
        Series
        <span className={classes["category-amout"]}>{totalSeries}</span>
      </div>
      <div
        className={`${classes["category-item"]} ${
          categoryNr === 3 ? classes.category_active : ""
        }`}
        onClick={() => props.onChangeCategory(3)}
      >
        People
        <span className={classes["category-amout"]}>{totalPeople}</span>
      </div>
    </div>
  );
};

export default CategoryMenu;
