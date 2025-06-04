"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const scrollToWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const waitlistSection = document.getElementById('final-cta');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 md:px-20 py-6 border-b border-gray-200 bg-white relative">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="https://wiqdmiimlxxuhrvhhuxs.supabase.co/storage/v1/object/sign/website-assets/platelyLogo_DarkText.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzcyMWQ1YWYzLTg5MjQtNGMxYi1hYTVhLTYzMWQxYzg3YzczZiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9wbGF0ZWx5TG9nb19EYXJrVGV4dC5zdmciLCJpYXQiOjE3NDg2Mzk3MjksImV4cCI6MzMyNTQzOTcyOX0.W86_EYP17vu7UpI8174YAloCidL2lEdvgyy7pKYuZ9Q"
          alt="Plately Logo"
          height={48}
          width={160}
          priority
          className="h-12 w-auto"
        />
      </div>
      {/* Right: Links (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <a href="#blog" className="text-gray-600 font-medium hover:text-gray-900 transition-colors">Blog</a>
        <a 
          href="#waitlist" 
          onClick={scrollToWaitlist}
          className="bg-accent text-white font-semibold rounded-md px-5 py-2 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition cursor-pointer"
        >
          Join The Waitlist
        </a>
      </div>
      {/* Hamburger (Mobile) */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Open menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <svg className="w-7 h-7 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col z-50 md:hidden">
          <a
            href="#blog"
            className="block w-full text-left px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 border-b border-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </a>
          <a
            href="#waitlist"
            className="block w-full text-left px-6 py-3 bg-accent text-white font-semibold rounded-b-lg hover:bg-accent/90 transition"
            onClick={(e) => {
              scrollToWaitlist(e);
              setMenuOpen(false);
            }}
          >
            Join The Waitlist
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 