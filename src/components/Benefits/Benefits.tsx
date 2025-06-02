"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const benefits = [
  {
    emoji: "✨",
    icon: (
      <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
      </svg>
    ),
    title: "Instant Polish",
    desc: "Turn your everyday food photos into stunning, professional posts with just a few clicks.",
  },
  {
    emoji: "⏱️",
    icon: (
      <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6v6l3.644 1.822"/>
        <path d="M16 19h6"/>
        <path d="M19 16v6"/>
        <path d="M21.92 13.267a10 10 0 1 0-8.653 8.653"/>
      </svg>
    ),
    title: "Save Hours",
    desc: "Stop wasting time on design. What used to take hours now takes minutes, so you can get back to your kitchen.",
  },
  {
    emoji: "💰",
    icon: (
      <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"/>
        <path d="M16 10h.01"/>
        <path d="M2 8v1a2 2 0 0 0 2 2h1"/>
      </svg>
    ),
    title: "Budget-Friendly",
    desc: "Why pay a designer? Get the same high-end look for a fraction of the cost.",
  },
  {
    emoji: "🎨",
    icon: (
      <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: "Consistent Brand",
    desc: "Keep your restaurant's personality shining through every post. Your feed will look professionally curated, not random.",
  },
  {
    emoji: "🚀",
    icon: (
      <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 19 22 12 13 5 13 19"/>
        <polygon points="2 19 11 12 2 5 2 19"/>
      </svg>
    ),
    title: "Designed for Speed",
    desc: "Create posts in seconds, not hours. We know you've got a restaurant to run.",
  },
  {
    emoji: "🤤",
    icon: (
      <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M7 2v20"/>
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
      </svg>
    ),
    title: "Appetite Appeal",
    desc: "Make your food look so good people can't help but stop scrolling and place an order.",
  },
];

const Benefits: React.FC = () => {

  return (
    <section className="relative w-full overflow-hidden py-24">
      {/* Background elements */}
      <div className="absolute inset-0 bg-white">
        {/* Logo-inspired circular ring - top right */}
        <div className="absolute top-0 right-0 w-[540px] h-[540px] opacity-5" style={{ transform: 'translateY(-45%) translateX(35%) rotate(-15deg)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 195 196" fill="none">
            <path fill="#FE644D" d="M194.462 97.71c0 53.964-43.532 97.71-97.231 97.71C43.531 195.42 0 151.674 0 97.71 0 43.746 43.532 0 97.231 0s97.231 43.746 97.231 97.71Zm-175.016 0c0 43.171 34.826 78.168 77.785 78.168 42.959 0 77.785-34.997 77.785-78.168 0-43.171-34.826-78.168-77.785-78.168-42.96 0-77.785 34.997-77.785 78.168Z"/>
            <path fill="#FE644D" d="M134.755 97.71c13.4 0 24.688 11.264 19.56 23.645a61.787 61.787 0 0 1-114.168 0c-5.128-12.381 6.16-23.645 19.56-23.645h75.048Z"/>
          </svg>
        </div>
        {/* Logo-inspired circular ring - left side */}
        <div className="absolute top-1/2 left-0 w-[515px] h-[515px] opacity-5" style={{ transform: 'translateY(-50%) translateX(-45%) rotate(20deg)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 195 196" fill="none">
            <path fill="#FE644D" d="M194.462 97.71c0 53.964-43.532 97.71-97.231 97.71C43.531 195.42 0 151.674 0 97.71 0 43.746 43.532 0 97.231 0s97.231 43.746 97.231 97.71Zm-175.016 0c0 43.171 34.826 78.168 77.785 78.168 42.959 0 77.785-34.997 77.785-78.168 0-43.171-34.826-78.168-77.785-78.168-42.96 0-77.785 34.997-77.785 78.168Z"/>
            <path fill="#FE644D" d="M134.755 97.71c13.4 0 24.688 11.264 19.56 23.645a61.787 61.787 0 0 1-114.168 0c-5.128-12.381 6.16-23.645 19.56-23.645h75.048Z"/>
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-5" style={{ transform: 'translateY(20%) translateX(25%) rotate(-15deg)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 195 196" fill="none">
            <path fill="#FE644D" d="M194.462 97.71c0 53.964-43.532 97.71-97.231 97.71C43.531 195.42 0 151.674 0 97.71 0 43.746 43.532 0 97.231 0s97.231 43.746 97.231 97.71Zm-175.016 0c0 43.171 34.826 78.168 77.785 78.168 42.959 0 77.785-34.997 77.785-78.168 0-43.171-34.826-78.168-77.785-78.168-42.96 0-77.785 34.997-77.785 78.168Z"/>
            <path fill="#FE644D" d="M134.755 97.71c13.4 0 24.688 11.264 19.56 23.645a61.787 61.787 0 0 1-114.168 0c-5.128-12.381 6.16-23.645 19.56-23.645h75.048Z"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            <span className="relative inline-block">
              <span className="relative z-10">You Perfect the Plate.</span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-accent/10 -rotate-1 rounded"></span>
            </span>
            <br className="hidden md:block" />
            <span className="relative inline-block mt-1 md:mt-2">
              <span className="relative z-10">Plately Perfects the Post.</span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-accent/10 rotate-1 rounded"></span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            We believe your food deserves a feed as amazing as your menu. Plately simplifies stunning visuals, so you can focus on what matters most.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 flex flex-col h-full transition-all duration-300 hover:shadow-xl"
              initial={{ opacity: 0.9, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-6">
                {benefit.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 flex-grow">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits; 