import { useRef, useState } from "react";
import classes from "./LanguageChoice.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function LanguageChoice({ langs }) {
  const inputRef = useRef();
  const listItemsRef = useRef();
  const [listContent, setListContent] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");

  let availableLangs = [];

  function handleChangingInputValue() {
    availableLangs = [];
    if (inputRef.current.value.trim().length <= 0) {
      listItemsRef.current.classList.remove(classes.show);
      setListContent([]);
      return;
    }

    langs.map((item) => {
      if (
        item.name.toLowerCase().startsWith(inputRef.current.value.toLowerCase())
      ) {
        availableLangs.push(item);
      }
      return availableLangs;
    });

    const updatedListContent = availableLangs.map((item) => (
      <li key={item.id} onClick={() => handleClickItem(item.short, item.name)}>
        {
          <>
            <b>{item.name.slice(0, inputRef.current.value.length)}</b>
            <span>{item.name.slice(inputRef.current.value.length)}</span>
          </>
        }
      </li>
    ));

    setListContent(updatedListContent);
    listItemsRef.current.classList.add(classes.show);
  }

  function handleClickItem(short_name, name) {
    inputRef.current.value = name;
    setSelectedLang(short_name);

    listItemsRef.current.classList.remove(classes.show);
  }

  function removeLang() {
    setSelectedLang("");
    inputRef.current.value = "";
  }

  return (
    <div className={classes.languagesChoice}>
      {selectedLang.length > 0 && (
        <div className={classes.removeLang} onClick={removeLang}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      )}
      <input
        name="language_display"
        placeholder="None selected"
        type="text"
        ref={inputRef}
        onChange={handleChangingInputValue}
        disabled={selectedLang.length > 0}
      />
      <input
        name="language"
        type="text"
        value={selectedLang}
        readOnly
        style={{ display: "none" }}
      />
      <ul className={classes["langs-list"]} ref={listItemsRef}>
        {listContent.length <= 0 && (
          <p className={classes["no-langs"]}>No languages found.</p>
        )}
        {listContent}
      </ul>
    </div>
  );
}
