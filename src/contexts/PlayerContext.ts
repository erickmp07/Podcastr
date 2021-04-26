import { createContext } from "react";

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: string;
    url: string;
};

type PlayerContextData = {
    episodes: Episode[],
    currentEpisodeIndex: number;
};

export const PlayerContext = createContext({} as PlayerContextData);