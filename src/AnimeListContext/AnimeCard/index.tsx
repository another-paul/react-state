import React, { useContext } from "react";

import { createUseStyles } from "react-jss";

import AnimeContext from "../AnimeContext";
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

// Even if we have React.memo it will rerender every time since we are using useContext and the ContextProvider is rerender
// on every change to the anime list, creating a new context object.
const AnimeCard: React.FC<AnimeCardProps> = React.memo(
  ({ id, name, watched }: AnimeCardProps) => {
    const classes = useStyles();
    const { toggleAnimeWatched } = useContext(AnimeContext);

    console.log("Rendering", id);

    const handleAnimeWatched = () => {
      toggleAnimeWatched(id);
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
