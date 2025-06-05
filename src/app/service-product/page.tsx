"use client"

import { useState } from "react"

interface IService {
    name: string
    description: string
    image: string
}

const services: IService[] = [
    {
        name: "Smart Irrigation System",
        description: "Sistem irigasi pintar untuk mengontrol pengairan secara otomatis.",
        image: "/assets/smart.png"
    },
    {
        name: "Drone Pemantau Lahan",
        description: "Drone untuk memantau kondisi lahan dari udara secara real-time.",
        image: "/assets/drone.png"
    },
    {
        name: "Aplikasi Manajemen Pertanian",
        description: "Aplikasi untuk membantu petani mengelola aktivitas pertanian.",
        image: "/assets/pertanian.png"
    },
    {
        name: "Sensor Kualitas Tanah",
        description: "Sensor untuk mengukur pH, kelembaban, dan nutrisi tanah.",
        image: "/assets/sensor.png"
    },
    {
        name: "Pelatihan Teknologi Pertanian",
        description: "Pelatihan untuk mengenalkan teknologi modern kepada petani.",
        image: "/assets/pelatihan.png"
    }
]

export default function ServiceProduct() {
    const [selectedService, setSelectedService] = useState<IService | null>(services[0])

    return (
        <section
            className="relative bg-gradient-to-br from-green-700 via-green-900 to-black min-h-[700px] py-16 px-6 md:px-20 rounded-3xl shadow-2xl overflow-hidden"
            style={{ backgroundImage: 'url("/assets/2.jpg")', backgroundBlendMode: "overlay" }}
        >
            <div className=" bg-black/50 flex flex-col md:flex-row gap-12 p-8 relative top-16">
                {/* Daftar layanan */}
                <nav className="md:w-1/2 flex flex-col gap-6">
                    {services.map((service) => (
                        <button
                            key={service.name}
                            onClick={() => setSelectedService(service)}
                            className={`text-white font-semibold text-lg md:text-xl text-left px-4 py-3 rounded-lg transition-all duration-300
                ${selectedService?.name === service.name
                                    ? "bg-green-600 shadow-lg scale-105"
                                    : "hover:bg-green-700 hover:text-green-300"
                                }`}
                        >
                            {service.name}
                        </button>
                    ))}
                </nav>

                {/* Penjelasan + Gambar */}
                {selectedService && (
                    <article className="md:w-1/2 flex flex-col md:flex-row items-center gap-8 text-white">
                        <img
                            src={selectedService.image}
                            alt={selectedService.name}
                            className="w-56 h-56 rounded-2xl object-cover shadow-xl transform transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                        />
                        <div className="max-w-lg">
                            <h2 className="text-3xl font-extrabold tracking-wide mb-4 drop-shadow-lg">
                                {selectedService.name}
                            </h2>
                            <p className="text-lg leading-relaxed font-light drop-shadow-md">
                                {selectedService.description}
                            </p>
                        </div>
                    </article>
                )}
            </div>
        </section>
    )
}
