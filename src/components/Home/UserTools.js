import classes from "./UserTools.module.css";

import SearchTermForm from "../../ui/SearchTermForm";

const UserTools = () => {
  return (
    <div className={classes.mainContent}>
      <SearchTermForm />
      <div className={classes.trendingSection}></div>
    </div>
  );
};

export default UserTools;
