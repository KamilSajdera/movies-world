import classes from "./ResultsContent.module.css";
import noImage from "../../assets/people/noImage.png";

const SeriesSection = ({ series }) => {

  return (
    <div className={classes["results_items"]}>
      {series.map((serial) => {
        const date = new Date(serial.first_air_date).toLocaleDateString("en-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        const image = serial.poster_path
          ? `https://image.tmdb.org/t/p/w500/${serial.poster_path}`
          : noImage;

        return (
          <div className={classes["result-item"]} key={serial.id}>
            <div className={classes["result-img"]}>
              <img src={image} alt="alt" />
            </div>
            <div className={classes["result-item-data"]}>
              <h4>{serial.name}</h4>
              <p className={classes.date}>{date}</p>
              <p className={classes.results_overview}>{serial.overview}</p>
            </div>
          </div>
        );
      })}
    {series.length === 0 && <p>No data for section series.</p>}
    </div>
  );
};

export default SeriesSection;
