"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiCall, Base_URL_API, APP_ID, APP_KEY } from "../utils/apiHelper";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { Blog } from "../blog/page";


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
    if (role !== 'admin') {
      router.push("/blog");
    }
  }, [router]);

  const handleSubmit = async () => {

    if (!title || !content || !thumbnailFile) {
      alert('Judul, Konten, Thumbnail harus di isi');
      return;
    }

    setLoading(true)

    try {
      // 1. upload thumbnail 
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

      // 2. simpan url file thumbnail
      const thumbnailURL = `${Base_URL_API}/api/files/blog-thumbnails/${thumbnailFile.name}`;

      // 3. simpan blog ke database
      const blogData = {
        title,
        content,
        thumbnail: thumbnailURL,
        createdAt: new Date().toISOString(),
        objectId: "",
      };

      await apiCall.post("/api/data/BlogPosts", blogData)

      alert("Blog Berhasil dibuat")
      router.push("/blog")

    } catch (error: any) {
      console.log(error)
      alert("Terjadi kesalahan membuat halaman Blog")
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="min-h-screen bg-gradient-to-r from-green-700 to-teal-900 p-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-lg mt-20">
        <h1 className="flex justify-center text-center text-4xl font-bold text-green-800">Buat Blog Baru</h1>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* input thumbnail */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Thumbnail URL</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setThumbnailFile(file);
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
            />
          </div>

          {/* input title */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* input content */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Konten</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-48 resize-none"
            >

            </Textarea>
          </div>

          <Button
            className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md disabled:opacity-50"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Menyimpan..." : "Simpan Blog"}
          </Button>
        </form>

      </div>
    </div>
  )
}