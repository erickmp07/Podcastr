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
    isLooping: boolean;
    isShuffling: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    play: (episode: Episode) => void;
    playList: (episodes: Episode[], index: number) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
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
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

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

    function toggleLoop() {
        setIsLooping(!isLooping);
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    const hasPrevious = currentEpisodeIndex - 1 >= 0;
    const hasNext = currentEpisodeIndex + 1 < episodes.length;

    function playNext() {
        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodes.length);

            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
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
            isLooping,
            isShuffling,
            hasNext, 
            hasPrevious,
            play,
            playList, 
            togglePlay,
            toggleLoop, 
            toggleShuffle,
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