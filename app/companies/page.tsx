"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const partners = [
  { src: "https://ceydet.ilutechnologies.com/applications/AnythingLLM.png", alt: "AnythingLLM" },
  { src: "https://ceydet.ilutechnologies.com/applications/Attendize.png", alt: "Attendize" },
  { src: "https://ceydet.ilutechnologies.com/applications/Bigcapital.png", alt: "Bigcapital" },
  { src: "https://ceydet.ilutechnologies.com/applications/Dolibarr.png", alt: "Dolibarr" },
  { src: "https://ceydet.ilutechnologies.com/applications/Drupal.png", alt: "Drupal" },
  { src: "https://ceydet.ilutechnologies.com/applications/EasyAppointments.png", alt: "EasyAppointments" },
  { src: "https://ceydet.ilutechnologies.com/applications/ErpNext.png", alt: "ErpNext" },
  { src: "https://ceydet.ilutechnologies.com/applications/Ghost.png", alt: "Ghost" },
  { src: "https://ceydet.ilutechnologies.com/applications/InvoiceNinja.png", alt: "InvoiceNinja" },
  { src: "https://ceydet.ilutechnologies.com/applications/Magento.png", alt: "Magento" },
  { src: "https://ceydet.ilutechnologies.com/applications/Mautic.png", alt: "Mautic" },
  { src: "https://ceydet.ilutechnologies.com/applications/Metabase.png", alt: "Metabase" },
  { src: "https://ceydet.ilutechnologies.com/applications/Moodle.png", alt: "Moodle" },
  { src: "https://ceydet.ilutechnologies.com/applications/nopCommerce.png", alt: "nopCommerce" },
  { src: "https://ceydet.ilutechnologies.com/applications/Odoo_ERP_CRM.png", alt: "Odoo ERP/CRM" },
];

// Reusable Partner Card
const PartnerCard = ({ src, alt }: { src: string; alt: string }) => (
  <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-4 flex items-center justify-center transition-transform hover:-translate-y-1 hover:shadow-lg h-28">
    <Image src={src} alt={alt} width={120} height={120} className="object-contain h-20" loading="lazy" />
  </div>
);

export default function Partners() {
  const swiperProps = {
    modules: [Autoplay],
    spaceBetween: 20,
    speed: 3000,
    loop: true,
    breakpoints: {
      640: { slidesPerView: 4 },
      1024: { slidesPerView: 6 },
    },
    autoplay: { delay: 0, disableOnInteraction: false },
    className: "mx-auto",
  };

  return (
    <section className="w-full max-w-[1100px] px-4 md:px-6 lg:px-0 py-10 mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">Partners</span>
          </h2>
      <p className="text-muted-foreground max-w-2xl pb-4 lg:pb-8 leading-normal sm:text-lg sm:leading-7">
        A diverse holding company 🚀
      </p>
      {/* Top Row - slides right */}
      <Swiper {...swiperProps} autoplay={{ ...swiperProps.autoplay, reverseDirection: false }} className="mb-6">
        {partners.slice(0, Math.ceil(partners.length / 2)).map((partner, idx) => (
          <SwiperSlide key={idx}>
            <PartnerCard src={partner.src} alt={partner.alt} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom Row - slides left */}
      <Swiper {...swiperProps} autoplay={{ ...swiperProps.autoplay, reverseDirection: true }}>
        {partners.slice(Math.ceil(partners.length / 2)).map((partner, idx) => (
          <SwiperSlide key={idx}>
            <PartnerCard src={partner.src} alt={partner.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
