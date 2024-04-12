import { useSearchParams } from "react-router-dom";
import classes from "./PaginationSelection.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PaginationSelection = (props) => {
  const { totalPages } = props;
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  if(totalPages <= 1)  return;

  function renderNumbers() {
    let numbersArray = [];

    let start, end;

    if (totalPages <= 5) {
      start = 1;
      end = totalPages;
    } else {
      if (currentPage <= 3) {
        start = 1;
        end = 5;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 4;
        end = totalPages;
      } else {
        start = currentPage - 2;
        end = currentPage + 2;
      }
    }

    for (let i = start; i <= end; i++) {
      numbersArray.push(
        <div
          key={i}
          className={itemClassName(i)}
          onClick={() => changePageNumberHandler(i)}
        >
          {i}
        </div>
      );
    }

    return numbersArray;
  }

  function changePageNumberHandler(nextPage) {
    if (currentPage !== nextPage && nextPage >= 1 && nextPage <= totalPages) {
      props.onChangePage(nextPage);
      if (window.scrollY > 300) window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function itemClassName(nr) {
    let itemClass = classes["pagination-select-item"];

    if (currentPage === nr) itemClass += ` ${classes.active}`;

    return itemClass;
  }

  return (
    <div className={classes["pagination-container"]}>
      <div
        className={`${classes["modify_page"]} ${
          currentPage === 1 ? classes["not-active"] : ""
        }`}
        onClick={() => changePageNumberHandler(currentPage - 1)}
      >
        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
      </div>
      {renderNumbers()}
      <div
        className={`${classes["modify_page"]} ${
          currentPage === totalPages ? classes["not-active"] : ""
        }`}
        onClick={() => changePageNumberHandler(currentPage + 1)}
      >
        <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default PaginationSelection;
