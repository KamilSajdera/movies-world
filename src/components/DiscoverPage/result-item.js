import { useNavigate } from "react-router-dom";

import classes from "./result-item.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ResultItem({ title, logo, description, rating, id }) {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(
      `/movie?id=${id}-${title.toLowerCase().replace(/\s+/g, "-").trim()}`
    );
  }

  return (
    <div className={classes["result_item"]} onClick={handleNavigate}>
      <img src={`https://image.tmdb.org/t/p/w500${logo}`} alt={title} />
      <div className={classes["result_data"]}>
        <h4>{title}</h4>
        <div className={classes.rating}>
          <FontAwesomeIcon icon={faStar} />
          <p>{rating}</p>
        </div>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
}
