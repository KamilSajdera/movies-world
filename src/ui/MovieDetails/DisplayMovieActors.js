import { useNavigate, useLocation } from "react-router-dom";
import classes from "./DisplayMovieActors.module.css";

import noProfileImg from "../../assets/people/noProfileImage.png";

const DisplayMovieActors = ({ cast, id, title }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname.slice(1)

  const navigateToProfile = (id, name) => {
    const urlName = name.toLowerCase().replace(/\s+/g, "-").trim();
    navigate(`/people/profile?id=${id}-${urlName}`);
  };

  const navigateToCredits = () => {

    if(pathname === "movie")
      navigate(`/credits?id=${id}&title=${title}&type=1`)
    else 
      navigate(`/credits?id=${id}&title=${title}&type=2`)
  };

  return (
    <div className={classes.castContent}>
      <h1>Cast</h1>
      <div className={classes.castScroll}>
        {cast.length > 0 &&
          cast.map((item) => {
            const actorProfileImg =
              item.profile_path === null
                ? noProfileImg
                : `https://image.tmdb.org/t/p/w500${item.profile_path}`;

            return (
              <div
                key={item.id}
                className={classes["actor-item"]}
                onClick={() => navigateToProfile(item.id, item.name)}
              >
                <img src={actorProfileImg} alt="Profile img" />
                <h3>{item.name}</h3>
                <p>
                  <i>{item.character || item.roles?.map(item => item.character) || "Unknown role"}</i>
                </p>
              </div>
            );
          })}
        {cast.length === 0 && (
          <div style={{ margin: "15px auto" }}>
            We don't have a cast for this movie in our database.
          </div>
        )}
      </div>
      <button className={classes.more_credits} onClick={() => navigateToCredits()}>Show more</button>
    </div>
  );
};

export default DisplayMovieActors;
