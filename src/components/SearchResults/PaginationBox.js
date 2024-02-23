import React, { useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./PaginationBox.module.css";

export default function PaginationBox() {
  const numbersRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const pageNumber = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const numbers = numbersRef.current.querySelectorAll(
      `.${classes["numer-item"]}`
    );

    const handleClick = (event) => {
      const clickedNumber = parseInt(event.target.textContent);

      if (pageNumber === clickedNumber) return;

      searchParams.set("page", clickedNumber);
      navigate(`?${searchParams.toString()}`);

      if (window.scrollY > 300) window.scrollTo(0, 0);
    };

    numbers.forEach((item) => {
      item.addEventListener("click", handleClick);
    });

    return () => {
      numbers.forEach((item) => {
        item.removeEventListener("click", handleClick);
      });
    };
  }, [navigate, searchParams, pageNumber]);

  return (
    <div className={classes.paginationContainer} ref={numbersRef}>
      <div
        className={`${classes["numer-item"]} ${
          pageNumber === 1 ? classes.active : ""
        }`}
      >
        1
      </div>
      <div
        className={`${classes["numer-item"]} ${
          pageNumber === 2 ? classes.active : ""
        }`}
      >
        2
      </div>
      <div
        className={`${classes["numer-item"]} ${
          pageNumber === 3 ? classes.active : ""
        }`}
      >
        3
      </div>
      <div
        className={`${classes["numer-item"]} ${
          pageNumber === 4 ? classes.active : ""
        }`}
      >
        4
      </div>
      <div
        className={`${classes["numer-item"]} ${
          pageNumber === 5 ? classes.active : ""
        }`}
      >
        5
      </div>
    </div>
  );
}
