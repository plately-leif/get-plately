import React from "react";
import Image from "next/image";

const RestaurantSection: React.FC = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-20 py-20 bg-gray-50 gap-12">
      {/* Left: Text */}
      <div className="flex-1 flex flex-col gap-6 max-w-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Made for restaurants. Not influencers.
        </h2>
        <p className="text-lg text-gray-600">
          Plately is the only platform built 100% for food businesses. From your menu to your feed — every feature is made with service in mind.
        </p>
      </div>
      {/* Right: Comparison Cards */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[480px] flex flex-col gap-6">
          {/* Restaurant Card - Highlighted */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-accent relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
              Built for you
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Restaurant-Focused Features
            </h3>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Food photography optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Menu-friendly templates</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Appetite-driving captions</span>
              </li>
            </ul>
          </div>
          
          {/* Influencer Card - Dimmed */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 opacity-60">
            <h3 className="text-xl font-bold text-gray-500 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Generic Influencer Tools
            </h3>
            <ul className="text-gray-500 space-y-2">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>One-size-fits-all templates</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Complex editing tools</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Lifestyle-focused, not food-focused</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection; 