import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import classes from "./MovieTrailer.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faExpand } from "@fortawesome/free-solid-svg-icons";

const MovieTrailer = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [movieProgress, setMovieProgress] = useState(0);
  const [loadedPart, setLoadedPart] = useState(0);
  const [displayMovieDuration, setDisplayMovieDration] = useState(null);
  const [displayMovieProgress, setDisplayMovieProgress] = useState(null);
  const playerRef = useRef(null);

  const switchPlayHandle = () => {
    setIsPlaying(!isPlaying);
  };

  const movieProgressHandler = (state) => {
    setMovieProgress(state.played);
    setLoadedPart(state.loaded);

    const minutes = Math.floor(state.playedSeconds / 60);
    const seconds = Math.floor(state.playedSeconds  % 60);
    const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    setDisplayMovieProgress(formattedTime)
  };

  const changePlaybackMomentHandle = (e) => {
    const seekTime = e.target.value;
    setMovieProgress(seekTime);
    playerRef.current.seekTo(parseFloat(seekTime));
  };

  const setDurationHandle = (e) => {
    const minutes = Math.floor(e / 60);
    const seconds = e % 60;
    setDisplayMovieDration(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
  };

  const toggleFullscreen = () => {
    const playerElement = playerRef.current.wrapper;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (playerElement.requestFullscreen) {
        playerElement.requestFullscreen();
      } else if (playerElement.mozRequestFullScreen) {
        playerElement.mozRequestFullScreen();
      } else if (playerElement.webkitRequestFullscreen) {
        playerElement.webkitRequestFullscreen();
      } else if (playerElement.msRequestFullscreen) {
        playerElement.msRequestFullscreen();
      }
    }
  };

  return (
    <div className={classes.trailerContainer}>
      <h1>Trailer</h1>
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width="100%"
        height="650px"
        playing={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClickPreview={() => setIsPlaying(true)}
        onDuration={setDurationHandle}
        controls={false}
        onProgress={movieProgressHandler}
        config={{
          youtube: {
            playerVars: {
              controls: 0,
              modestbranding: 1,
              disablekb: 1,
            },
          },
        }}
      />
      <div className={classes.playerToolbox}>
        <div className={classes.playerOptions}>
          <button onClick={switchPlayHandle}>
            {isPlaying ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
          <button onClick={toggleFullscreen}>
          <FontAwesomeIcon icon={faExpand} />
          </button>
        </div>
        <div className={classes.timeBar}>
          <div
            className={classes.expireTime}
            style={{ width: `${movieProgress * 100}%` }}
          ></div>
          <div
            className={classes.loadedTime}
            style={{ width: `${loadedPart * 100}%` }}
          ></div>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={movieProgress}
            onChange={changePlaybackMomentHandle}
          />
        </div>
        <div className={classes.movieTime}>{displayMovieProgress}/{displayMovieDuration}</div>
      </div>
    </div>
  );
};

export default MovieTrailer;
