"use client";
import React, { useState, useEffect } from "react";
import { apiCall } from "@/app/utils/apiHelper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { on } from "events";

interface IBlogPost {
    objectId: string;
    title: string;
    content: string;
    thumbnail?: string;
}

interface IBlogDetailProps {
    params: { id: string };
}

const BlogDetailPage: React.FC<IBlogDetailProps> = ({ params }) => {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isEditing, setIsEditing] = useState(false)
    const [blogDetail, setBlogDetail] = useState<IBlogPost | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, []);


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await apiCall.get("/api/data/BlogPost", {
                    params: {
                        where: `objectId = '${params.id}'`,
                    },
                });
                const blog = response.data[0]
                setData(blog);
                setBlogDetail(blog)
            } catch (error) {
                console.error("Error fetching blog detail:", error);
            }
        };

        fetchBlog();
    }, [params.id]);

    const onBtnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBlogDetail(prev => prev ? { ...prev, [name]: value } : null);
    }

    const onBtnEdit = () => setIsEditing(true);
    const onBtnCancel = () => {
        setBlogDetail(data);
        setThumbnailFile(null);
        setIsEditing(false);
    }

    const onBtnSave = async () => {
        if (!blogDetail) return;

        try {
            let uploadedThumbnailUrl = blogDetail.thumbnail;

            if (thumbnailFile) {
                const formData = new FormData();
                formData.append("file", thumbnailFile);

                const uploadRes = await apiCall.post("/api/files/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                uploadedThumbnailUrl = uploadRes.data.fileURL; // Sesuaikan struktur respons API upload-mu
            }

            const updatedBlog = {
                ...blogDetail,
                thumbnail: uploadedThumbnailUrl,
            };

            const res = await apiCall.put(`/api/data/BlogPost/${blogDetail.objectId}`, updatedBlog);
            setData(res.data);
            setBlogDetail(res.data);
            setThumbnailFile(null); // Reset file setelah upload
            setIsEditing(false);
            alert("Blog berhasil diupdate");
        } catch (error) {
            console.error("Error saving blog:", error);
            alert("Gagal menyimpan blog");
        }
    };



    const onBtnDelete = async (id: string) => {
        try {
            await apiCall.delete(`/api/data/BlogPost/${id}`);
            alert("Blog deleted");
            router.push("/blog");
        } catch (error) {
            console.log(error);
        }
    };

    if (!blogDetail) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#0f0f0f] text-gray-300">
                <p className="text-xl font-light">Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#0f0f0f] text-gray-100 py-20 px-6 md:px-24 lg:px-48 space-y-10">
            {/* Thumbnail */}
            <div className="overflow-hidden rounded-2xl shadow-2xl">
                {isEditing ? userRole === "admin" && (
                    <div className="space-y-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setThumbnailFile(file);

                                // Optional: preview langsung
                                if (file) {
                                    const fileURL = URL.createObjectURL(file);
                                    setBlogDetail(prev => prev ? { ...prev, thumbnail: fileURL } : null);
                                }
                            }}
                            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
                        />

                        {/* Preview Thumbnail */}
                        {blogDetail.thumbnail && (
                            <img
                                src={blogDetail.thumbnail}
                                alt="Thumbnail Preview"
                                className="w-full h-[300px] object-cover rounded-lg"
                            />
                        )}
                    </div>
                ) : (
                    blogDetail.thumbnail && (
                        <figure className="mb-4 overflow-hidden rounded-xl">
                            <img
                                src={blogDetail.thumbnail}
                                alt={blogDetail.title || "Blog thumbnail"}
                                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                        </figure>
                    )
                )}

            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-semibold text-white leading-tight tracking-wide">
                {isEditing ? userRole === "admin" && (
                    <input
                        type="text"
                        name="title"
                        value={blogDetail.title}
                        onChange={onBtnChange}
                        className="w-full bg-gray-900 text-white p-2 rounded border border-gray-700"
                    />
                ) : (
                    blogDetail.title
                )}
            </h1>

            {/* Content */}
            <div className="text-lg md:text-xl font-light leading-relaxed text-gray-300 whitespace-pre-line tracking-wide">
                {isEditing ? userRole === "admin" && (
                    <textarea
                        name="content"
                        value={blogDetail.content}
                        onChange={onBtnChange}
                        rows={10}
                        className="w-full bg-gray-900 text-white p-2 rounded border border-gray-700 resize-y"
                    />
                ) : (
                    blogDetail.content
                )}
            </div>

            {/* Buttons */}
            <div className="flex gap-6">
                { userRole === "admin" && (
                    <Button
                        className="bg-red-700 w-22 cursor-pointer hover:bg-red-950"
                        onClick={() => onBtnDelete(blogDetail.objectId)}
                        disabled={isEditing}
                    >
                        Delete
                    </Button>
                )}


                {!isEditing ? userRole === "admin" && (
                    <Button
                        className="bg-green-500 w-22 cursor-pointer hover:bg-green-900"
                        onClick={onBtnEdit}
                    >
                        Edit
                    </Button>
                ) : (
                    <>
                        <Button
                            className="bg-blue-500 w-22 cursor-pointer hover:bg-blue-700"
                            onClick={onBtnSave}
                        >
                            Save
                        </Button>
                        <Button
                            className="bg-gray-600 w-22 cursor-pointer hover:bg-gray-800"
                            onClick={onBtnCancel}
                        >
                            Cancel
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogDetailPage;