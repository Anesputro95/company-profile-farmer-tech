"use client"; 

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
                const res = await apiCall.get("/api/data/BlogPost?sortBy=createdAt%20desc");
                console.log(res.data)
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
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {blogs.map((blog) => (
                            <li key={blog.objectId} className="group">
                                <Link href={`/blog/${blog.objectId}`} className="block h-full">
                                    <article className="bg-white rounded-2xl p-6 shadow-lg h-full flex flex-col 
                                                        group-hover:shadow-xl group-hover:scale-[1.02] 
                                                        transition-all duration-300 cursor-pointer relative top-4">
                                        {blog.thumbnail && (
                                            <figure className="mb-4 overflow-hidden rounded-xl">
                                                <img
                                                    src={blog.thumbnail}
                                                    alt={blog.title || "Blog thumbnail"}
                                                    className="w-full h-52 object-cover"
                                                    loading="lazy"
                                                />
                                            </figure>
                                        )}
                                        
                                        <div className="flex-grow">
                                            <h2 className="text-2xl font-bold text-green-900 mb-2 line-clamp-2">
                                                {blog.title}
                                            </h2>

                                            <time className="text-sm text-green-500 mb-4 block">
                                                {new Date(blog.createdAt).toLocaleDateString("id-ID", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </time>

                                            <p className="text-gray-700 leading-relaxed line-clamp-4">
                                                {blog.content}
                                            </p>
                                        </div>
                                    </article>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}