import classes from "./IntroButtons.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlay } from "@fortawesome/free-solid-svg-icons";

const IntroButtons = ({ homepage, trailer }) => {
  return (
    <>
      <button className={classes.btnWatchTrailer}>
        <b>
          <FontAwesomeIcon icon={faPlay} />
          Watch trailer
        </b>
      </button>
      {homepage && (
        <a href={homepage} target="_blank" rel="noreferrer">
          <button className={classes.btnVisitPage}>
            <FontAwesomeIcon icon={faHome} />
            Visit HomePage
          </button>
        </a>
      )}
    </>
  );
};

export default IntroButtons;
