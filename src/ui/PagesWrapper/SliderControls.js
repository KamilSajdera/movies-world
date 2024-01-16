import { useCallback, useEffect, useRef } from "react";

import classes from "./SliderControls.module.css";

const SliderControls = (props) => {
  const sliderControlsRef = useRef();

  const { currentlyShowingMovie, moviesLength } = props;

  const changeMovieByUser = useCallback((e) => {
      const clickedNumber =
        parseInt(e.target.getAttribute("data-number-movie")) || 0;

      const newMovieIndex =
        (currentlyShowingMovie + clickedNumber + moviesLength) % moviesLength;

      if (newMovieIndex === currentlyShowingMovie) return;

      props.onChangeNumber(newMovieIndex)
    },
    [currentlyShowingMovie, moviesLength, props]
  );

  useEffect(() => {
    const sliderItems = sliderControlsRef.current.querySelectorAll(
      `.${classes["control-item"]}`
    );
    sliderItems.forEach((item) =>
      item.addEventListener("click", changeMovieByUser)
    );

    return () =>
      sliderItems.forEach((item) =>
        item.removeEventListener("click", changeMovieByUser)
      );
  }, [changeMovieByUser]);
  return (
    <div className={classes.sliderControls} ref={sliderControlsRef}>
      <div className={classes["control-item"]} data-number-movie="-2"></div>
      <div className={classes["control-item"]} data-number-movie="-1"></div>
      <div
        className={`${classes["control-item"]} ${classes["control-mid"]} `}
      ></div>
      <div className={classes["control-item"]} data-number-movie="1"></div>
      <div className={classes["control-item"]} data-number-movie="2"></div>
    </div>
  );
};

export default SliderControls;
