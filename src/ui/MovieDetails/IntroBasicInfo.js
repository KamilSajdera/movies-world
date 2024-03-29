import classes from "./IntroBasicInfo.module.css";

const MovieBasics = ({ movieData }) => {
  const movieDuration = movieData.duration
    ? `${Math.floor(movieData.duration / 60)}h ${movieData.duration % 60}m`
    : movieData.tvLength;

  const movieDate = new Date(movieData.releaseDate).toLocaleDateString(
    "pl-PL",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  return (
    <ul className={classes["movie-basics"]}>
      {movieData.adult && <li>+18</li>}
      <li>{movieDate.replaceAll("/", ".")}</li>
      <li>•</li>
      <li>{movieDuration}</li>
      <li>•</li>
      <li>
        {movieData.genres.map((item, index) =>
          index === movieData.genres.length - 1
            ? `${item.name}`
            : `${item.name}/`
        )}
      </li>
    </ul>
  );
};

export default MovieBasics;
