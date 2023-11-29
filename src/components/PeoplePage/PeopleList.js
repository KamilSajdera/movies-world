import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./PeopleList.module.css";

const PeopleList = ({ trendingPeople, currentPage }) => {
  const peopleItemsRef = useRef();
  const navigate = useNavigate();

  const comparedList = trendingPeople.sort(
    (a, b) => b.popularity - a.popularity
  );

  const itemClassname = (index) =>
    `${classes["person-item"]} ${
      index === 0 && currentPage === 1
        ? classes.first_place
        : index === 1 && currentPage === 1
        ? classes.second_place
        : index === 2 && currentPage === 1
        ? classes.third_place
        : ""
    }`;

  useEffect(() => {
    const getPersonProfile = (event) => {
      const profileId = event.currentTarget.getAttribute("data-key");
      navigate(`/people/profile/${profileId}`);
    };

    const peopleItems = peopleItemsRef.current.querySelectorAll(
      `.${classes["person-item"]}`
    );

    peopleItems.forEach((item) => {
      item.addEventListener("click", getPersonProfile);
    });

    return () => {
      peopleItems.forEach((item) => {
        item.removeEventListener("click", getPersonProfile);
      });
    };
  }, [comparedList, navigate]);

  return (
    <section className={classes.popularPeopleWrapper} ref={peopleItemsRef}>
      {comparedList.map((person, index) => (
        <div className={itemClassname(index)} key={person.id} data-key={person.id}>
          <div className={classes.number}>
            {20 * currentPage - 20 + (index + 1)}
          </div>
          <div className={classes.image_box}>
            <img src={person.image} alt={`${person.name}'s img`} />
          </div>
          <div className={classes.person_name}>{person.name}</div>
          <div className={classes.known_for}>{person.profession}</div>
          <div className={classes.popularity}>
            Popularity: {person.popularity}
          </div>
          <div className={classes.person_films}>
            {person.films.title || "No data"}
          </div>
        </div>
      ))}
    </section>
  );
};

export default PeopleList;
