import { useNavigate } from "react-router-dom";
import classes from "./DisplayMovieActors.module.css";

const DisplayMovieActors = ({ cast }) => {

  const navigate = useNavigate();

  const navigateToProfile = (id, name) => {
    const urlName = name.toLowerCase().replace(/\s+/g, '-').trim();
    navigate(`../people/profile?id=${id}-${urlName}`)
  };

  return (
    <div className={classes.castContent}>
      <h1>Cast</h1>
      <div className={classes.castScroll}>
        {cast.map((item) => {
          const actorProfileImg = `https://image.tmdb.org/t/p/w500${item.profile_path}`;
          return (
            <div key={item.id} className={classes["actor-item"]} onClick={() => navigateToProfile(item.id, item.name)}>
              <img src={actorProfileImg} alt="Profile img" />
              <h3>{item.name}</h3>
              <p>
                <i>{item.character}</i>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayMovieActors;
