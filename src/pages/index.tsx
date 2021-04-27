import { api } from "../services/api";
import styles from "./home.module.scss";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";
import { PlayerContext } from "../contexts/PlayerContext";
import { useContext } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import enUS from "date-fns/locale/en-US";

type Episode = {
    id: string;
    title: string;
    thumbnail: string;
    members: string;
    publishedAt: string;
    duration: number;
    durationAsString: string;
    url: string;
};

type HomeProps = {
    latestEpisodes: Episode[];
    allEpisodes: Episode[];
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
    const { playList } = useContext(PlayerContext);

    const episodes = [...latestEpisodes, ...allEpisodes];
    
    return (
        <div className={styles.homepage}>
            <section className={styles.latestEpisodes}>
                <h2>Latest episodes</h2>

                <ul>
                    {latestEpisodes.map((episode, index) => {
                        return (
                            <li key={episode.id}>
                                <Image 
                                    width={192} 
                                    height={192} 
                                    objectFit="cover"
                                    src={episode.thumbnail} 
                                    alt={episode.title} 
                                    title={episode.title} 
                                />

                                <div className={styles.episodeDetails}>
                                    <Link href={`/episodes/${episode.id}`}>
                                        <a>{episode.title}</a>
                                    </Link>
                                    <p>{episode.members}</p>
                                    <span>{episode.publishedAt}</span>
                                    <span>{episode.durationAsString}</span>
                                </div>

                                <button type="button" onClick={() => playList(episodes, index)}>
                                    <img src="/play-green.svg" alt="Play episode" title="Play episode" />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </section>

            <section className={styles.allEpisodes}>
                <h2>All episodes</h2>

                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Podcast</th>
                            <th>Members</th>
                            <th>Date</th>
                            <th>Duration</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allEpisodes.map((episode, index) => {
                            return (
                                <tr key={episode.id}>
                                    <td style={{ width: 72 }}>
                                        <Image 
                                            width={120}
                                            height={120}
                                            objectFit="cover"
                                            src={episode.thumbnail}
                                            alt={episode.title}
                                            title={episode.title}
                                        />
                                    </td>
                                    <td>
                                        <Link href={`/episodes/${episode.id}`}>
                                            <a>{episode.title}</a>
                                        </Link>
                                    </td>
                                    <td>{episode.members}</td>
                                    <td style={{ width: 100 }}>{episode.publishedAt}</td>
                                    <td>{episode.durationAsString}</td>
                                    <td>
                                        <button type="button" onClick={() => playList(episodes, index + latestEpisodes.length)}>
                                            <img src="/play-green.svg" alt="Play episode" title="Play episode" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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