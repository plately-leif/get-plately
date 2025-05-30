import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full flex items-center justify-between px-6 md:px-20 py-6 border-b border-gray-200 bg-white">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          {/* TODO: Replace with actual logo SVG */}
          <span className="text-white font-bold text-lg">P</span>
        </div>
        <span className="font-sans text-xl font-semibold text-gray-900">Plately</span>
      </div>
      {/* Right: Links */}
      <div className="flex items-center gap-4">
        <a href="#blog" className="text-gray-600 font-medium hover:text-gray-900 transition-colors">Blog</a>
        <a href="#waitlist" className="bg-primary text-white font-semibold rounded-md px-5 py-2 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition">Join Waitlist</a>
      </div>
    </nav>
  );
};

export default Navbar; 