import React from "react";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-6">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-between space-y-4 md:space-y-0">

                {/* Logo dan Tagline */}
                <div className="flex items-center space-x-3">
                    <img
                        src="/assets/logo.png"
                        alt="AgroTech Farmers Logo"
                        className="h-8 w-8"
                    />
                    <span className="font-bold text-lg">Farmer</span>
                </div>

                {/* Navigasi */}
                <nav className="space-x-6 text-sm relative left-14">
                    <a href="/about-us" className="hover:underline">About Us</a>
                    <a href="/service-product" className="hover:underline">Services</a>
                    <a href="/blog" className="hover:underline">Blog</a>
                </nav>

                {/* Alamat & Kontak */}
                <div className="text-sm text-gray-300 text-center md:text-right">
                    <p>Jl. Tani Cerdas No. 10, Yogyakarta</p>
                    <p>Email: info@agrotechfarmers.id</p>
                    <p>Telp: +62 812 3456 7890</p>
                </div>
            </div>

            <div className="text-xs text-gray-400 text-center mt-6">
                © {new Date().getFullYear()} AgroTech Farmers. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
