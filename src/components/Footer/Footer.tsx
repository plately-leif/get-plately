import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-900 text-white px-6 md:px-20 pt-16 pb-8">
      <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-20">
        {/* Left: Logo & Description */}
        <div className="flex flex-col gap-4 max-w-xs">
          <div className="flex items-center gap-2">
            <Image
              src="https://wiqdmiimlxxuhrvhhuxs.supabase.co/storage/v1/object/sign/website-assets/platelyLogo_LightText.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzcyMWQ1YWYzLTg5MjQtNGMxYi1hYTVhLTYzMWQxYzg3YzczZiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9wbGF0ZWx5TG9nb19MaWdodFRleHQuc3ZnIiwiaWF0IjoxNzQ4NjQwMTYxLCJleHAiOjMzMjU0NDAxNjF9.fH2ROf7y4d7GPOHdXHvGRG62O_xTGjL_Anr5c3zFNyc"
              alt="Plately Logo Light"
              height={32}
              width={120}
              className="h-8 w-auto"
            />
          </div>
          <span className="text-sm text-white/80">AI-powered social media content for restaurants.</span>
        </div>
        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-8 md:gap-16">
          <div className="flex flex-col gap-2 min-w-[100px]">
            <span className="font-semibold text-base">Product</span>
            <a href="/signin" className="text-sm text-white/80 hover:text-white">Login</a>
          </div>
          <div className="flex flex-col gap-2 min-w-[100px]">
            <span className="font-semibold text-base">Support</span>
            <Link href="/contact" className="text-sm text-white/80 hover:text-white">Contact Us</Link>
          </div>
          <div className="flex flex-col gap-2 min-w-[100px]">
            <span className="font-semibold text-base">Company</span>
            <Link href="/about" className="text-sm text-white/80 hover:text-white">About</Link>
            <a href="#blog" className="text-sm text-white/80 hover:text-white">Blog</a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs text-white/60">© 2025 Plately. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="text-xs text-white/60 hover:text-white">Privacy Policy</Link>
          <Link href="/terms-of-service" className="text-xs text-white/60 hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 