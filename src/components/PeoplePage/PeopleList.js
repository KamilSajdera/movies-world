import classes from "./PeopleList.module.css";

const PeopleList = ({ trendingPeople, currentPage }) => {
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

  return (
    <section className={classes.popularPeopleWrapper}>
      {comparedList.map((person, index) => (
        <div className={itemClassname(index)} key={person.id}>
          <div className={classes.number}>{index + 1}</div>
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
