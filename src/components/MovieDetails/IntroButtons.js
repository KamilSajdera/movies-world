import classes from "./IntroButtons.module.css";
import trailerClass from "./MovieTrailer.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlay } from "@fortawesome/free-solid-svg-icons";

import MoveTo from "moveto";

const IntroButtons = ({ homepage, trailer }) => {
  
  const moveToOptions = {
    tolerance: 20,
    duration: 1000,
  };

  const moveTo = new MoveTo(moveToOptions);

  const handleClick = (event) => {
    event.preventDefault();
    const target = document.querySelector(`.${trailerClass.trailerContainer}`);
    moveTo.move(target);
  };

  return (
    <>
      {trailer && (
        <button className={classes.btnWatchTrailer} onClick={handleClick}>
          <b>
            <FontAwesomeIcon icon={faPlay} />
            Watch trailer
          </b>
        </button>
      )}
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
