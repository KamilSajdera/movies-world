import classes from "./PeopleList.module.css";

const PeopleList = ({ trendingPeople }) => {
  const comparedList = trendingPeople.sort(
    (a, b) => b.popularity - a.popularity
  );

  const itemClassname = (index) =>
    `${classes["person-item"]} ${
      index === 0
        ? classes.first_place
        : index === 1
        ? classes.second_place
        : index === 2
        ? classes.third_place
        : ""
    }`;

  return (
    <section className={classes.popularPeopleWrapper}>
      {comparedList.map((person, index) => (
        <div className={itemClassname(index)} key={person.id}>
          <div className={classes.number}>{index + 1}</div>
          <div className={classes.image_box}>
            <img
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt={`${person.original_name}'s img`}
            />
          </div>
          <div className={classes.person_name}>{person.original_name}</div>
          <div className={classes.known_for}>{person.known_for_department}</div>
          <div className={classes.popularity}>
            Popularity: {person.popularity}
          </div>
          <div className={classes.person_films}>
            {person.known_for.map((item) => item.title).join(", ")}
          </div>
        </div>
      ))}
    </section>
  );
};

export default PeopleList;
