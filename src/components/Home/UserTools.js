import classes from "./UserTools.module.css";

import SearchTermForm from "../../ui/SearchTermForm";
import TrendingSection from "./TrendingSection";

const UserTools = ({trendingArray}) => {
  return (
    <div className={classes.mainContent}>
      <SearchTermForm placeholder="Search..." style={{width: "45%"}}/>
      <TrendingSection items={trendingArray} />
    </div>
  );
};

export default UserTools;
