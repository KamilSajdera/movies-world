import classes from "./Footer.module.css";

import logo from "../../assets/tmdb.svg";

import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname, search } = useLocation();
  const isQuery = search.slice(7).length > 0;

  return (
    <footer
      className={classes.footer}
      style={
        pathname === "/search" && !isQuery
          ? { position: "absolute", bottom: "0px" }
          : {}
      }
    >
      <div className={classes.logo}>
        <h4>Data provides by</h4>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          <img src={logo} alt="TheMovieDataBase" />
        </a>
      </div>
      <div className={classes.copyrights}>
        Idea and execution:
        <a
          href="https://github.com/KamilSajdera"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          <b>Kamil Sajdera</b>
        </a>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
