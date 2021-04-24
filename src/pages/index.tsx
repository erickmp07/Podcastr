import { api } from "../services/api";
import styles from "./home.module.scss";
import { GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

type Episode = {
    id: string;
    title: string;
    thumbnail: string;
    members: string;
    publishedAt: string;
    duration: number;
    durationAsString: string;
    description: string;
    url: string
};

type HomeProps = {
    latestEpisodes: Episode[];
    allEpisodes: Episode[];
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
    return (
        <div className={styles.homepage}>
            <section className={styles.latestEpisodes}>
                <h2>Latest episodes</h2>

                <ul>
                    {latestEpisodes.map(episode => {
                        return (
                            <li key={episode.id}>
                                <img src={episode.thumbnail} alt={episode.title} title={episode.title} />

                                <div className={styles.episodeDetails}>
                                    <a href="">{episode.title}</a>
                                    <p>{episode.members}</p>
                                    <span>{episode.publishedAt}</span>
                                    <span>{episode.durationAsString}</span>
                                </div>

                                <button type="button">
                                    <img src="/play-green.svg" alt="Play episode" title="Play episode" />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </section>

            <section className={styles.allEpisodes}>

            </section>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await api.get("episodes", {
        params: {
            _limit: 12,
            _sort: "published_at",
            _order: "desc"
        }
    });

    const episodes = data.map(episode => {
        return {
            id: episode.id,
            title: episode.title,
            thumbnail: episode.thumbnail,
            members: episode.members,
            publishedAt: format(
                parseISO(episode.published_at), "d MMM yy", { locale: enUS }),
            duration: Number(episode.file.duration),
            durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
            description: episode.description,
            url: episode.file.url
        };
    });

    const latestEpisodes = episodes.slice(0, 2);
    const allEpisodes = episodes.slice(2, episodes.length);

    return {
        props: {
            latestEpisodes,
            allEpisodes
        },
        revalidate: 60 * 60 * 8
    };
}