import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

import classes from "./UserPopularFilms.module.css";

import noMovieImg from "../../assets/people/noImage.png";

const UserPopularFilms = ({ films }) => {
  const containerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const filmsContainer = containerRef.current;
    const filmImage = containerRef.current.querySelectorAll(
      `.${classes["film-item"]}`
    );
    const filmCaption = containerRef.current.querySelectorAll("p");
    let isMouseDown = false;
    let startX;
    let scrollLeft;

    // start animate for move films by cursor
    filmsContainer.addEventListener("mousedown", (e) => {
      isMouseDown = true;
      startX = e.pageX - filmsContainer.offsetLeft;
      scrollLeft = filmsContainer.scrollLeft;
    });

    filmsContainer.addEventListener("mouseleave", () => {
      isMouseDown = false;
    });

    filmsContainer.addEventListener("mouseup", () => {
      isMouseDown = false;
    });

    filmsContainer.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - filmsContainer.offsetLeft;
      const walk = (x - startX) * 2;
      filmsContainer.scrollLeft = scrollLeft - walk;
    });

    // changing and animate for changing caption under film image
    filmImage.forEach((item, index) => {
      item.addEventListener("mouseover", (e) => {
        filmCaption[index].classList.remove(classes.slideOut);
        filmCaption[index].classList.add(classes.slideOver);

        filmCaption[
          index
        ].innerHTML = `as <i><b>${films[index].character}</b></i>`;
      });

      item.addEventListener("mouseout", (e) => {
        filmCaption[index].classList.remove(classes.slideOver);
        filmCaption[index].classList.add(classes.slideOut);

        filmCaption[index].innerText = films[index].title;
      });
    });

    filmImage.forEach((item, index) => {
      item.addEventListener("click", () => {
        const urlName = films[index].title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .trim();
        navigate(`/movie?id=${films[index].id}-${urlName}`);
      });
    });
  }, [films, navigate]);

  return (
    <div className={classes.filmsWrapper}>
      <h3>Popular films</h3>
      <div className={classes.filmsContainer} ref={containerRef}>
        {films.map((film) => {
          const img =
            film.poster_path === null
              ? noMovieImg
              : `https://image.tmdb.org/t/p/w500${film.poster_path}`;
          return (
            <div className={classes["film-item"]} key={film.id}>
              <img src={img} alt="Film img" />
              <p>{film.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserPopularFilms;
