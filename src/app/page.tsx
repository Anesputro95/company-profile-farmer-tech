"use client";

import * as React from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-black/30 text-white">
      {/* Video Background */}
      <div className="fixed inset-0 -z-10 hidden md:block">
        {/* Video hanya tampil di layar md ke atas supaya mobile hemat data */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-screen object-cover brightness-50"
          preload="metadata"
          poster="/video/bg-poster.jpg" /* kalau ada, untuk preview gambar */
        >
          <source src="/video/bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen w-full px-6 overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-transparent to-emerald-900/20" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto py-20 md:py-32">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-snug">
            <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent uppercase">
              Masa Depan Pertanian
            </span>
            <br />
            <span className="text-white/80 font-light tracking-widest uppercase text-sm sm:text-lg md:text-xl">
              Dimulai Hari Ini
            </span>
          </h1>

          <div className="w-24 sm:w-32 h-1 mx-auto my-6 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full opacity-70" />

          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto px-4 leading-relaxed">
            Menggabungkan{" "}
            <span className="text-emerald-300">kearifan lokal</span> dengan{" "}
            <span className="underline decoration-emerald-400/60">teknologi mutakhir</span> untuk hasil pertanian berkelanjutan.
          </p>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <Link href="/about-us" passHref>
              <Button className="px-5 py-2 sm:px-6 sm:py-3 border border-emerald-400 text-emerald-300 rounded-full bg-transparent hover:bg-emerald-500 hover:text-white transition duration-300 shadow-md sm:shadow-xl">
                Mulai Eksplorasi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="bg-gradient-to-b from-green-950 to-black py-16 sm:py-24 px-4 sm:px-6 text-center">
        <div className="max-w-6xl mx-auto space-y-5 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-400">
            Petani Cerdas, Masa Depan Cerah
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-white drop-shadow-md">
            FARMER
          </h2>
          <p className="text-sm sm:text-md md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            Farmers adalah perusahaan agritech yang memberdayakan petani Indonesia melalui teknologi modern seperti drone, sensor lahan, dan aplikasi pintar untuk hasil yang maksimal.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-2 sm:px-0">
          {[{
            src: "/assets/logo-1.webp",
            alt: "Drone Pertanian",
            text: "Membantu menyemprotkan pestisida dan pupuk serta mengawasi lahan secara otomatis.",
          }, {
            src: "/assets/logo-2.webp",
            alt: "Sensor Lahan",
            text: "Data real-time seperti kelembaban tanah, suhu, dan cuaca terkini.",
          }, {
            src: "/assets/logo-3.webp",
            alt: "Aplikasi Pintar",
            text: "Membantu perencanaan tanam, monitoring panen, dan akses pelatihan.",
          }].map(({ src, alt, text }) => (
            <div
              key={alt}
              className="bg-green-900 bg-opacity-70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-white shadow-md hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={src}
                alt={alt}
                width={64}
                height={64}
                className="w-16 h-16 mx-auto mb-5"
                loading="lazy"
                priority={false}
              />

              <p className="text-sm sm:text-md leading-relaxed text-white/90">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Service Section */}
      <section className="flex flex-col md:flex-row w-full bg-gradient-to-br from-green-950 to-black px-4 sm:px-6 py-16 sm:py-24 gap-8 sm:gap-10 items-center">
        <div className="w-full md:w-1/2">
          <div className="aspect-video shadow-md sm:shadow-lg rounded-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/Qfozqrom7Bk"
              title="YouTube video player"
              className="w-full h-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="w-full md:w-1/2 text-white space-y-4 sm:space-y-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-400">
            Product & Services
          </h2>
          <p className="text-sm sm:text-md md:text-lg text-white/80">
            Kami menyediakan video edukatif tentang teknologi pertanian modern seperti drone, sensor lahan, dan aplikasi pintar.
          </p>
          <p className="text-sm sm:text-md md:text-lg text-white/70">
            Inisiatif ini membantu petani memahami manfaat nyata dari inovasi digital untuk hasil panen yang lebih optimal.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-green-900 py-16 sm:py-20 px-4 text-center">
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
                <div className="bg-white/90 rounded-2xl shadow-md sm:shadow-xl p-6 sm:p-8 flex flex-col items-center space-y-4 text-gray-800">
                  <Image
                    src={avatar}
                    alt={`Avatar ${idx + 1}`}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover shadow-sm sm:shadow-md"
                    loading="lazy"
                    priority={false}
                  />
                  <p className="italic text-sm sm:text-base">“{text}”</p>
                  <h4 className="text-emerald-700 font-semibold text-sm sm:text-base">{name}</h4>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white text-emerald-600 rounded-full p-2 shadow hover:bg-emerald-600 hover:text-white transition" />
          <CarouselNext className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white text-emerald-600 rounded-full p-2 shadow hover:bg-emerald-600 hover:text-white transition" />
        </Carousel>

        <h2 className="mt-8 sm:mt-10 text-xs sm:text-sm text-white/60 italic">
          “Teknologi untuk Tani yang Lebih Mandiri”
        </h2>
      </section>
    </div>
  );
}
