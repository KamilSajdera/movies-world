import classes from "./FiltersContainer.module.css";
import SortOptions from "./SortOptions";

export default function FiltersContainer() {
  return (
    <section className={classes.filtersContainer}>
      <div className={classes.label}>Filters</div>
      <form>
        <div className={classes["filter-category"]}>
          <h4>Genres</h4>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="Action"
              className={classes["checkbox"]}
            />
            <span>Action</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="Adventure"
              className={classes["checkbox"]}
            />
            <span>Adventure</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="Comedy"
              className={classes["checkbox"]}
            />
            <span>Comedy</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="Family"
              className={classes["checkbox"]}
            />
            <span>Family</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="Fantasy"
              className={classes["checkbox"]}
            />
            <span>Fantasy</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="History"
              className={classes["checkbox"]}
            />
            <span>History</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="Music"
              className={classes["checkbox"]}
            />
            <span>Music</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="Thriller"
              className={classes["checkbox"]}
            />
            <span>Thriller</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="Horror"
              className={classes["checkbox"]}
            />
            <span>Horror</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="Drama"
              className={classes["checkbox"]}
            />
            <span>Drama</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="Mystery"
              className={classes["checkbox"]}
            />
            <span>Mystery</span>
          </label>
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
        <button type="submit" className={classes.submitBtn}>Search</button>
      </form>
    </section>
  );
}