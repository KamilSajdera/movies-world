import { useEffect, useRef } from "react";
import classes from "./SortOptions.module.css";

export default function SortOptions() {
  const customSelectRef = useRef(null);
  const selectButtonRef = useRef(null);
  const selectedValueRef = useRef(null);
  const optionListRef = useRef(null);

  useEffect(() => {
    const selectButton = selectButtonRef.current;
    const customSelect = customSelectRef.current;
    const selectedValue = selectedValueRef.current;
    const optionList = optionListRef.current;

    const handleSelectClick = () => {
      customSelect.classList.toggle(classes.active);

      selectButton.setAttribute(
        "aria-expanded",
        selectButton.getAttribute("aria-expanded") === "true" ? "false" : "true"
      );
    };

    selectButton.addEventListener("click", handleSelectClick);

    const options = optionList.querySelectorAll("li");
    options.forEach((option) => {
      const handleOptionClick = (e) => {
        selectedValue.textContent = option.querySelector("label").textContent;
        customSelect.classList.remove(classes.active);
        selectButton.setAttribute("aria-expanded", "false");
      };

      option.addEventListener("click", handleOptionClick);
    });

    return () => {
      selectButton.removeEventListener("click", handleSelectClick);
      options.forEach((option) => {
        option.removeEventListener("click", null);
      });
    };
  }, []);

  return (
    <div className={classes["custom-select"]} ref={customSelectRef}>
      <button
        type="button"
        className={classes["select-button"]}
        role="combobox"
        aria-label="select button"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="select-dropdown"
        ref={selectButtonRef}
      >
        <span className={classes["selected-value"]} ref={selectedValueRef}>
          <span style={{ color: "#717171" }}>None selected</span>
        </span>
        <span className={classes.arrow}></span>
      </button>
      <ul
        className={classes["select-dropdown"]}
        role="listbox"
        id="select-dropdown"
        ref={optionListRef}
      >
        <li role="option" aria-selected>
          <input
            type="radio"
            id="titleAZ"
            name="sort_option"
            value="title.asc"
          />
          <label htmlFor="titleAZ">Title [A-Z]</label>
        </li>
        <li role="option" aria-selected>
          <input
            type="radio"
            id="titleZA"
            name="sort_option"
            value="title.desc"
          />
          <label htmlFor="titleZA">Title [Z-A]</label>
        </li>
        <li role="option" aria-selected>
          <input
            type="radio"
            id="popularity_des"
            name="sort_option"
            value="popularity.desc"
          />
          <label htmlFor="popularity_des">Popularity descending</label>
        </li>
        <li role="option" aria-selected>
          <input
            type="radio"
            id="popularity_asc"
            name="sort_option"
            value="popularity.asc"
          />
          <label htmlFor="popularity_asc">Popularity ascending</label>
        </li>
        <li role="option" aria-selected>
          <input
            type="radio"
            id="rating_des"
            name="sort_option"
            value="vote_average.desc"
          />
          <label htmlFor="rating_des">Rating descending</label>
        </li>
        <li role="option" aria-selected>
          <input
            type="radio"
            id="rating_asc"
            name="sort_option"
            value="vote_average.asc"
          />
          <label htmlFor="rating_asc">Rating ascending</label>
        </li>
        <li role="option" aria-selected>
          <input
            type="radio"
            id="rel_date_des"
            name="sort_option"
            value="primary_release_date.desc"
          />
          <label htmlFor="rel_date_des">Release date descending</label>
        </li>
        <li role="option" aria-selected>
          <input
            type="radio"
            id="rel_date_asc"
            name="sort_option"
            value="primary_release_date.asc"
          />
          <label htmlFor="rel_date_asc">Release date ascending</label>
        </li>
      </ul>
    </div>
  );
}
