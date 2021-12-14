export interface AnimeCardProps {
    id: string,
    name: string;
    watched: boolean;
    onWatchedClick: () => void;
}