import { Anime } from "../types";

export interface NewAnimeProps {
    // We needed to add an eslint rule to avoid getting the error of unused variables when typing a callback function
    onAddAnime: (_anime :Anime) => void;
}