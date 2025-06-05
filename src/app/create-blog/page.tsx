"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);

    // Cek jika bukan admin, redirect
    if (role !== "admin") {
      alert("Akses ditolak. Halaman ini hanya untuk admin.");
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div className="p-10 text-center">Memuat...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-950 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-6">Buat Blog Baru</h1>
        {/* Form isi blog */}
        <form>
          
          <input
            type="text"
            placeholder="Judul Blog"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
          />
          <textarea
            placeholder="Isi blog..."
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 h-40"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
