import React, { useState } from "react";

import { createUseStyles } from "react-jss";
import { v4 as uuidv4 } from "uuid";

import AnimeCard from "./AnimeCard";
import { Anime } from "./types";

const defaultAnimes: Anime[] = [
  {
    id: uuidv4(),
    name: "Inuyasha",
    watched: false,
  },
  {
    id: uuidv4(),
    name: "Attack on titan",
    watched: false,
  },
];

const useStyles = createUseStyles({
  list: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const AnimeList: React.FC = () => {
  const [animes, setAnimes] = useState(defaultAnimes);
  const [animeName, setAnimeName] = useState("");
  const classes = useStyles();

  const handleAnimeNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setAnimeName(value);
  };

  const handleAddAnime = () => {
    // We need to create a new list to let React know there was a change
    setAnimes([
      ...animes,
      {
        id: uuidv4(),
        name: animeName,
        watched: false,
      },
    ]);
    setAnimeName("");
  };

  const handleAnimeWatched = (id: string) => () => {
    setAnimes(
      animes.map((anime) => {
        if (anime.id !== id) return anime;
        // We need to create a new object to let React know that there is a change.
        return {
          ...anime,
          watched: !anime.watched,
        };
      })
    );
  };

  return (
    <div className={classes.list}>
      <div>
        <input
          type="text"
          placeholder="name"
          value={animeName}
          onChange={handleAnimeNameChange}
        />
        <button type="button" onClick={handleAddAnime}>
          Add New Anime
        </button>
      </div>

      <h2>Animes: {animes.length}</h2>

      <div>
        {animes.map((anime) => (
          <AnimeCard
            key={anime.id}
            id={anime.id}
            name={anime.name}
            watched={anime.watched}
            onWatchedClick={handleAnimeWatched(anime.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
