import { useNavigate } from "react-router-dom";
import classes from "./PeopleSection.module.css";

import noImage from "../../assets/people/noProfileImage.png";

const PeopleSection = ({ people, title }) => {
  const navigate = useNavigate();

  const navigateToProfile = (id, name) => {
    const urlName = name.toLowerCase().replace(/\s+/g, "-").trim();
    navigate(`/people/profile?id=${id}-${urlName}`);
  };

  return (
    <div className={classes.peopleContainer}>
      <h2>{title}</h2>
      {people.map((person) => {
        const src = person.profile_path
          ? `https://image.tmdb.org/t/p/original/${person.profile_path}`
          : noImage;

        return (
          <div
            className={classes["person-item"]}
            key={person.id}
            onClick={() => navigateToProfile(person.id, person.name)}
          >
            <img src={src} alt="Person profile img" />
            <p className={classes["person-name"]}>{person.name}</p>
            <p className={classes["person-known_for"]}>
              {person.character || person.department}
            </p>
          </div>
        );
      })}
      { people.length === 0 && <p style={{margin: '20px auto'}}>Sorry, we couldn't found more data.</p> } 
    </div>
  );
};

export default PeopleSection;
