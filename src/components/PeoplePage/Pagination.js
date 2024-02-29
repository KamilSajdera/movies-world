import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import classes from "./Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ currentPage }) => {
  const [searchParams] = useSearchParams();
  const pageNumberFromUrl = parseInt(searchParams.get("page")) || 1;

  const navigate = useNavigate();
  const isPrevButtonDisabled = currentPage === 1;
  const isNextButtonDisabled = currentPage === 500;

  const renderPages = () => {
    const pagesArray = [];

    for (let i = -2; i <= 2; i++) {
      const pageNr =
        currentPage > 2 && currentPage < 499
          ? currentPage + i
          : currentPage >= 499
          ? currentPage + i - 2
          : currentPage + i + 2;

      pagesArray.push(
        <div key={pageNr} className={`${classes["page-number"]} ${pageNumberFromUrl === pageNr ? classes.active : ""}`}>
          <Link
            to={`/people?page=${pageNr}`}
          >
            {pageNr}
          </Link>
        </div>
      );
    }
    return pagesArray;
  };

  const nextPage = () => {
    navigate(`/people?page=${currentPage + 1}`);
  };

  const prevPage = () => {
    navigate(`/people?page=${currentPage - 1}`);
  };

  return (
    <div className={classes.paginationBox}>
      <button
        className={classes.modifyCurrentPage}
        onClick={() => prevPage()}
        disabled={isPrevButtonDisabled}
        style={
          isPrevButtonDisabled
            ? { filter: "brightness(0.5)", cursor: "default" }
            : {}
        }
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {renderPages()}
      <button
        className={classes.modifyCurrentPage}
        onClick={() => nextPage()}
        disabled={isNextButtonDisabled}
        style={
          isNextButtonDisabled
            ? { filter: "brightness(0.5)", cursor: "default" }
            : {}
        }
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Pagination;
