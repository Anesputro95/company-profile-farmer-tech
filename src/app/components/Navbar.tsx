"use client";

import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CircleUserRound, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const { userName, isLoggedIn, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Menutup dropdown jika klik di luar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle logout
    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        router.push("/");
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-sm bg-opacity-30 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">

                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <Image src="/assets/logo.png" alt="Logo" width={40} height={40} />
                </Link>

                {/* Menu Desktop */}
                <ul className="hidden md:flex gap-6 text-green-500 text-sm font-medium">
                    <li>
                        <Link href="/about-us" className="hover:text-white active:text-white border-b-2 border-transparent hover:border-white active:border-white pb-1">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link href="/service-product" className="hover:text-white active:text-white border-b-2 border-transparent hover:border-white active:border-white pb-1">
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" className="hover:text-white active:text-white border-b-2 border-transparent hover:border-white active:border-white pb-1">
                            Blog
                        </Link>
                    </li>
                </ul>

                {/* User & Toggle */}
                <div className="flex items-center gap-4 relative">
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                aria-expanded={isDropdownOpen}
                                className="flex items-center gap-2 text-green-300 text-sm hover:text-green-400 transition-colors cursor-pointer"
                            >
                                Hi, {userName?.toUpperCase()}
                            </button>

                            {isDropdownOpen && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute right-0 mt-10 w-32 bg-black bg-opacity-80 rounded-md shadow-lg py-2 z-50"
                                >
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link href="/sign-in" className="hidden md:flex items-center text-green-500">
                            <CircleUserRound size={24} />
                        </Link>
                    )}

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 bg-black/20 backdrop-blur px-4 ${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
            >
                <ul className="flex flex-col gap-4 py-4 text-white text-sm font-medium">
                    <li><Link href="/about-us" onClick={() => setIsOpen(false)}>About Us</Link></li>
                    <li><Link href="/service-product" onClick={() => setIsOpen(false)}>Services</Link></li>
                    <li><Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link></li>
                    {isLoggedIn ? (
                        <li>
                            <Button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="w-full text-left text-red-400 cursor-pointer"
                            >
                                Logout
                            </Button>
                        </li>
                    ) : (
                        <li>
                            <Link href="/sign-in" className="cursor-pointer" onClick={() => setIsOpen(false)}>Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
