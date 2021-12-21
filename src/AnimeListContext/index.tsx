import React, { useContext } from "react";

import { createUseStyles } from "react-jss";

import AnimeCard from "./AnimeCard";
import AnimeContext from "./AnimeContext";
import NewAnime from "./NewAnime";

const useStyles = createUseStyles({
  list: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const AnimeListContext: React.FC = () => {
  const classes = useStyles();
  const { animes } = useContext(AnimeContext);

  return (
    <div className={classes.list}>
      <NewAnime />

      <h2>Animes: {animes.length}</h2>

      <div>
        {animes.map((anime) => (
          <AnimeCard
            key={anime.id}
            id={anime.id}
            name={anime.name}
            watched={anime.watched}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimeListContext;
