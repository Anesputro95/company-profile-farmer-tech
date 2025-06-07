"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from 'lucide-react';
import { useRef, useState, useEffect } from "react";
import { apiCall } from "../utils/apiHelper";
import { useRouter } from "next/navigation";



interface ISignUp {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    objectID?: string;
}

export default function SignUpPage() {
    const router = useRouter();

    const inputFirstNameRef = useRef<HTMLInputElement>(null);
    const inputLastNameRef = useRef<HTMLInputElement>(null);
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const inputConfirmPasswordRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const btnSignUp = async () => {
        try {
            const firstname = inputFirstNameRef.current?.value;
            const lastname = inputLastNameRef.current?.value;
            const email = inputEmailRef.current?.value;
            const password = inputPasswordRef.current?.value;
            const confirmpassword = inputConfirmPasswordRef.current?.value;

            const adminEmails = ["admin@mail.com"];

            if(email && adminEmails.includes(email)){
                throw "Email tersebut tidak di izinkan untuk pendaftaran"
            }

            //memastikan form input sudah di isi
            if (firstname && lastname && email && password && confirmpassword) {
                // memastikan password dan confirmation password nilainya sama
                if (password === confirmpassword) {
                    const response = await apiCall.post("/api/data/User", {
                        firstname,
                        lastname,
                        email,
                        password,
                        role: "user"
                    });
                    console.log(response.data);

                    router.replace("/sign-in")

                    alert('Pendaftaran Berhasil')
                } else {
                    throw "Password dan Confirmation Password tidak sesuai"
                }
            } else {
                throw "Isi Semua Form"
            }
        } catch (error: any) {
            console.log(error);
            alert(error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">First Name</Label>
                        <Input
                            type="text"
                            ref={inputFirstNameRef}
                            id="FirstName"
                            placeholder="enter your first name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Last Name</Label>
                        <Input
                            type="text"
                            ref={inputLastNameRef}
                            id="LastName"
                            placeholder="enter your last name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
                <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        ref={inputEmailRef}
                        id="email"
                        placeholder="enter your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <Label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</Label>
                    <div className="flex">
                        <Input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            ref={inputPasswordRef}
                            placeholder="enter password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <Button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <Label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Confirm Your Password</Label>
                    <div className="flex">
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            ref={inputConfirmPasswordRef}
                            id="password"
                            placeholder="confirm password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required

                        />
                        <Button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                    </div>
                </div>
                <Button
                    type="submit"
                    className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    onClick={btnSignUp}
                >
                    Sign Up
                </Button>
            </div>

        </div>
    )
}