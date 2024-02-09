import { useRef } from "react";
import { Form } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import classes from "./InputSearch.module.css";

const InputSearch = () => {
  const inputBottomBarRef = useRef(null);
  const userSearchTermRef = useRef();

  const focusHandle = () => {
    inputBottomBarRef.current.classList.remove(classes.inputBarHasBlur);
    inputBottomBarRef.current.classList.add(classes.inputBarHasFocus);
  };

  const blurHandle = () => {
    inputBottomBarRef.current.classList.remove(classes.inputBarHasFocus);
    inputBottomBarRef.current.classList.add(classes.inputBarHasBlur);
  };

  return (
    <Form className={classes.searcher} action="/search">
      <label htmlFor="query">
        <FontAwesomeIcon icon={faSearch} className={classes["searcher-icon"]} />
      </label>
      <input
        type="text"
        placeholder="Show movie, serial, actor..."
        name="query"
        onFocus={focusHandle}
        onBlur={blurHandle}
        ref={userSearchTermRef}
      />
      <div className={classes.inputBar} ref={inputBottomBarRef}></div>
    </Form>
  );
};

export default InputSearch;
