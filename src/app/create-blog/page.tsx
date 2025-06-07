"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiCall } from "../utils/apiHelper";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function CreateBlog() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    if (role !== "admin") {
      router.push("/blog");
    }
  }, [router]);

  const handleSubmit = async () => {
    if (!title || !content || !thumbnailFile) {
      alert("Judul, Konten, dan Thumbnail harus diisi.");
      return;
    }

    setLoading(true);
    try {
      // Upload thumbnail
      const formData = new FormData();
      formData.append("file", thumbnailFile);

      const uploadRes = await apiCall.post(
        `/api/files/blog-thumbnails/${thumbnailFile.name}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const thumbnailURL = uploadRes.data.fileURL;

      // Simpan blog
      const blogData = {
        title,
        content,
        thumbnail: thumbnailURL,
        createdAt: new Date().toISOString(),
      };

      await apiCall.post("/api/data/BlogPost", blogData);

      alert("Blog berhasil dibuat!");
      router.push("/blog");
    } catch (error: any) {
      console.error("Error menyimpan blog:", error.response?.data || error.message);
      alert("Terjadi kesalahan saat membuat blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-gray-900 p-6">
      <div className="relative bottom-6 max-w-3xl mx-auto bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl mt-20 border border-emerald-300">
        <h1 className="text-5xl font-serif font-bold text-center text-emerald-800 mb-10 drop-shadow-lg">
          Buat Blog Baru
        </h1>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Upload Thumbnail */}
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-800">
              Thumbnail Gambar
            </label>
            <div className="flex items-center gap-4 bg-gray-100 border-2 border-dashed border-emerald-400 px-4 py-6 rounded-xl hover:border-emerald-600 transition">
              <Upload className="text-emerald-600 w-6 h-6" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setThumbnailFile(file);
                }}
                className="w-full bg-transparent text-sm text-gray-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Judul */}
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-800">
              Judul Blog
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
              placeholder="Masukkan judul blog"
            />
          </div>

          {/* Konten */}
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-800">
              Konten
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis konten blog di sini..."
              className="w-full h-56 px-4 py-3 rounded-xl border border-gray-300 resize-none focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
            />
          </div>

          {/* Tombol Simpan */}
          <div className="pt-4">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold py-3 rounded-xl shadow-md transition duration-300 disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Simpan Blog"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
