import { Form } from "react-router-dom";

import classes from "./FiltersContainer.module.css";
import SortOptions from "./SortOptions";
import LanguageChoice from "./LanguageChoice";

export default function FiltersContainer({langs}) {
  
  return (
    <section className={classes.filtersContainer}>
      <div className={classes.label}>Filters</div>
      <Form method="POST" action="/discover">
        <div className={classes["filter-category"]}>
          <h4>Genres</h4>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="28"
              className={classes["checkbox"]}
            />
            <span>Action</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="12"
              className={classes["checkbox"]}
            />
            <span>Adventure</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="16"
              className={classes["checkbox"]}
            />
            <span>Animation</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="35"
              className={classes["checkbox"]}
            />
            <span>Comedy</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="80"
              className={classes["checkbox"]}
            />
            <span>Crime</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="99"
              className={classes["checkbox"]}
            />
            <span>Documentary</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="18"
              className={classes["checkbox"]}
            />
            <span>Drama</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="10751"
              className={classes["checkbox"]}
            />
            <span>Family</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="14"
              className={classes["checkbox"]}
            />
            <span>Fantasy</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="36"
              className={classes["checkbox"]}
            />
            <span>History</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="27"
              className={classes["checkbox"]}
            />
            <span>Horror</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="10402"
              className={classes["checkbox"]}
            />
            <span>Music</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="9648"
              className={classes["checkbox"]}
            />
            <span>Mystery</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="53"
              className={classes["checkbox"]}
            />
            <span>Thriller</span>
          </label>
          <label className={classes["filter_item"]}>
            <input
              type="checkbox"
              name="genres"
              value="10752"
              className={classes["checkbox"]}
            />
            <span>War</span>
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
            <LanguageChoice langs={langs} />
          </div>
        </div>
        <div className={classes["filter-category"]}>
          <h4>Sort</h4>
          <SortOptions />
        </div>
        <div
          className={`${classes["filter-category"]} ${classes["three_items"]}`}
        >
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
        <div
          className={`${classes["filter-category"]} ${classes["three_items"]}`}
        >
          <h4>Min. user votes</h4>
          <div className={classes.inputBox}>
            <input
              name="min_user_votes"
              placeholder="(0-500)"
              min={0}
              max={500}
              type="number"
            />
          </div>
        </div>
        <div className={classes["filter-category"]}>
          <h4>Keywords</h4>
          <div className={classes.inputBox}>
            <input
              name="with_keywords"
              placeholder="Keywords separate by comma"
              type="text"
            />
          </div>
        </div>
        <button type="submit" className={classes.submitBtn}>
          Search
        </button>
      </Form>
    </section>
  );
}
