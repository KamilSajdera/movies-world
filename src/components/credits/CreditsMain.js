import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup, faVideo } from "@fortawesome/free-solid-svg-icons";

import classes from "./CreditsMain.module.css";
import PeopleSection from "./PeopleSection";

const CreditsMain = ({ credits }) => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");

  const [whichCategory, setWhichCategory] = useState(1);

  const setCategoryHandle = (value) => {
    setWhichCategory(value);
  };

  return (
    <div className={classes.creditsPage}>
      <div className={classes["credits-control"]}>
        <h2>{title}</h2>
        <div
          className={`${classes["control-switch"]} ${
            whichCategory === 1 ? classes.active : ""
          }`}
          onClick={() => setCategoryHandle(1)}
        >
          <FontAwesomeIcon icon={faPeopleGroup} />
          <p>Cast</p>
        </div>
        <div
          className={`${classes["control-switch"]} ${
            whichCategory === 2 ? classes.active : ""
          }`}
          onClick={() => setCategoryHandle(2)}
        >
          <FontAwesomeIcon icon={faVideo} />
          <p>Crew</p>
        </div>
      </div>
      {whichCategory === 1 && (
        <PeopleSection people={credits.cast} title="Full Cast" />
      )}
      {whichCategory === 2 && (
        <PeopleSection people={credits.crew} title="Crew" />
      )}
    </div>
  );
};

export default CreditsMain;
