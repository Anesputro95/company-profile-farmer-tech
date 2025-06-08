"use client";

import React, { useState, useEffect } from "react";
import { apiCall } from "@/app/utils/apiHelper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface IBlogPost {
    objectId: string;
    title: string;
    content: string;
    thumbnail?: string;
}

interface BlogDetailClientProps {
    id: string;
}

const BlogDetailClient: React.FC<BlogDetailClientProps> = ({ id }) => {
    const router = useRouter();
    const [data, setData] = useState<IBlogPost | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [blogDetail, setBlogDetail] = useState<IBlogPost | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, []);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await apiCall.get("/api/data/BlogPost", {
                    params: { where: `objectId = '${id}'` },
                });
                const blog = response.data[0];
                if (!blog) {
                    console.error("Blog not found");
                    return;
                }
                setData(blog);
                setBlogDetail(blog);
            } catch (error) {
                console.error("Error fetching blog detail:", error);
            }
        };
        fetchBlog();
    }, [id]);

    const onBtnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBlogDetail((prev) => (prev ? { ...prev, [name]: value } : null));
    };

    const onBtnEdit = () => setIsEditing(true);
    const onBtnCancel = () => {
        setBlogDetail(data);
        setThumbnailFile(null);
        setPreviewThumbnail(null);
        setIsEditing(false);
    };

    const onBtnSave = async () => {
        if (!blogDetail) return;

        if (!blogDetail.title.trim() || !blogDetail.content.trim()) {
            alert("Judul dan konten tidak boleh kosong");
            return;
        }

        setLoading(true);

        try {
            let uploadedThumbnailUrl = blogDetail.thumbnail;

            if (thumbnailFile) {
                const formData = new FormData();
                formData.append("file", thumbnailFile);

                const uploadRes = await apiCall.post("/api/files/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                uploadedThumbnailUrl = uploadRes.data.fileURL;
            }

            const updatedBlog = {
                ...blogDetail,
                thumbnail: uploadedThumbnailUrl,
            };

            const res = await apiCall.put(`/api/data/BlogPost/${blogDetail.objectId}`, updatedBlog);
            setData(res.data);
            setBlogDetail(res.data);
            setThumbnailFile(null);
            setPreviewThumbnail(null);
            setIsEditing(false);
            alert("Blog berhasil diupdate");
        } catch (error) {
            console.error("Error saving blog:", error);
            alert("Gagal menyimpan blog");
        } finally {
            setLoading(false);
        }
    };

    const onBtnDelete = async (id: string) => {
        const confirmed = confirm("Yakin ingin menghapus blog ini?");
        if (!confirmed) return;

        setLoading(true);
        try {
            await apiCall.delete(`/api/data/BlogPost/${id}`);
            alert("Blog berhasil dihapus");
            router.push("/blog");
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Gagal menghapus blog");
        } finally {
            setLoading(false);
        }
    };

    if (!blogDetail) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#0f0f0f] text-gray-300">
                <p className="text-xl font-light">Loading...</p>
            </div>
        );
    }

    const ActionButton = ({
        onClick,
        label,
        className,
        disabled,
    }: {
        onClick: () => void;
        label: string;
        className: string;
        disabled?: boolean;
    }) => (
        <Button className={className} onClick={onClick} disabled={disabled}>
            {label}
        </Button>
    );

    return (
        <div className="bg-[#0f0f0f] text-gray-100 py-20 px-6 md:px-24 lg:px-48 space-y-10">
            {/* Thumbnail */}
            <div className="overflow-hidden rounded-2xl shadow-2xl">
                {isEditing && userRole === "admin" ? (
                    <div className="space-y-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setThumbnailFile(file);
                                if (file) {
                                    const fileURL = URL.createObjectURL(file);
                                    setPreviewThumbnail(fileURL);
                                }
                            }}
                            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
                        />
                        {(previewThumbnail || blogDetail.thumbnail) && (
                            <img
                                src={previewThumbnail || blogDetail.thumbnail}
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
                {isEditing && userRole === "admin" ? (
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
                {isEditing && userRole === "admin" ? (
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

            {/* Action Buttons */}
            <div className="flex gap-6 flex-wrap">
                {userRole === "admin" && !isEditing && (
                    <>
                        <ActionButton
                            label="Edit"
                            onClick={onBtnEdit}
                            className="bg-green-500 hover:bg-green-800"
                        />
                        <ActionButton
                            label="Delete"
                            onClick={() => onBtnDelete(blogDetail.objectId)}
                            className="bg-red-700 hover:bg-red-950"
                            disabled={loading}
                        />
                    </>
                )}
                {isEditing && userRole === "admin" && (
                    <>
                        <ActionButton
                            label={loading ? "Saving..." : "Save"}
                            onClick={onBtnSave}
                            className="bg-blue-500 hover:bg-blue-700"
                            disabled={loading}
                        />
                        <ActionButton
                            label="Cancel"
                            onClick={onBtnCancel}
                            className="bg-gray-600 hover:bg-gray-800"
                            disabled={loading}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogDetailClient;
