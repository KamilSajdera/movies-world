import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import classes from "./Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ currentPage }) => {
  const location = useLocation();
  const isPageOne =
    location.pathname === "/people" || location.pathname === "/people/1";

  const navigate = useNavigate();
  const isPrevButtonDisabled = currentPage === 1;
  const isNextButtonDisabled = currentPage === 500;

  const renderPages = () => {
    const pages = [];

    for (let i = -2; i <= 2; i++) {
      const page = currentPage > 2 ? currentPage + i : currentPage + i + 2;
      pages.push(
        <div key={page} className={classes["page-number"]}>
          {page === 1 ? (
            <NavLink
              to={`/people/${page}`}
              className={isPageOne ? classes.active : ""}
            >
              {page}
            </NavLink>
          ) : (
            <NavLink
              to={`/people/${page}`}
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              {page}
            </NavLink>
          )}
        </div>
      );
    }
    return pages;
  };

  const nextPage = () => {
    navigate(`/people/${currentPage + 1}`);
  };

  const prevPage = () => {
    navigate(`/people/${currentPage - 1}`);
  };

  return (
    <div className={classes.paginationBox}>
      <button
        className={classes.modifyCurrentPage}
        onClick={() => prevPage()}
        disabled={isPrevButtonDisabled}
        style={isPrevButtonDisabled ? {filter: 'brightness(0.5)', cursor: 'default'} : {}}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {renderPages()}
      <button
        className={classes.modifyCurrentPage}
        onClick={() => nextPage()}
        disabled={isNextButtonDisabled}
        style={isNextButtonDisabled ? {filter: 'brightness(0.5)', cursor: 'default'} : {}}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Pagination;
