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
  const playerRef = useRef(null);

  const switchPlayHandle = () => {
    setIsPlaying(!isPlaying);
  };

  const movieProgressHandler = (state) => {
    setMovieProgress(state.played);
    setLoadedPart(state.loaded);
  };

  const changePlaybackMomentHandle = (e) => {
    const seekTime = e.target.value;
    setMovieProgress(seekTime);
    playerRef.current.seekTo(parseFloat(seekTime));
  };

  const setDurationHandle = (e) => {
    const minutes = Math.floor(e / 60);
    const seconds = e % 60;
    setDisplayMovieDration(`${minutes}:${seconds}`);
  };

  const toggleFullscreen = () => {
    const playerElement = playerRef.current.wrapper;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (playerElement.requestFullscreen) {
        playerElement.requestFullscreen();
      } else if (playerElement.mozRequestFullScreen) {
        // Firefox
        playerElement.mozRequestFullScreen();
      } else if (playerElement.webkitRequestFullscreen) {
        // Chrome, Safari, Opera
        playerElement.webkitRequestFullscreen();
      } else if (playerElement.msRequestFullscreen) {
        // IE/Edge
        playerElement.msRequestFullscreen();
      }
    }
  };

  return (
    <div className={classes.trailerContainer}>
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width="100%"
        height="600px"
        light={true}
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
          <FontAwesomeIcon icon={faExpand} onClick={toggleFullscreen} />
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
        <div className={classes.movieTime}>{displayMovieDuration}</div>
      </div>
    </div>
  );
};

export default MovieTrailer;
