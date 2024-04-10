import { Form } from "react-router-dom";

import classes from './SearchTermForm.module.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchTermForm = () => {
    return (
        <Form className={classes.searcherForm} action="/search">
        <FontAwesomeIcon icon={faSearch} className={classes["searcher-icon"]} />
        <input
          type="text"
          name="query"
          placeholder="Enter the name of the series, movie or actor..."
        />
        <button type="submit">GO</button>
      </Form>
    )
}

export default SearchTermForm;