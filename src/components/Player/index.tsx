import styles from "./styles.module.scss";

export function Player() {
    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Now playing" />
                <strong>Now playing</strong>
            </header>

            <div className={styles.emptyPlayer}>
                <strong>Choose a podcast to listen</strong>
            </div>

            <footer></footer>            
        </div>
    );
}