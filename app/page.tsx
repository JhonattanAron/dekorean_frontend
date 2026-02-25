"use client";

import { Navbar } from "@/components/navbar";
import { FooterImproved } from "@/components/footer-improved";
import { HomeHero } from "@/components/home-hero";
import { ProductsCatalog } from "@/components/products-catalog";
import { QualitySection } from "@/components/quality-section";
import { VideoSection } from "@/components/video-section";
import { WhyChooseUs } from "@/components/why-choose-us";
import { FinalCTA } from "@/components/final-cta";

import Image from "next/image";

const DekoransLogo = () => (
  <img
    src="/images/dekorans-icon.png"
    alt="DEKORANS Logo"
    className="w-8 h-8 object-contain"
  />
);

export default function Home() {
  const navLinks = [
    { label: "Productos", href: "/productos", id: "nav-productos" },
    { label: "Visor Interactivo", href: "/", active: true, id: "nav-visor" },
    { label: "Empresas", href: "#empresas", id: "nav-empresas" },
    { label: "Soporte", href: "#soporte", id: "nav-soporte" },
  ];

  const demoImages = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuASVW9I5I47x0AlJK8PxbRyvWS_FR4mzq3o2OTLqhMjJ7gCzY-D_37JqwAudYif1Pa3J1DeqndEvKJXWb0pPBzbKIi1_SJOD8NCTM-8E8ki852zlhKvf2XSBUqCjJBVgLeJrJ-8CuwQJ0WWNMN1wpkhEIy6CiEEd5sxQIZJ7acUJG5GaDAikOP_sTFBg5LgNLwmJa7MHvw2sevxjkBUVDgoOfPJ2DbD74FNs9ijrI9vAD2QVUNN-NIqtvZUyZrQFoSSXdvGzP5_2Q",
      alt: "Modern living room demo image",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAzuDeoGz7X0ZBj6XSjZADIndM2aVcA4JxSVFta4dWLmyxSPbEQc-5G3DMn9DnMPR4e7A9fwuUMGXNbx4-tKCeBEMt2Z6Y9fIkfqf0KPe0455Su7JP28qoAj5tji7U9H0HWxM-_Lxn9UBIW555UQbhIHy3FthEvo-yEnCMGyMgAMiHka7JjVMjc7jIOy_is26GJbHHxNrvRyPu0jsC68W-_2frtMb8uBlr7_migMgu5C5WTtdvv_fzrpZ4OetrKZiV68xnuschFA",
      alt: "Minimalist bedroom demo image",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5CvZ4756llYdmm9W7uAX4_B1tYULz9FWO1H_R5UrcYvr0x64CtxffGMZielopbAYDYlCsi3yKU8RWoqdPNSn6LXf5KQlg4whpKbOOt8pFERvzJawSzFa5NjP1OYhcM3Pk03DBAIyZ2p62NCzNcRCtso-Bk81dQvG2iFmkM2SNKWHmYKIlO8drVOL3MM-ufJbbNZW-Iv545za-zsEYTmr1T6YL24zruK78ow1IjEBVNCtFyZrFNvuBrpms4IH4iEXS_bMPpElbuQ",
      alt: "Luxury kitchen demo image",
    },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar
        links={navLinks}
        logo={{ icon: <DekoransLogo />, text: "DEKORANS" }}
        userProfile={{
          name: "Aron Cachago",
          plan: "Pro Plan",
          avatarUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBvqYBy9nDJkjJAwL8MmPQ2TcvfV6F6rTXUBozIMz6W6KYgI-SfKAOVGrc2yrZdckSDPuSSzzB2oXtfPeTndpMw6yAlWJ4gQhJnvhLIeg1caMogFkHy0iyQq68PcFZYT0O1Bc0Lw3bvzXeeo4dcYwMBCjw8aaRDOtBvcmqVU0S-bWrdXtzfKaxbkVoWxfTNeiJ-rLgq9-5woR70ds_ZDqRv1Qjf1MF4mvaUqkMLzX1w3P3cN8G-ZTBDevYr2Md49trAjwupiaTz8g",
        }}
      />

      {/* Home Hero Section */}
      <HomeHero demoImages={demoImages} />

      {/* Products Catalog Section */}
      <ProductsCatalog />

      {/* Quality Section */}
      <QualitySection />

      {/* Video Section */}
      <VideoSection />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Final CTA Section */}
      <FinalCTA />

      {/* Footer */}
      <FooterImproved />
    </div>
  );
}
