"use client";
import Image from "next/image";

export default function AboutUs() {
    return (
        <section>
            {/* Hero Section */}
            <div
                className="relative w-full bg-cover bg-center py-20 md:py-28 priority"
                style={{ backgroundImage: 'url("/assets/2035.jpg")' }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

                <div className="relative max-w-7xl mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center gap-14 rounded-3xl min-h-[450px] md:min-h-[550px]">
                    <div className="w-full text-center md:text-left text-white font-serif tracking-wide max-w-4xl mx-auto md:mx-0 space-y-8">
                        <h1 className="text-4xl md:text-6xl font-extrabold uppercase drop-shadow-lg text-emerald-400">
                            About 
                            <br />
                            <span className="text-4xl">PT Farmer Indonesia</span>
                        </h1>
                        <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line drop-shadow-md text-gray-200">
                            PT Farmer Indonesia didirikan pada tahun 2018 oleh sekelompok inovator
                            yang bersemangat menggabungkan teknologi dan pertanian untuk menciptakan
                            solusi cerdas bagi para petani di Indonesia. Dengan latar belakang teknologi
                            informasi dan pengalaman di bidang agronomi, kami ingin membantu petani
                            meningkatkan produktivitas dan efisiensi melalui teknologi digital.
                            <br />
                            Berawal dari sebuah startup kecil di Bandung, kami mengembangkan berbagai
                            produk teknologi seperti aplikasi pemantauan cuaca, sistem irigasi otomatis,
                            dan platform manajemen lahan berbasis data. Inovasi kami bertujuan mengurangi
                            ketergantungan petani pada metode konvensional yang seringkali kurang efektif.
                        </p>
                    </div>
                </div>
            </div>

            {/* What We Do Section */}
            <div className="bg-green-900">
                <div className="max-w-7xl mx-auto px-8 py-20 flex flex-col gap-10 text-center">
                    <h2 className="text-3xl md:text-7xl font-serif font-semibold uppercase text-emerald-600 drop-shadow-md">
                        What We Do
                    </h2>
                    <p className="max-w-3xl mx-auto text-white font-light text-base md:text-lg leading-relaxed tracking-wide">
                        Kami adalah perusahaan teknologi pertanian yang berfokus pada inovasi untuk
                        mendukung petani meningkatkan produktivitas dan efisiensi usaha tani mereka.
                        Dengan memadukan teknologi modern seperti IoT, drone, dan aplikasi digital,
                        kami hadir untuk membantu solusi pertanian yang berkelanjutan dan ramah
                        lingkungan.
                    </p>

                    {/* Card Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
                        {[
                            {
                                name: "Agus Santoso",
                                role: "Agricultural Engineer",
                                Image: "https://randomuser.me/api/portraits/men/10.jpg",
                            },
                            {
                                name: "Siti Nurhaliza",
                                role: "Farm Data Analyst",
                                Image: "https://randomuser.me/api/portraits/women/11.jpg",
                            },
                            {
                                name: "Budi Prasetyo",
                                role: "IoT Specialist",
                                Image: "https://randomuser.me/api/portraits/men/12.jpg",
                            },
                            {
                                name: "Dewi Lestari",
                                role: "Agronomist",
                                Image: "https://randomuser.me/api/portraits/women/13.jpg",
                            },
                            {
                                name: "Rizal Mahendra",
                                role: "Crop Scientist",
                                Image: "https://randomuser.me/api/portraits/men/14.jpg",
                            },
                            {
                                name: "Yuni Astuti",
                                role: "Farm Automation Technician",
                                Image: "https://randomuser.me/api/portraits/women/15.jpg",
                            },
                        ].map(({ name, role, Image }) => (
                            <div
                                key={name}
                                className="bg-white shadow-lg rounded-3xl overflow-hidden max-w-[380px] mx-auto cursor-pointer transform transition duration-300 hover:scale-105"
                            >
                                <img
                                    src={Image}
                                    alt={name}
                                    className="w-full h-[360px] object-cover rounded-t-3xl"
                                    loading="lazy"
                                />
                                <div className="p-6 text-center">
                                    <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>
                                    <p className="text-emerald-600 font-medium mt-1">{role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
