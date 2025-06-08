"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiCall } from "@/app/utils/apiHelper";
import { Button } from "@/components/ui/button";

interface IBlogPost {
    objectId: string;
    title: string;
    content: string;
    thumbnail?: string;
}

const BlogDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [blog, setBlog] = useState<IBlogPost | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUserRole(localStorage.getItem("userRole"));

        const fetchBlog = async () => {
            try {
                const response = await apiCall.get("/api/data/BlogPost", {
                    params: { where: `objectId = '${id}'` },
                });
                const blogData = response.data[0];
                if (!blogData) {
                    console.error("Blog not found");
                    return;
                }
                setBlog(blogData);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        if (id) fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        if (!blog) return;
        const confirmed = confirm("Yakin ingin menghapus blog ini?");
        if (!confirmed) return;

        setLoading(true);
        try {
            await apiCall.delete(`/api/data/BlogPost/${blog.objectId}`);
            alert("Blog berhasil dihapus");
            router.push("/blog");
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Gagal menghapus blog");
        } finally {
            setLoading(false);
        }
    };

    if (!blog) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#0f0f0f] text-gray-300">
                <p className="text-xl font-light">Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#0f0f0f] text-gray-100 py-20 px-6 md:px-24 lg:px-48 space-y-10">
            {/* Thumbnail */}
            {blog.thumbnail && (
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                    <figure className="mb-4 overflow-hidden rounded-xl">
                        <img
                            src={blog.thumbnail}
                            alt={blog.title || "Blog thumbnail"}
                            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                        />
                    </figure>
                </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-semibold text-white leading-tight tracking-wide">
                {blog.title}
            </h1>

            {/* Content */}
            <div className="text-lg md:text-xl font-light leading-relaxed text-gray-300 whitespace-pre-line tracking-wide">
                {blog.content}
            </div>

            {/* Action Buttons */}
            {userRole === "admin" && (
                <div className="flex gap-6 flex-wrap mt-6">
                    <Button
                        className="bg-green-500 hover:bg-green-800"
                        onClick={() => router.push(`/blog/edit/${blog.objectId}`)}
                    >
                        Edit
                    </Button>
                    <Button
                        className="bg-red-700 hover:bg-red-950"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default BlogDetailPage;
