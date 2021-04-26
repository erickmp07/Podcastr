import { useContext } from "react";
import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { PlayerContext } from "../../contexts/PlayerContext";
import styles from "./styles.module.scss";

export function Player() {
    const { 
        episodes, 
        currentEpisodeIndex, 
        isPlaying, 
        togglePlay 
    } = useContext(PlayerContext);

    const episode = episodes[currentEpisodeIndex];

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Now playing" title="Now playing" />
                <strong>Now playing</strong>
            </header>

            { episode 
                ? (
                    <div className={styles.currentEpisode}>
                        <Image 
                            width={592} 
                            height={592} 
                            objectFit="cover" 
                            src={episode.thumbnail} 
                        />
                        <strong>{episode.title}</strong>
                        <span>{episode.members}</span>
                    </div>
                ) 
                : (
                    <div className={styles.emptyPlayer}>
                        <strong>Choose a podcast to listen</strong>
                    </div>
                ) }

            <footer className={!episode ? styles.empty : ""}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        { episode 
                            ? (
                                <Slider 
                                    trackStyle={{ backgroundColor: "#04d361" }}
                                    railStyle={{ backgroundColor: "#9f75ff" }}
                                    handleStyle={{ borderColor: "#04d361", borderWidth: 4 }}
                                />
                            ) 
                            : (
                                <div className={styles.emptySlider} />
                            ) }
                    </div>
                    <span>00:00</span>
                </div>

                { episode && (
                    <audio 
                        src={episode.url}
                        autoPlay
                     />
                ) }

                <div className={styles.buttons}>
                    <button type="button" disabled={!episode}>
                        <img src="/shuffle.svg" alt="Shuffle" title="Shuffle" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/play-previous.svg" alt="Previous" title="Previous" />
                    </button>
                    <button 
                        type="button" 
                        className={styles.playButton} 
                        disabled={!episode}
                        onClick={() => togglePlay()}
                    >
                        { isPlaying 
                            ? <img src="/pause.svg" alt="Pause" title="Pause" />
                            : <img src="/play.svg" alt="Play" title="Play" /> }
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/play-next.svg" alt="Next" title="Next" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/repeat.svg" alt="Repeat" title="Repeat" />
                    </button>
                </div>
            </footer>            
        </div>
    );
}