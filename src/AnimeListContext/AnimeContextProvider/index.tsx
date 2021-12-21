import React, { useReducer, useCallback } from "react";

import { v4 as uuidv4 } from "uuid";

import AnimeContext from "../AnimeContext";
import { ANIME_ADD, ANIME_WATCHED } from "../constants";
import { Anime, AnimeListAction } from "../types";
import { AnimeContextProviderProps } from "./types";

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

const AnimeContextProvider: React.FC<AnimeContextProviderProps> = ({
  children,
}) => {
  const [animes, dispatch] = useReducer(reducer, defaultAnimes);

  // We can wrap the functions with useCallback, but since the idea of having a Context provider
  // is to use the hook useContext, with that we no longer have props in the components, and now we can't use
  // React.memo to let React know that nothing change and the rerender is not needed.
  const addAnime = useCallback(
    (anime: Anime) => {
      dispatch({
        type: ANIME_ADD,
        payload: anime,
      });
    },
    [dispatch]
  );

  const toggleAnimeWatched = useCallback(
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

  // We can define the value for the Provider inline, but that is prompt to error, like forgetting the double curly braces
  // as good practice define it as constant and pass it through
  const value = {
    animes,
    addAnime,
    toggleAnimeWatched,
  };

  console.log("Rendering Context Provider");

  return (
    <AnimeContext.Provider value={value}>{children}</AnimeContext.Provider>
  );
};

export default AnimeContextProvider;
