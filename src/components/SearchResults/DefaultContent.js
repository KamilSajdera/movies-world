import SearchTermForm from "../../ui/SearchTermForm";
import classes from "./SearchResults.module.css";

const DefaultContent = () => {
  return (
    <>
      <SearchTermForm placeholder="Enter the name of the series, movie or actor..."/>
      <p className={classes.typeSomething}>
        Please enter a phrase and we will search our database.
      </p>
    </>
  );
};

export default DefaultContent;
