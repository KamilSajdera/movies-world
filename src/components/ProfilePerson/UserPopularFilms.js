import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useMemo } from "react";

import classes from "./UserPopularFilms.module.css";

import noMovieImg from "../../assets/people/noImage.png";

const UserPopularFilms = ({ films }) => {
  const containerRef = useRef();
  const navigate = useNavigate();
  
  const uniqueFilms = useMemo(() => {
    const array = [];

    films.forEach((film) => {
      const existingIndex = array.findIndex((item) => item.id === film.id);
      if (existingIndex !== -1) {
        array[existingIndex].character.push(film.job || film.character);
      } else {
        array.push({
          id: film.id,
          title: film.title || film.name,
          image: film.poster_path
            ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
            : noMovieImg,
          character: [film.character || film.job],
        });
      }
    });

    return array;
  }, [films]);

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

        filmCaption[index].innerHTML = `as ${uniqueFilms[index].character.map(item => `<b>${item}</b>`).join(', ')}`;

      });

      item.addEventListener("mouseout", (e) => {
        filmCaption[index].classList.remove(classes.slideOver);
        filmCaption[index].classList.add(classes.slideOut);

        filmCaption[index].innerText = uniqueFilms[index].title;
      });
    });

    filmImage.forEach((item, index) => {
      item.addEventListener("click", () => {
        const isMovie = films[index].media_type === "movie";
        const urlName = !isMovie
          ? films[index].name.toLowerCase().replace(/\s+/g, "-").trim()
          : films[index].title.toLowerCase().replace(/\s+/g, "-").trim();

        if (isMovie) navigate(`/movie?id=${films[index].id}-${urlName}`);
        else navigate(`/tv?id=${films[index].id}-${urlName}`);
      });
    });
  }, [films, navigate, uniqueFilms]);

  return (
    <div className={classes.filmsWrapper}>
      <h3>Popular productions</h3>
      <div className={classes.filmsContainer} ref={containerRef}>
        {uniqueFilms.map((film) => {
          return (
            <div className={classes["film-item"]} key={film.id}>
              <img src={film.image} alt="Film img" />
              <p>{film.title}</p>
            </div>
          );
        })}
        {films.length === 0 && (
          <p className={classes.noProductions}>
            Not found productions for this person.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserPopularFilms;
