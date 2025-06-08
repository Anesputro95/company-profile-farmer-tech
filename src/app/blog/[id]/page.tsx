import BlogDetailClient from "./BlogDetailClient";``

interface Props {
    params: {
        id: string;
    };
}

export default function BlogDetailPage({ params }: Props) {
    return <BlogDetailClient blogId={params.id} />;
}
