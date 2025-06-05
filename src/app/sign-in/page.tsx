"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { EyeOff, Eye } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { apiCall } from "../utils/apiHelper";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"


const SignIn = () => {
    const { userName, isLoggedIn, logout } = useAuth();
    const router = useRouter();
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);

    const { login } = useAuth();

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        console.log("userRole from localStorage:", role);
        setUserRole(role);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showDialog) {
            timer = setTimeout(() => {
                setShowDialog(false);
                router.replace("/");
            }, 2500);
        }
        return () => clearTimeout(timer);
    }, [showDialog, router]);

    useEffect(() => {
        console.log("showDialog changed:", showDialog);
    }, [showDialog]);

    const onSignin = async () => {
        try {
            const email = inputEmailRef.current?.value;
            const password = inputPasswordRef.current?.value;

            if (email && password) {
                const response = await apiCall.get("/api/data/User", {
                    params: {
                        where: `email = '${email}' AND password = '${password}'`,
                    },
                });

                if (response.data?.length > 0) {
                    const user = response.data[0];

                    login(user.email, user.firstname);
                    localStorage.setItem("userRole", user.role)

                    setUserRole(user.role); // set state (optional)

                    setShowDialog(true);
                    console.log("Show Dialog:", true)
                } else {
                    alert("Email atau password salah");
                }
            }
        } catch (error) {
            console.log(error);
            alert("Terjadi kesalahan saat login.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-950">
            <div className="bg-green-200 p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign-In</h1>

                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" ref={inputEmailRef} placeholder="Masukkan Email Kamu" className="border-2 border-white" />
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="flex">
                        <Input
                            type={showPassword ? "text" : "password"}
                            ref={inputPasswordRef}
                            placeholder="Masukkan Password Kamu"
                            className="border-2 border-white"
                        />
                        <Button type="button" onClick={() => setShowPassword(!showPassword)} className="bg-green-700 hover:bg-green-400 cursor-pointer">
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                    </div>
                </div>

                <Button type="button" onClick={onSignin} className=" bg-green-700 hover:bg-green-400 cursor-pointer text-white">
                    Sign In
                </Button>

                <Link href="/sign-up">
                    <h1 className="text-center hover:underline text-blue-500">Create Account</h1>
                </Link>

                {/* Optional: tampilkan jika admin */}
                {userRole === "admin" && (
                    <p className="text-green-600 font-semibold text-center">
                        Anda login sebagai Admin
                    </p>
                )}
            </div>
            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent 
                className="bg-gradient-to-r from-emerald-600 via-teal-700 to-green-800"
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center text-3xl text-white">Login Berhasil</AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-white font-extralight">
                            Selamat datang kembali {userName}! Kamu akan diarahkan ke halaman utama.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
};

export default SignIn;
