import { useNavigate } from "react-router-dom";
import classes from "./PeopleSection.module.css";

import noImage from "../../assets/people/noProfileImage.png";

const PeopleSection = ({ people, title }) => {
  
  const navigate = useNavigate();
  let uniquePeople = [];

  const navigateToProfile = (id, name) => {
    const urlName = name.toLowerCase().replace(/\s+/g, "-").trim();
    navigate(`/people/profile?id=${id}-${urlName}`);
  };

  const readyPeople = () => {
    people.forEach((person) => {
      const obj = {
        id: person.id,
        name: person.name,
        profile_path: person.profile_path,
        roles: person.roles,
        department: [person.department || person.character],
      };

      const existingIndex = uniquePeople.findIndex((item) => item.id === person.id);

      if (existingIndex !== -1)
        uniquePeople[existingIndex].department.push(person.department);
      else uniquePeople.push(obj);
    });

    return uniquePeople;
  };

  readyPeople();

  return (
    <div className={classes.peopleContainer}>
      <h2>{title}</h2>
      {uniquePeople.map((person) => {
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
            <div className={classes["person-known_for"]}>
              {person.roles === undefined &&
                person.department.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              {person.roles !== undefined &&
                person.roles.map((item, index) => (
                  <p key={index}>{item.character}</p>
                ))}
            </div>
          </div>
        );
      })}
      {people.length === 0 && (
        <p style={{ margin: "20px auto" }}>
          Sorry, we couldn't found more data.
        </p>
      )}
    </div>
  );
};

export default PeopleSection;
