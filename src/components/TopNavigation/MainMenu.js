import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./MainMenu.module.css";

import homeImg from "../../assets/topnavigation/home.png";
import nowplayingImg from "../../assets/topnavigation/list.png";
import popularImg from "../../assets/topnavigation/popular.png";
import newlyaddedImg from "../../assets/topnavigation/newlyadded.png";
import discoverImg from "../../assets/topnavigation/discover.png";
import topratedImg from "../../assets/topnavigation/toprated.png";
import peopleImg from "../../assets/topnavigation/people.png";

const MainMenu = ({ toggleMenu }) => {
  const [isOpen, setIsOpen] = useState(toggleMenu);
  const menuRef = useRef();

  const listOptionsMenu = [
    {
      id: 1,
      optionName: "home",
      optionImage: homeImg,
      pathName: "/",
    },
    {
      id: 2,
      optionName: "now playing",
      optionImage: nowplayingImg,
      pathName: "nowplaying",
    },
    {
      id: 3,
      optionName: "popular",
      optionImage: popularImg,
      pathName: "popular",
    },
    {
      id: 4,
      optionName: "newly added",
      optionImage: newlyaddedImg,
      pathName: "newlyadded",
      style: { height: "23px" },
    },
    {
      id: 5,
      optionName: "discover",
      optionImage: discoverImg,
      pathName: "discover",
      style: { width: "23px" },
    },
    {
      id: 6,
      optionName: "topRated",
      optionImage: topratedImg,
      pathName: "toprated",
      style: { width: "23px" },
    },
    {
      id: 7,
      optionName: "people",
      optionImage: peopleImg,
      pathName: "people",
    },
  ];

  useEffect(() => {
    setIsOpen((prev) => !prev);
  }, [toggleMenu]);

  if (menuRef.current !== undefined) {
    if (isOpen) {
      menuRef.current.classList.remove(classes.closed);
      menuRef.current.classList.add(classes.opened);
    } else {
      menuRef.current.classList.remove(classes.opened);
      menuRef.current.classList.add(classes.closed);
    }
  }

  return (
    <nav className={classes.mainMenu} ref={menuRef}>
      {listOptionsMenu.map((opt) => (
        <li key={opt.id}>
          <NavLink
            onClick={() => setIsOpen((prev) => !prev)}
            to={opt.pathName}
            className={({ isActive }) => (isActive ? classes.active : "")}
          >
            <img
              src={opt.optionImage}
              alt={opt.optionName}
              className={classes.img}
              style={opt.style}
            />
            <p>{opt.optionName}</p>
          </NavLink>
        </li>
      ))}
    </nav>
  );
};

export default MainMenu;
