"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const benefits = [
  {
    emoji: "✨",
    icon: (
      <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.4 8.8L21.6 8.8L15.6 13.2L18 20L12 15.6L6 20L8.4 13.2L2.4 8.8L9.6 8.8L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Instant Polish",
    desc: "Effortlessly transform everyday photos into elegant, professional visuals.",
  },
  {
    emoji: "⏱️",
    icon: (
      <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Save Hours",
    desc: "Automate design tasks that used to take forever, freeing up your valuable time.",
  },
  {
    emoji: "💰",
    icon: (
      <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor" />
        <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="currentColor" />
        <path d="M13 7H11V14H13V7Z" fill="currentColor" />
      </svg>
    ),
    title: "Budget-Friendly",
    desc: "Get boutique-quality aesthetics without the high costs.",
  },
  {
    emoji: "🎨",
    icon: (
      <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12Z" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12Z" fill="currentColor" />
        <path d="M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z" fill="currentColor" />
        <path d="M20 12C20 13.1046 19.1046 14 18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12Z" fill="currentColor" />
        <path d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z" fill="currentColor" />
      </svg>
    ),
    title: "Consistent Brand",
    desc: "Apply your unique style across all your posts, ensuring your feed always looks cohesive and on-point.",
  },
  {
    emoji: "🚀",
    icon: (
      <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 16.5C3 17.5 2 21 2 21C2 21 5.5 20 6.5 18.5C7.5 17 6.5 15 5 15C3.5 15 3 15.5 4.5 16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 15L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 4L21 3L18 2L17 5L18 6L20 4ZM20 4L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 9C12.2091 9 10 11.2091 10 14C10 16.7909 12.2091 19 15 19C17.7909 19 20 16.7909 20 14C20 11.2091 17.7909 9 15 9Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Designed for Speed",
    desc: "Super fast content creation so you can focus on your business.",
  },
  {
    emoji: "🤤",
    icon: (
      <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.5 14C8.5 14 9.5 16 12 16C14.5 16 15.5 14 15.5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 9H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 9H17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Appetite Appeal",
    desc: "Create content that makes people hungry and want to visit and order.",
  },
];

const Benefits: React.FC = () => {

  return (
    <section className="relative w-full overflow-hidden py-24">
      {/* Background elements */}
      <div className="absolute inset-0 bg-white">
        {/* Logo-inspired circular ring */}
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