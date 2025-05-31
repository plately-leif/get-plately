"use client";
import React from "react";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-15 pt-12 pb-20 bg-gradient-to-r from-gray-50 to-white gap-18">
      {/* Left: Text & CTA */}
      <div className="flex-1 flex flex-col items-center lg:items-start gap-8 max-w-xl ml-0 md:ml-8 lg:ml-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center lg:text-left text-gray-900 leading-tight">
          Turn your food and restaurant photos into a month of scroll stopping social posts — in under an hour.
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
        <Image
          src="https://wiqdmiimlxxuhrvhhuxs.supabase.co/storage/v1/object/sign/website-assets/plately-dashboard-mockup-50.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzcyMWQ1YWYzLTg5MjQtNGMxYi1hYTVhLTYzMWQxYzg3YzczZiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9wbGF0ZWx5LWRhc2hib2FyZC1tb2NrdXAtNTAuanBnIiwiaWF0IjoxNzQ4NjQxNDc4LCJleHAiOjMzMjU0NDE0Nzh9.-d6yIB4DOvhmw4VmQG7okeRNwLo2xkmoQz2WNMbFWHw"
          alt="Plately dashboard mockup"
          width={800}
          height={570}
          className="w-full max-w-[800px] rounded-2xl shadow-lg object-contain"
          priority
        />
      </div>
    </section>
  );
};

export default Hero; 