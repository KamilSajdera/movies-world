import { Form } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import classes from "./SearchResults.module.css";

const DefaultContent = () => {   

  return (
    <>
      <Form className={classes.searcherForm}>
        <FontAwesomeIcon icon={faSearch} className={classes["searcher-icon"]} />
        <input
          type="text"
          name="query"
          placeholder="Enter the name of the series, movie or actor..."
        />
        <button type="submit">GO</button>
      </Form>
      <p className={classes.typeSomething}>
        Please enter a phrase and we will search our database.
      </p>
    </>
  );
};

export default DefaultContent;
