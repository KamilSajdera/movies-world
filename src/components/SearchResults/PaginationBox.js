import React, { useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./PaginationBox.module.css";

export default function PaginationBox({ totalPages }) {
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

  const displayNumbers = () => {
    let numbersArr = [];

    let start, end;

    if (totalPages <= 5) {
      start = 1;
      end = totalPages;
    } else {
      if (pageNumber <= 3) {
        start = 1;
        end = 5;
      } else if (pageNumber >= totalPages - 2) {
        start = totalPages - 4;
        end = totalPages;
      } else {
        start = pageNumber - 2;
        end = pageNumber + 2;
      }
    }

    for (let i = start; i <= end; i++) {
      numbersArr.push(
        <div
          key={i}
          className={`${classes["numer-item"]} ${
            pageNumber === i ? classes.active : ""
          }`}
        >
          {i}
        </div>
      );
    }

    return numbersArr;
  };

  return (
    <div
      className={`${classes.paginationContainer} ${
        totalPages === 1 ? classes.margin0 : ''
      }`}
      ref={numbersRef}
    >
      {totalPages > 1 && displayNumbers()}
    </div>
  );
}
