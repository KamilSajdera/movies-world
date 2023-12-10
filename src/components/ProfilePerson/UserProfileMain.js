import classes from "./UserProfileMain.module.css";

import UserProfileSocials from "./UserProfileSocials";
import UserProfileInfo from "./UserProfileInfo";
import UserPopularFilms from "./UserPopularFilms";

const ProfilePerson = ({ personData }) => {
  return (
    <div className={classes.profilePage}>
      <section className={classes["left-side"]}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${personData.img}`}
          alt={`${personData.name} profile img`}
        />
        <h1>{personData.name}</h1>
        <UserProfileSocials socials={personData.socials} />
        <UserProfileInfo personData={personData} />
      </section>
      <section className={classes["rigth-side"]}>
        <h1>{personData.name}</h1>
        <div className={classes.biography}>
          <h3>Biography</h3>
          {personData.bio}
          <UserPopularFilms films={personData.films}/>
        </div>
      </section>
    </div>
  );
};

export default ProfilePerson;
