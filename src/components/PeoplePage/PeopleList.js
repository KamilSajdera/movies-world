import classes from "./PeopleList.module.css";

const PeopleList = ({ trendingPeople }) => {

  return (
    <section className={classes.popularPeopleWrapper}>
      {trendingPeople.map((person) => (
        <div className={classes["person-item"]} key={person.id}>
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
            { person.known_for.map(item => item.title).join(", ")}
          </div>
        </div>
      ))}
    </section>
  );
};

export default PeopleList;
