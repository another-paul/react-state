import { Anime } from "../types";

export interface AnimeContext {
    animes: Anime[];
    addAnime: (_anime: Anime) => void;
    toggleAnimeWatched: (_animeID: Anime["id"]) => void;
}