"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Social media post types
const POST_TYPES = ["instagram", "facebook", "tiktok"];

// Image constants
const RESTAURANT_IMG = "https://assets.getplately.com/assets/images/restaurant-interior.webp";
const FOOD_IMG = "https://assets.getplately.com/assets/images/cheddar-bacon-hamburger.webp";

// New carousel images for social media posts
const INSTAGRAM_IMG = "https://assets.getplately.com/assets/images/cheddar-bacon-hamburger-daylight.webp";
const FACEBOOK_IMG = "https://assets.getplately.com/assets/images/cheddar-bacon-hamburger-evening.webp";
const TIKTOK_IMG = "https://assets.getplately.com/assets/images/cheddar-bacon-hamburger-highflash.webp";

const ProcessDemoNew: React.FC = () => {
  const [currentPostType, setCurrentPostType] = useState(0);

  // Cycle through post types
  // Auto-cycle through post types, but pause when user manually navigates
  const [autoCycle, setAutoCycle] = useState(true);
  
  useEffect(() => {
    if (!autoCycle) return;
    
    const interval = setInterval(() => {
      setCurrentPostType((prev) => (prev + 1) % POST_TYPES.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [autoCycle]);
  
  // Pause auto-cycling when user manually navigates, resume after 10 seconds
  const handleManualNavigation = (index: number) => {
    setAutoCycle(false);
    setCurrentPostType(index);
    
    // Resume auto-cycling after 10 seconds of inactivity
    const timeout = setTimeout(() => setAutoCycle(true), 10000);
    return () => clearTimeout(timeout);
  };

  return (
    <section className="w-full flex flex-col items-center px-4 md:px-10 py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Logo-inspired circular ring - top right */}
        <div className="absolute top-0 right-0 w-[650px] h-[650px] opacity-5" style={{ transform: 'translateY(-30%) translateX(30%) rotate(35deg)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 195 196" fill="none">
            <path fill="#FE644D" d="M194.462 97.71c0 53.964-43.532 97.71-97.231 97.71C43.531 195.42 0 151.674 0 97.71 0 43.746 43.532 0 97.231 0s97.231 43.746 97.231 97.71Zm-175.016 0c0 43.171 34.826 78.168 77.785 78.168 42.959 0 77.785-34.997 77.785-78.168 0-43.171-34.826-78.168-77.785-78.168-42.96 0-77.785 34.997-77.785 78.168Z"/>
            <path fill="#FE644D" d="M134.755 97.71c13.4 0 24.688 11.264 19.56 23.645a61.787 61.787 0 0 1-114.168 0c-5.128-12.381 6.16-23.645 19.56-23.645h75.048Z"/>
          </svg>
        </div>
        {/* Logo-inspired circular ring - left side 10% from top */}
        <div className="absolute top-[10%] left-0 w-[450px] h-[450px] opacity-5" style={{ transform: 'translateX(-30%) rotate(15deg)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 195 196" fill="none">
            <path fill="#FE644D" d="M194.462 97.71c0 53.964-43.532 97.71-97.231 97.71C43.531 195.42 0 151.674 0 97.71 0 43.746 43.532 0 97.231 0s97.231 43.746 97.231 97.71Zm-175.016 0c0 43.171 34.826 78.168 77.785 78.168 42.959 0 77.785-34.997 77.785-78.168 0-43.171-34.826-78.168-77.785-78.168-42.96 0-77.785 34.997-77.785 78.168Z"/>
            <path fill="#FE644D" d="M134.755 97.71c13.4 0 24.688 11.264 19.56 23.645a61.787 61.787 0 0 1-114.168 0c-5.128-12.381 6.16-23.645 19.56-23.645h75.048Z"/>
          </svg>
        </div>
        {/* Logo-inspired circular ring - bottom left */}
        <div className="absolute bottom-0 left-0 w-[550px] h-[550px] opacity-5" style={{ transform: 'translateY(25%) translateX(-25%) rotate(-25deg)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 195 196" fill="none">
            <path fill="#FE644D" d="M194.462 97.71c0 53.964-43.532 97.71-97.231 97.71C43.531 195.42 0 151.674 0 97.71 0 43.746 43.532 0 97.231 0s97.231 43.746 97.231 97.71Zm-175.016 0c0 43.171 34.826 78.168 77.785 78.168 42.959 0 77.785-34.997 77.785-78.168 0-43.171-34.826-78.168-77.785-78.168-42.96 0-77.785 34.997-77.785 78.168Z"/>
            <path fill="#FE644D" d="M134.755 97.71c13.4 0 24.688 11.264 19.56 23.645a61.787 61.787 0 0 1-114.168 0c-5.128-12.381 6.16-23.645 19.56-23.645h75.048Z"/>
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center gap-1 max-w-2xl text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          <span className="relative inline-block">
            <span className="relative z-10">See Plately in action</span>
            <span className="absolute -bottom-1 left-0 right-0 h-3 bg-accent/10 -rotate-1 rounded"></span>
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From your basic photos to stunning social media posts in seconds
        </p>
      </div>

      {/* Three-column layout */}
      <div className="relative z-10 w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-8 md:gap-8 lg:gap-12">
        {/* Left column: Input images */}
        <div className="flex flex-col gap-6 items-center">
          {/* Restaurant Photo Card */}
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-base font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Restaurant Photo</h3>
                  <p className="text-sm text-gray-600">
                    Upload a photo of your restaurant interior or exterior. This sets the vibe for your brand!
                  </p>
                </div>
              </div>
              <div className="w-full h-[280px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                {/* Placeholder for restaurant image */}
                <Image
                  src={RESTAURANT_IMG}
                  alt="Restaurant interior"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, 400px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Plus Icon */}
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 my-2">
            <svg width="32" height="32" viewBox="0 0 20 20" fill="none" stroke="#6B7280" strokeWidth="2">
              <line x1="10" y1="4" x2="10" y2="16" />
              <line x1="4" y1="10" x2="16" y2="10" />
            </svg>
          </div>

          {/* Food Photo Card */}
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-base font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Food Photo</h3>
                  <p className="text-sm text-gray-600">
                    Upload a photo of your signature dish or best-seller. This is what will make mouths water!
                  </p>
                </div>
              </div>
              <div className="w-full h-[280px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                {/* Placeholder for food image */}
                <Image
                  src={FOOD_IMG}
                  alt="Burger food photo"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, 400px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Middle column: AI Transform */}
        <div className="flex items-center justify-center">
          <div className="hidden md:block">
            {/* Horizontal arrow for desktop */}
            <motion.div 
              className="bg-accent/10 rounded-full p-4 flex items-center justify-center"
              animate={{ x: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <div className="bg-primary/90 rounded-full p-3 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
            <div className="text-center mt-2 text-sm font-bold text-primary">
              Plately AI<br />Transforms
            </div>
          </div>
          
          <div className="md:hidden">
            {/* Vertical arrow for mobile */}
            <motion.div 
              className="bg-accent/10 rounded-full p-4 flex items-center justify-center"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <div className="bg-primary/90 rounded-full p-3 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
            <div className="text-center mt-2 mb-4 text-sm font-bold text-primary">
              Plately AI Transforms
            </div>
          </div>
        </div>

        {/* Right column: Social Media Posts */}
        <div className="flex flex-col items-center gap-4 pt-8 md:pt-12">
          {/* Step 3 header card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden w-full max-w-md p-5">
            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
              Beautiful Social Post
            </h3>
            <p className="text-sm text-gray-600">Ready to share and engage your audience</p>
          </div>
          
          {/* Social media post card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden w-full max-w-md">
            
            <div className="relative w-full h-[700px] md:h-[750px] bg-gray-50 overflow-hidden">
              <AnimatePresence mode="wait">
                {currentPostType === 0 && (
                  <motion.div 
                    key="instagram"
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Instagram Post Placeholder */}
                    <div className="w-full h-full flex flex-col" style={{ aspectRatio: '2/5' }}>
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                          <span className="font-medium text-sm">plately.restaurant</span>
                        </div>
                      </div>
                      <div className="flex-grow bg-gray-200 relative flex items-center justify-center" style={{ minHeight: '480px' }}>
                        <Image
                          src={INSTAGRAM_IMG}
                          alt="Instagram post of cheddar bacon burger"
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 640px) 100vw, 400px"
                          priority
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="22" y1="2" x2="11" y2="13"></line>
                              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                          </div>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                          </svg>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">127 likes</span>
                        </div>
                        <div className="text-sm mt-1">
                          <span className="font-medium">plately.restaurant</span> Hello Cheddar Bacon Burger! This juicy beef patty topped with aged cheddar, crispy bacon and our signature burger sauce is perfect for your weekend cravings!
                        </div>
                        <div className="text-xs text-blue-500 mt-1">
                          #BurgerLovers #FreshIngredients #LocalEats
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentPostType === 1 && (
                  <motion.div 
                    key="facebook"
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Facebook Post Placeholder */}
                    <div className="w-full h-full flex flex-col" style={{ aspectRatio: '2/5' }}>
                      <div className="p-3 flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">Plately Restaurant</span>
                          <span className="text-xs text-gray-500">2 hours ago · 🌎</span>
                        </div>
                      </div>
                      <div className="p-3 pb-0">
                        <p className="text-sm">Weekend special alert! Our Cheddar Bacon Burger is back by popular demand. Made with locally-sourced beef, aged cheddar, and our house-cured bacon. Tag someone you'd share this with! 🍔</p>
                      </div>
                      <div className="flex-grow bg-gray-200 mt-3 relative flex items-center justify-center" style={{ minHeight: '480px' }}>
                        <Image
                          src={FACEBOOK_IMG}
                          alt="Facebook post of cheddar bacon burger"
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 640px) 100vw, 400px"
                          priority
                        />
                      </div>
                      <div className="p-3 border-t border-gray-200 mt-2">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">👍</span>
                            <span>243</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span>86 comments</span>
                            <span>12 shares</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                          <button className="flex items-center gap-2 text-gray-500">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                            </svg>
                            Like
                          </button>
                          <button className="flex items-center gap-2 text-gray-500">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            Comment
                          </button>
                          <button className="flex items-center gap-2 text-gray-500">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                              <polyline points="16 6 12 2 8 6"></polyline>
                              <line x1="12" y1="2" x2="12" y2="15"></line>
                            </svg>
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentPostType === 2 && (
                  <motion.div 
                    key="tiktok"
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* TikTok Post Placeholder */}
                    <div className="w-full h-full flex flex-col bg-black">
                      <div className="flex-grow relative flex items-center justify-center" style={{ minHeight: '530px' }}>
                        <Image
                          src={TIKTOK_IMG}
                          alt="TikTok video of cheddar bacon burger"
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 640px) 100vw, 400px"
                          priority
                        />
                        
                        {/* Top Navigation Bar */}
                        <div className="absolute top-0 left-0 right-0 p-4 z-10 flex items-center justify-between">
                          {/* Left side - Empty to balance the layout */}
                          <div className="w-6"></div>
                          
                          {/* Center - Navigation Tabs */}
                          <div className="flex items-center gap-8">
                            <span className="text-white/70 text-base">Following</span>
                            <span className="text-white text-base font-semibold border-b-2 border-white pb-1">For You</span>
                          </div>
                          
                          {/* Right side - Search Icon */}
                          <div className="w-6">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                              <circle cx="11" cy="11" r="8"/>
                              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                          </div>
                        </div>
                        
                        {/* Bottom Text - Username and Caption */}
                        <div className="absolute bottom-6 left-4 z-10 max-w-[80%]">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-base">paltely.restaurant</span>
                            <span className="text-white/80 text-sm">Plately Restaurant</span>
                          </div>
                          <p className="text-white text-sm mt-1 leading-tight">Weekend vibes call for our signature Cheddar Bacon Smash Burger. Crispy edges, melty cheese, and thick-cut bacon - pure weekend perfection.</p>
                        </div>
                        
                        {/* Right Side Actions */}
                        <div className="absolute right-4 bottom-8 z-10 flex flex-col items-center gap-6">
                          {/* Profile Picture */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                              <div className="w-full h-full bg-gray-400 rounded-full"></div>
                            </div>
                            <div className="w-6 h-6 -mt-3 bg-pink-500 rounded-full flex items-center justify-center border-2 border-white">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                            </div>
                          </div>
                          
                          {/* Like Heart */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="p-2 bg-black/30 rounded-full">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                            </div>
                            <span className="text-white text-xs font-semibold drop-shadow">1.4M</span>
                          </div>
                          
                          {/* Comments */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="p-2 bg-black/30 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 27 26">
                                <path fill="#fff" fillRule="evenodd" d="M27 11.5c0 .427-.027.848-.08 1.262-.405 4.328-4.21 10.093-12.263 13.01a.491.491 0 0 1-.657-.466v-2.314a15.96 15.96 0 0 1-.5.008C6.044 23 0 17.851 0 11.5S6.044 0 13.5 0 27 5.149 27 11.5ZM8 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm8-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <span className="text-white text-xs font-semibold drop-shadow">7.4K</span>
                          </div>
                          
                          {/* Bookmark */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="p-2 bg-black/30 rounded-full">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                              </svg>
                            </div>
                            <span className="text-white text-xs font-semibold drop-shadow">46.8K</span>
                          </div>
                          
                          {/* Share */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="p-2 bg-black/30 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 27 26">
                                <path fill="#fff" d="M12.912 1.002c0-.891 1.078-1.337 1.707-.707L25.5 11.174a2 2 0 0 1 0 2.828L14.618 24.88c-.63.63-1.706.183-1.707-.707v-5.929c-6.66 0-9.698 1.84-11.341 3.436-.65.631-1.636.279-1.568-.625.824-10.97 7.093-13.563 12.91-14.468V1.002Z"/>
                              </svg>
                            </div>
                            <span className="text-white text-xs font-semibold drop-shadow">43K</span>
                          </div>
                          
                          {/* Music Record */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="p-2 bg-black/30 rounded-full">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center animate-spin-slow">
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Removed indicator dots */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessDemoNew;
