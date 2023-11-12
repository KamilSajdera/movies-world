import { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import classes from "./InputSearch.module.css";

const InputSearch = () => {
  const inputBottomBarRef = useRef(null);

  const focusHandle = () => {
    inputBottomBarRef.current.classList.remove(classes.inputBarHasBlur);
    inputBottomBarRef.current.classList.add(classes.inputBarHasFocus);
  };

  const blurHandle = () => {
    inputBottomBarRef.current.classList.remove(classes.inputBarHasFocus);
    inputBottomBarRef.current.classList.add(classes.inputBarHasBlur);
  };

  return (
    <form className={classes.searcher}>
      <label htmlFor="userSearch">
        <FontAwesomeIcon icon={faSearch} className={classes["searcher-icon"]} />
      </label>
      <input
        type="text"
        placeholder="Show movie, serial, actor..."
        name="userSearch"
        onFocus={focusHandle}
        onBlur={blurHandle}
      />
      <div className={classes.inputBar} ref={inputBottomBarRef}></div>
    </form>
  );
};

export default InputSearch;
