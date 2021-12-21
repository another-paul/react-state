import { ANIME_ADD, ANIME_WATCHED } from "./constants";

export interface Anime {
    id: string,
    name: string;
    watched: boolean;
}
export type AnimeListActionsTypes = typeof ANIME_ADD | typeof ANIME_WATCHED;
export interface AnimeWatchedPayload {
    id: Anime["id"],
}
export interface AnimeListAction {
    type: AnimeListActionsTypes,
    payload: Anime | AnimeWatchedPayload
}