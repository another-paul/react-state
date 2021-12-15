import React, { useReducer, useCallback } from "react";

import { createUseStyles } from "react-jss";
import { v4 as uuidv4 } from "uuid";

import AnimeCard from "./AnimeCard";
import { ANIME_ADD, ANIME_WATCHED } from "./constants";
import NewAnime from "./NewAnime";
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
  const classes = useStyles();

  // With useCallback we get the same callback function each time unless one of its dependencies changes.
  // We this we can take advatange of React.memo since we ensure that the function didn't change, internally is the same function
  // same memory reference.
  const handleAddAnime = useCallback(
    (anime: Anime) => {
      dispatch(
        // the only requirements for the object is that it contains a "type" key
        // the rest is free
        {
          type: ANIME_ADD,
          payload: anime,
        }
      );
    },
    // We can't use useCallback when we use useState because the function will also depend on the animes list
    // and since the anime list changes constantly we will get a new function every single time, by consequence the props
    // of the other components will change and trigger a rerender.
    [dispatch]
  );

  // A React hook, like useCallback must be called on top level function, that means that we can't call it inside another function.
  // If we do that we have the risk of "rendering" a different amount of hooks during execution.
  const handleAnimeWatched = useCallback(
    (id: Anime["id"]) => {
      dispatch({
        type: ANIME_WATCHED,
        payload: {
          id,
        },
      });
    },
    [dispatch]
  );

  return (
    <div className={classes.list}>
      {/* By moving the form to its own component we avoid rerendering the whole list when we type something since the name input is connected to the state */}
      <NewAnime onAddAnime={handleAddAnime} />

      <h2>Animes: {animes.length}</h2>

      <div>
        {animes.map((anime) => (
          <AnimeCard
            key={anime.id}
            id={anime.id}
            name={anime.name}
            watched={anime.watched}
            onWatchedClick={handleAnimeWatched}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimeListReducer;
