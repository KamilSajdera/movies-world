import classes from "./FiltersContainer.module.css";
import SortOptions from "./SortOptions";

export default function FiltersContainer() {
  return (
    <section className={classes.filtersContainer}>
      <div className={classes.label}>Filters</div>
      <form>
        <div className={classes["filter-category"]}>
          <h4>Genres</h4>
          <div className={classes["filter_item"]}>Action</div>
          <div className={classes["filter_item"]}>Adventure</div>
          <div className={classes["filter_item"]}>Comedy</div>
          <div className={classes["filter_item"]}>Family</div>
          <div className={classes["filter_item"]}>Fantasy</div>
          <div className={classes["filter_item"]}>History</div>
          <div className={classes["filter_item"]}>Music</div>
          <div className={classes["filter_item"]}>Thriller</div>
          <div className={classes["filter_item"]}>Horror</div>
          <div className={classes["filter_item"]}>Drama</div>
          <div className={classes["filter_item"]}>Mystery</div>
        </div>
        <div className={classes["filter-category"]}>
          <h4>Release dates</h4>
          <div className={classes.inputBox}>
            <label htmlFor="release_from">from</label>
            <input name="release_from" type="date" />
          </div>
          <div className={classes.inputBox}>
            <label htmlFor="release_to">to</label>
            <input name="release_to" type="date" />
          </div>
        </div>
        <div className={classes["filter-category"]}>
          <h4>Language</h4>
          <div className={classes.inputBox}>
            <input name="language" placeholder="None selected" type="text" />
          </div>
        </div>
        <div className={classes["filter-category"]}>
          <h4>Sort</h4>
          <SortOptions />
        </div>
        <div className={classes["filter-category"]}>
          <h4>Min. rated</h4>
          <div className={classes.inputBox}>
            <input
              name="min_rated"
              placeholder="(0-10)"
              min={0}
              max={10}
              type="number"
            />
          </div>
        </div>
        <div className={classes["filter-category"]}>
          <h4>Min. user votes</h4>
          <div className={classes.inputBox}>
            <input
              name="min_user_votes"
              placeholder="(0-500)"
              min={0}
              max={50}
              type="number"
            />
          </div>
        </div>
      </form>
    </section>
  );
}
