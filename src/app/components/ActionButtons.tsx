// components/ActionButtons.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { apiCall } from "@/app/utils/apiHelper";

interface ActionButtonsProps {
    objectId: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ objectId }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setIsAdmin(role === "admin");
    }, []);

    const handleDelete = async () => {
        const confirmDelete = confirm("Yakin ingin menghapus blog ini?");
        if (!confirmDelete) return;

        try {
            await apiCall.delete(`/api/data/BlogPost/${objectId}`);
            alert("Blog berhasil dihapus!");
            router.push("/"); // kembali ke halaman utama setelah delete
        } catch (err) {
            console.error("Gagal hapus:", err);
            alert("Terjadi kesalahan saat menghapus.");
        }
    };

    const handleEdit = () => {
        router.push(`/edit-blog/${objectId}`);
    };

    if (!isAdmin) return null;

    return (
        <div className="flex space-x-4 mt-10">
            <Button onClick={handleEdit} className="bg-yellow-500 hover:bg-yellow-600">
                Edit
            </Button>
            <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                Delete
            </Button>
        </div>
    );
};

export default ActionButtons;
