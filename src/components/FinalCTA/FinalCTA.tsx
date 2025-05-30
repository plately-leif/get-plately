"use client";

import React from "react";

const FinalCTA: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center px-6 md:px-20 py-20 bg-white gap-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-primary">
        Want to be first in line?
      </h2>
      <form className="w-full max-w-lg flex flex-col sm:flex-row gap-4" onSubmit={e => e.preventDefault()}>
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-base"
          required
          aria-label="Email address"
        />
        <button
          type="submit"
          className="bg-primary text-white font-semibold rounded-md px-6 py-3 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
        >
          Join Waitlist
        </button>
      </form>
      <p className="text-sm text-primary/80 text-center max-w-md">
        We'll only use your email to let you know when we launch.
      </p>
    </section>
  );
};

export default FinalCTA; 