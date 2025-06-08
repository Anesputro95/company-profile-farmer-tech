import BlogDetailClient from "./BlogDetailClient";``

interface Props {
    params: {
        blogId: string;
    };
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default function BlogDetailPage({ params }: Props) {
    return <BlogDetailClient blogId={params.blogId} />;
}
