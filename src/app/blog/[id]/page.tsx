import BlogDetailClient from "./BlogDetailClient";

interface Props {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function BlogDetailPage({ params }: Props) {
  return <BlogDetailClient objectId={params.id} />;
}
