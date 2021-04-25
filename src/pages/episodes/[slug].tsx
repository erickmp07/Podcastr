import { api } from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import { GetStaticProps } from "next";
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
    description: string;
    url: string;
};

type EpisodeProps = {
    episode: Episode;
};

export default function Episode({ episode }: EpisodeProps) {
    return (
        <h1>{episode.title}</h1>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params;
    
    const { data } = await api.get(`/episodes/${slug}`);

    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(
            parseISO(data.published_at), "d MMM yy", { locale: enUS }),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url
    }

    return {
        props: {
            episode
        },
        revalidate: 60 * 60 * 24
    };
}