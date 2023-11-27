import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import classes from "./Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ currentPage }) => {
  const location = useLocation();
  const isPageOne =
    location.pathname === "/people" || location.pathname === "/people/1";

  const renderPages = () => {
    const pages = [];

    for (let i = -2; i <= 2; i++) {
      const page = currentPage > 2 ? currentPage + i : currentPage + i + 2;
      pages.push(
        <div key={page} className={classes["page-number"]}>
          {page === 1 
          ? <NavLink
              to={`/people/${page}`}
              className={isPageOne ? classes.active : ""}
            >
              {page}
            </NavLink>
           :<NavLink
              to={`/people/${page}`}
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              {page}
            </NavLink>
          }
        </div>
      );
    }
    return pages;
  };

  return (
    <div className={classes.paginationBox}>
      <button className={classes.modifyCurrentPage}>
        <NavLink to={`/people/${currentPage - 1}`}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </NavLink>
      </button>
      {renderPages()}
      <button className={classes.modifyCurrentPage}>
        <NavLink to={`/people/${currentPage + 1}`}>
          <FontAwesomeIcon icon={faArrowRight} />
        </NavLink>
      </button>
    </div>
  );
};

export default Pagination;
