import classes from "./UserProfileMain.module.css";

import UserProfileSocials from "./UserProfileSocials";
import UserProfileInfo from "./UserProfileInfo";
import UserPopularFilms from "./UserPopularFilms";
import UserOtherNames from "./UserOtherNames";

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
        { personData.otherName.length > 0 && <UserOtherNames otherNames={personData.otherName}/> }
      </section>
      <section className={classes["rigth-side"]}>
        <h1>{personData.name}</h1>
        <div className={classes.biography}>
          <h3>Biography</h3>
          {personData.bio}
        </div>
        <UserPopularFilms films={personData.films}/>
      </section>
    </div>
  );
};

export default ProfilePerson;
