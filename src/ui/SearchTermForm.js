import { Form } from "react-router-dom";

import classes from './SearchTermForm.module.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchTermForm = ({placeholder}) => {
    return (
        <Form className={classes.searcherForm} action="/search">
        <FontAwesomeIcon icon={faSearch} className={classes["searcher-icon"]} />
        <input
          type="text"
          name="query"
          placeholder={placeholder}
        />
        <button type="submit">GO</button>
      </Form>
    )
}

export default SearchTermForm;