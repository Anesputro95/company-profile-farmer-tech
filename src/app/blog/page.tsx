"use client"; // untuk Next.js App Router

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiCall } from "../utils/apiHelper";

export interface Blog {
    objectId: string;
    title: string;
    thumbnail?: string;
    content: string;
    createdAt: string;
}

export default function BlogListPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Cek role user
    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, []);

    // Ambil data blog
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await apiCall.get("/api/data/BlogPosts?sortBy=createdAt%20desc");
                setBlogs(res.data);
            } catch (err) {
                console.error(err);
                setError("Gagal memuat daftar blog.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg text-gray-500 animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-emerald-600 via-teal-700 to-green-800 py-12 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-extrabold text-white mb-12 tracking-tight drop-shadow-lg relative top-12">
                    Daftar Blog
                </h1>

                {userRole === "admin" && (
                    <Link href="/create-blog">
                        <button className="mb-10 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl relative top-12 cursor-pointer">
                            Buat Blog Baru
                        </button>
                    </Link>
                )}

                {error && <p className="text-red-300 text-center">{error}</p>}

                {blogs.length === 0 ? (
                    <p className="text-center text-xl text-green-200 mt-20">Belum ada blog.</p>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 relative top-12">
                        {blogs.map((blog) => (
                            <Link key={blog.objectId} href={`/blog/${blog.objectId}`}>
                                <li className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                                    {blog.thumbnail && (
                                        <img
                                            src={blog.thumbnail}
                                            alt="Thumbnail"
                                            className="w-full h-52 object-cover rounded-xl mb-4"
                                        />
                                    )}
                                    <h2 className="text-2xl font-bold text-green-900 mb-2">{blog.title}</h2>
                                    <p className="text-sm text-green-500 mb-4">
                                        {new Date(blog.createdAt).toLocaleDateString("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                    <p className="text-gray-700 leading-relaxed text-justify">
                                        {blog.content.length > 250
                                            ? blog.content.slice(0, 250) + "..."
                                            : blog.content}
                                    </p>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
