"use client";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="w-full flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-20 pt-12 pb-20 bg-gradient-to-r from-gray-50 to-white gap-12">
      {/* Left: Text & CTA */}
      <div className="flex-1 flex flex-col items-center lg:items-start gap-8 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center lg:text-left text-gray-900 leading-tight">
          Turn your food and restaurant photos into a month of social posts — in under an hour.
        </h1>
        <p className="text-lg md:text-xl text-center lg:text-left text-gray-600 max-w-lg">
          Plately is the only AI-powered content tool made just for restaurants.
        </p>
        <form className="w-full flex flex-col sm:flex-row gap-4" onSubmit={e => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-base"
            required
            aria-label="Email address"
          />
          <button
            type="submit"
            className="bg-primary text-white font-semibold rounded-md px-6 py-3 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
          >
            Join Waitlist →
          </button>
        </form>
      </div>
      {/* Right: Illustration */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[320px] h-[220px] md:w-[400px] md:h-[300px] lg:w-[500px] lg:h-[400px] bg-gray-200 rounded-2xl flex items-center justify-center border-2 border-gray-300">
          {/* TODO: Replace with actual illustration */}
          <span className="text-gray-400 text-lg">Restaurant Illustration</span>
        </div>
      </div>
    </section>
  );
};

export default Hero; 