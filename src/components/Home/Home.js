import classes from "./Home.module.css";

import UserTools from "./UserTools";

const Home = ({trendingArray}) => {
  return (
    <section className={classes.homeContainer}>
      <h1>
        <span>M</span>
        <span>o</span>
        <span>v</span>
        <span>i</span>
        <span>e</span>
        <span>s</span>
        <span> W</span>
        <span>o</span>
        <span>r</span>
        <span>l</span>
        <span>d</span>
      </h1>
      <p>
        Welcome to a big library many of movies, tv series and people associated
        with cinema. Discover movies thanks to our website with many categories
        and details. Enjoy!
      </p>
      <UserTools trendingArray={trendingArray}/>
    </section>
  );
};

export default Home;
