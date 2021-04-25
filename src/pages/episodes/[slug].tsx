import { api } from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";
import enUS from "date-fns/locale/en-US";

export default function Episode() {
    const router = useRouter();

    return (
        <h1>{router.query.slug}</h1>
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