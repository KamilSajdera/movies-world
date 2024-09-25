import { useRef, useState } from "react";
import { json } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faXmark } from "@fortawesome/free-solid-svg-icons";

import classes from "./keywords-list.module.css";

export default function KeywordsList() {
  const [userKeyword, setUserKeyword] = useState("");
  const [availableKeywordsList, setAvailableKeywordsList] = useState([]);
  const [userKeywordsList, setUserKeywordsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef();
  const keywordsContainerRef = useRef();

  const handleSearchKeywords = async (event) => {
    if (!isLoading) setIsLoading(true);

    setUserKeyword(event.target.value);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_BEARER_KEY}`,
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/search/keyword?page=1&query=${event.target.value}`,
      options
    );

    if (!response.ok) {
      throw json(
        {
          message: "Could not fetch keywords list.",
          desc: "Something went wrong while loading the list of available keywords. Please try again.",
        },
        { status: 500 }
      );
    }

    const result = await response.json();
    setAvailableKeywordsList(result.results);

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handleAddKeyword = (keyword) => {
    setUserKeyword("");
    setUserKeywordsList((prevUserKeywordsList) => [
      ...prevUserKeywordsList,
      keyword,
    ]);

    setTimeout(() => {
      if (keywordsContainerRef.current) {
        keywordsContainerRef.current.scrollLeft =
          keywordsContainerRef.current.scrollWidth;
      }
    }, 100);
  };

  function handleRemoveKeyword(id) {
    let updatedKeywords = userKeywordsList.filter((item) => item.id !== id);

    setUserKeywordsList(updatedKeywords);
  }

  return (
    <div className={classes.keywordsContainer}>
      <div className={classes.enteredKeywords} ref={keywordsContainerRef}>
        {userKeywordsList.map((item) => (
          <div className={classes["entered-keyword"]} key={item.id}>
            {item.name}{" "}
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => handleRemoveKeyword(item.id)}
            />{" "}
          </div>
        ))}
      </div>

      <input
        name="with_keywords"
        placeholder="Search keywords"
        type="text"
        onChange={handleSearchKeywords}
        ref={inputRef}
        value={userKeyword}
      />

      {userKeyword.length > 0 && availableKeywordsList.length > 0 && (
        <ul className={classes["keywords-list"]}>
          {availableKeywordsList.map((keyword) => (
            <li key={keyword.id} onClick={() => handleAddKeyword(keyword)}>
              {keyword.name}
            </li>
          ))}
        </ul>
      )}
      {isLoading && <FontAwesomeIcon icon={faCircleNotch} />}
    </div>
  );
}
