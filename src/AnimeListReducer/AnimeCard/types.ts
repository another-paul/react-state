import { Anime } from "../types";

export interface AnimeCardProps {
    id: string,
    name: string;
    watched: boolean;
    onWatchedClick: (_animeId: Anime["id"]) => void;
}