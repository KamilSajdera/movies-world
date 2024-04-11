import SearchTermForm from "../../ui/SearchTermForm";
import classes from "./SearchResults.module.css";

const DefaultContent = () => {
  return (
    <>
      <SearchTermForm />
      <p className={classes.typeSomething}>
        Please enter a phrase and we will search our database.
      </p>
    </>
  );
};

export default DefaultContent;
