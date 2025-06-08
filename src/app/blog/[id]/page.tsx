import BlogDetailClient from "./BlogDetailClient";

interface PageProps {
  params: {
    id: string;
  };
}

export default function BlogDetailPage({ params }: PageProps) {
  return <BlogDetailClient id={params.id} />;
}

