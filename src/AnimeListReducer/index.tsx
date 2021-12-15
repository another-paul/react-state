import React, { useState, useReducer } from "react";

import { createUseStyles } from "react-jss";
import { v4 as uuidv4 } from "uuid";

import AnimeCard from "../AnimeCard";
import { ANIME_ADD, ANIME_WATCHED } from "./constants";
import { Anime, AnimeListAction } from "./types";

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

// The advantage of using a useReducer instead of useState is that we can move our state management logic
// out of the component so we can easily test it without needing to mount the component. We just call the function and check
// we get the right return valued based on the type.
const reducer = (state: Anime[], action: AnimeListAction): Anime[] => {
  switch (action.type) {
    case ANIME_ADD:
      return [...state, action.payload as Anime];
    case ANIME_WATCHED:
      return state.map((anime) => {
        if (anime.id !== action.payload.id) return anime;
        // We need to create a new object to let React know that there is a change.
        return {
          ...anime,
          watched: !anime.watched,
        };
      });
    default:
      return state;
  }
};

const AnimeListReducer: React.FC = () => {
  const [animes, dispatch] = useReducer(reducer, defaultAnimes);
  const [animeName, setAnimeName] = useState("");
  const classes = useStyles();

  const handleAnimeNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setAnimeName(value);
  };

  const handleAddAnime = () => {
    dispatch(
      // the only requirements for the object is that it contains a "type" key
      // the rest is free
      {
        type: ANIME_ADD,
        payload: {
          id: uuidv4(),
          name: animeName,
          watched: false,
        },
      }
    );
    setAnimeName("");
  };

  const handleAnimeWatched = (id: string) => () => {
    dispatch({
      type: ANIME_WATCHED,
      payload: {
        id,
      },
    });
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

export default AnimeListReducer;
