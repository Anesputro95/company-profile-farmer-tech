"use client";

import * as React from "react";
import { ReactNode } from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col font-sans">
      {/* Video Background */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover brightness-[0.4]"
        >
          <source src="/video/bg-1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Konten utama */}
      <main className="relative pt-20 flex-grow">{children}</main>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[90vh] w-full px-4 bg-transparent overflow-hidden text-center">
        {/* Background Overlay Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-900/10 to-transparent" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-5xl mx-auto py-24">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white drop-shadow-xl">
            <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent font-serif uppercase">
              Masa Depan Pertanian
            </span>
            <br />
            <span className="text-white/90 font-light tracking-widest uppercase text-xl md:text-2xl">
              Dimulai Hari Ini
            </span>
          </h1>

          <div className="w-40 h-1 mx-auto my-8 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full opacity-70" />

          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
            Menggabungkan <span className="text-emerald-300">kearifan lokal</span> dengan <span className="underline decoration-emerald-400/40">teknologi mutakhir</span> untuk hasil pertanian berkelanjutan.
          </p>

          <div className="mt-10 flex justify-center">
            <Link href="/about-us" passHref>
              <Button className="px-8 py-4 border border-emerald-400 text-emerald-300 rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-emerald-300/30">
                Mulai Eksplorasi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="relative w-full bg-green-950 bg-cover bg-center py-20 px-6 text-center text-white">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-400">Petani Cerdas, Masa Depan Cerah</h1>
          <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-wide">FARMER</h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto">
            Farmers adalah perusahaan agritech yang memberdayakan petani Indonesia melalui teknologi. Solusi modern kami seperti drone, sensor lahan, dan aplikasi pintar membantu meningkatkan hasil panen dan efisiensi kerja petani.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[{
            src: "/assets/logo-1.png",
            alt: "Drone Pertanian",
            text: "Membantu menyemprotkan pestisida dan pupuk serta mengawasi lahan otomatis.",
          }, {
            src: "/assets/logo-2.png",
            alt: "Sensor Lahan",
            text: "Data real-time seperti kelembaban tanah, suhu, dan cuaca.",
          }, {
            src: "/assets/logo-3.png",
            alt: "Aplikasi Pintar",
            text: "Membantu perencanaan tanam, monitoring panen, dan akses pelatihan.",
          }].map(({ src, alt, text }) => (
            <div
              key={alt}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <img src={src} alt={alt} className="w-16 h-16 mx-auto mb-4" />
              <p className="text-sm text-center leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service Section */}
      <section className="flex flex-col md:flex-row w-full bg-green-950 px-6 py-20 gap-12 items-center">
        <div className="w-full md:w-1/2">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/Qfozqrom7Bk"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-xl shadow-lg"
          ></iframe>
        </div>

        <div className="w-full md:w-1/2 text-white space-y-4">
          <h2 className="text-3xl font-bold">Product and Service</h2>
          <p className="text-base">
            Kami menghadirkan video edukatif tentang teknologi pertanian modern seperti drone, sensor lahan, dan aplikasi pintar.
          </p>
          <p className="text-base">
            Inisiatif ini membantu petani memahami manfaat nyata dari inovasi digital dalam meningkatkan hasil dan efisiensi.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-green-900 py-16 px-4 text-center">
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent>
            {[{
              avatar: "https://randomuser.me/api/portraits/men/75.jpg",
              text: "Layanan dari FARMER sangat membantu meningkatkan hasil panen saya.",
              name: "Budi Santoso, Petani Jagung",
            }, {
              avatar: "https://randomuser.me/api/portraits/women/65.jpg",
              text: "Sensor lahan dari FARMER sangat praktis dan efisien.",
              name: "Siti Rahma, Petani Padi",
            }, {
              avatar: "https://randomuser.me/api/portraits/men/12.jpg",
              text: "Aplikasinya memudahkan saya memahami teknologi pertanian.",
              name: "Rudi Hartono, Petani Muda",
            }].map(({ avatar, text, name }, idx) => (
              <CarouselItem
                key={idx}
                className="p-4 min-w-full md:min-w-0"
                style={{ scrollSnapAlign: "center" }}
              >
                <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center space-y-4">
                  <img src={avatar} alt={`Avatar ${idx + 1}`} className="w-16 h-16 rounded-full object-cover" />
                  <p className="text-gray-700 italic">“{text}”</p>
                  <h4 className="text-emerald-700 font-semibold">{name}</h4>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-emerald-600 hover:text-white" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-emerald-600 hover:text-white" />
        </Carousel>

        <h2 className="mt-10 text-sm text-gray-400 italic">“Teknologi untuk Tani yang Lebih Mandiri”</h2>
      </section>
    </div>
  );
}