import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import classes from "./TopNavigation.module.css";

import InputSearch from "./InputSearch";
import MainMenu from "./MainMenu";

const TopNavigation = () => {
  const [isMenuOpen, setMenuIsOpen] = useState(false);

  const toggleMenuHandler = () =>
    setMenuIsOpen((prevMenuIsOpen) => !prevMenuIsOpen);

  return (
    <section className={classes.topNavigation}>
      <div className={classes.hamburgerIcon} onClick={toggleMenuHandler}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <InputSearch />
      <MainMenu toggleMenu={isMenuOpen} />
    </section>
  );
};

export default TopNavigation;
