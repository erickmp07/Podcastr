import { createContext, useState } from "react";

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData = {
    episodes: Episode[],
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }) {
    const [episodes, setEpisodes] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    function play(episode) {
        setEpisodes([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    return (
        <PlayerContext.Provider value={{ episodes, currentEpisodeIndex, isPlaying, play, togglePlay, setPlayingState }}>
            {children}
        </PlayerContext.Provider>
    );
            
}