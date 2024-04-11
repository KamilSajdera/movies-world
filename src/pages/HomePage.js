import classes from "./HomePage.module.css";

import SearchTermForm from "../ui/SearchTermForm";

const HomePage = () => {
  return (
    <section className={classes.greetingSection}>
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

      <SearchTermForm />
    </section>
  );
};

export default HomePage;
