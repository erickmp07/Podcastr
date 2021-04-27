import { createContext, ReactNode, useContext, useState } from "react";

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
    hasNext: boolean;
    hasPrevious: boolean;
    play: (episode: Episode) => void;
    playList: (episodes: Episode[], index: number) => void;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
    playNext: () => void;
    playPrevious: () => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
};

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodes, setEpisodes] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    function play(episode: Episode) {
        setEpisodes([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(episodes: Episode[], index: number) {
        setEpisodes(episodes);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    const hasPrevious = currentEpisodeIndex - 1 >= 0;
    const hasNext = currentEpisodeIndex + 1 < episodes.length;

    function playNext() {
        if (!hasNext) {
            return;
        }

        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }

    function playPrevious() {
        if (!hasPrevious) {
            return;
        }

        setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }

    return (
        <PlayerContext.Provider value={{ 
            episodes, 
            currentEpisodeIndex, 
            isPlaying, 
            hasNext, 
            hasPrevious,
            play,
            playList, 
            togglePlay, 
            setPlayingState,
            playNext,
            playPrevious }
        }>
            {children}
        </PlayerContext.Provider>
    );
            
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}