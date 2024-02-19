import { useNavigate } from "react-router-dom";
import classes from "./ResultsContent.module.css";

import noAvatar from "../../assets/people/noProfileImage.png";

const PeopleSection = ({ people }) => {
  const navigate = useNavigate();

  const navigateTo = (id, name) => {
    const urlName = name.toLowerCase().replace(/\s+/g, "-").trim();
    navigate(`/people/profile?id=${id}-${urlName}`);
  };

  return (
    <div className={classes["results_items"]}>
      {people.map((person) => (
        <div
          className={`${classes["result-item"]} ${classes["result-person"]}`}
          key={person.id}
          onClick={() => navigateTo(person.id, person.name)}
        >
          <img
            src={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                : noAvatar
            }
            alt="User profile avatar"
          />
          <div className={classes.person_data}>
            <h2>{person.name}</h2>
            <ul>
              {person.known_for.map((item, index) => (
                <li key={index}>{item.title || item.name}</li>
              ))}
            </ul>
            <p className={classes.known_for}>{person.known_for_department}</p>
          </div>
        </div>
      ))}
      {people.length === 0 && <p>No data for people section.</p>}
    </div>
  );
};

export default PeopleSection;
