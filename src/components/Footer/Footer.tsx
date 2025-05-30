import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-900 text-white px-6 md:px-20 pt-16 pb-8">
      <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-20">
        {/* Left: Logo & Description */}
        <div className="flex flex-col gap-4 max-w-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              {/* TODO: Replace with actual logo SVG */}
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="font-sans text-xl font-semibold text-white">Plately</span>
          </div>
          <span className="text-sm text-white/80">AI-powered social media content for restaurants.</span>
        </div>
        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-8 md:gap-16">
          <div className="flex flex-col gap-2 min-w-[100px]">
            <span className="font-semibold text-base">Product</span>
            <a href="#about" className="text-sm text-white/80 hover:text-white">About</a>
          </div>
          <div className="flex flex-col gap-2 min-w-[100px]">
            <span className="font-semibold text-base">Company</span>
            <a href="#about" className="text-sm text-white/80 hover:text-white">About</a>
            <a href="#blog" className="text-sm text-white/80 hover:text-white">Blog</a>
          </div>
          <div className="flex flex-col gap-2 min-w-[100px]">
            <span className="font-semibold text-base">Support</span>
            <a href="#help" className="text-sm text-white/80 hover:text-white">Help Center</a>
            <a href="#contact" className="text-sm text-white/80 hover:text-white">Contact</a>
            <a href="#status" className="text-sm text-white/80 hover:text-white">Status</a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs text-white/60">© 2025 Plately. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#privacy" className="text-xs text-white/60 hover:text-white">Privacy Policy</a>
          <a href="#terms" className="text-xs text-white/60 hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 