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
          <span style={{color: "#717171"}}>None selected</span>
        </span>
        <span className={classes.arrow}></span>
      </button>
      <ul
        className={classes["select-dropdown"]}
        role="listbox"
        id="select-dropdown"
        ref={optionListRef}
      >
        <li role="option">
          <input type="radio" id="github" name="social-account" />
          <label htmlFor="github">Title [A-Z]</label>
        </li>
        <li role="option">
          <input type="radio" id="github" name="social-account" />
          <label htmlFor="github">Title [Z-A]</label>
        </li>
        <li role="option">
          <input type="radio" id="github" name="social-account" />
          <label htmlFor="github">Popularity descending</label>
        </li>
        <li role="option">
          <input type="radio" id="instagram" name="social-account" />
          <label htmlFor="instagram">Popularity ascending</label>
        </li>
        <li role="option">
          <input type="radio" id="facebook" name="social-account" />
          <label htmlFor="facebook">Rating descending</label>
        </li>
        <li role="option">
          <input type="radio" id="linkedIn" name="social-account" />
          <label htmlFor="linkedIn">Rating ascending</label>
        </li>
        <li role="option">
          <input type="radio" id="twitter" name="social-account" />
          <label htmlFor="twitter">Release date descending</label>
        </li>
        <li role="option">
          <input type="radio" id="reddit" name="social-account" />
          <label htmlFor="reddit">Release date ascending</label>
        </li>
      </ul>
    </div>
  );
}
