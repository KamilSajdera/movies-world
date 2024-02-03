import classes from "./UserProfileInfo.module.css";

const UserProfileInfo = ({ personData }) => {
  const userBirthday = new Date(personData.birthday);
  const userDeathday =
    personData.deathday === null ? null : new Date(personData.deathday);

  const isUserDead = personData.deathday !== null ? true : false;

  function calculateAge(birthday, deathday) {
    const currentDate = deathday ? deathday : new Date();
    const age = currentDate.getFullYear() - birthday.getFullYear();
    const birthdayOnCurrentYear = new Date(
      currentDate.getFullYear(),
      birthday.getMonth(),
      birthday.getDate()
    );

    if (isUserDead) return `${age - 1}✝️`;
    if (birthdayOnCurrentYear > currentDate) return `(${age - 1}yo)`;
    if (birthdayOnCurrentYear < currentDate) return `(${age}yo)`;
  }

  const userAge = calculateAge(userBirthday, userDeathday);

  return (
    <div className={classes.primaryInfo}>
      <div className={classes["info-item"]}>
        <h3>Profession</h3>
        <p>{personData.profession}</p>
      </div>
      <div className={classes["info-item"]}>
        <h3>Birthday</h3>
        <p>{personData.birthday && personData.birthday} {userAge}</p>
      </div>
      <div className={classes["info-item"]}>
        <h3>Gender</h3>
        <p>{personData.gender}</p>
      </div>
      <div className={classes["info-item"]}>
        <h3>Popularity</h3>
        <p>{personData.popularity}</p>
      </div>
      <div className={classes["info-item"]}>
        <h3>Birthplace</h3>
        <p>{personData.birthplace}</p>
      </div>
    </div>
  );
};

export default UserProfileInfo;
