import styles from "./styles.module.scss";

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="Podcastr" title="Podcastr logo" />

            <p>The best for you to listen, always</p>

            <span>Th., April 8th</span>
        </header>
    );
}