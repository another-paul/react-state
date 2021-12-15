import React from "react";

import { createUseStyles } from "react-jss";

import { AnimeCardProps } from "./types";

const useStyles = createUseStyles({
  card: {
    backgroundColor: "#285b68",
    padding: "8px 16px",
    display: "flex",
    flexFlow: "column",
    marginTop: "16px",
  },
  name: {
    margin: 0,
  },
  watchedContainer: {
    display: "flex",
    flexFlow: "row",
    fontSize: "14px",
  },
});

const AnimeCard: React.FC<AnimeCardProps> = React.memo(
  ({ id, name, watched, onWatchedClick }: AnimeCardProps) => {
    const classes = useStyles();
    console.log("Rendering", id);

    const handleAnimeWatched = () => {
      onWatchedClick(id);
    };

    return (
      <div className={classes.card}>
        <h3 className={classes.name}>{name}</h3>
        <div className={classes.watchedContainer}>
          <label htmlFor={id}>
            Watched
            <input
              id={id}
              type="checkbox"
              checked={watched}
              onChange={handleAnimeWatched}
            />
          </label>
        </div>
      </div>
    );
  }
);

export default AnimeCard;
