"use client";

import React, { useState } from "react";

const FinalCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-accent">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-24 h-24 md:w-40 md:h-40 rounded-full bg-white -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 rounded-full bg-white translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-white opacity-30"></div>
          <div className="absolute bottom-1/3 left-1/3 w-20 h-20 rounded-full bg-white opacity-20"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 md:px-20 py-24 gap-10">
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Want to be first in line?
          </h2>
          <p className="text-lg text-white/90 max-w-md mx-auto">
            Join our waitlist today and be among the first to experience Plately.
          </p>
        </div>

        <div className="w-full max-w-lg">
          {!isSubmitted ? (
            <form 
              className="w-full flex flex-col sm:flex-row gap-4 transform hover:scale-[1.02] transition-transform duration-300" 
              onSubmit={handleSubmit}
            >
              <div className="flex-1 relative group">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-lg border-2 border-white/80 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent shadow-lg backdrop-blur-sm"
                  required
                  aria-label="Email address"
                  disabled={isSubmitting}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-4 bg-white text-accent font-bold rounded-lg shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-accent transition-all duration-300 disabled:opacity-70 flex items-center justify-center min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Joining...
                  </>
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </form>
          ) : (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center border-2 border-white/80 shadow-lg animate-fadeIn">
              <svg className="w-12 h-12 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
              <p className="text-white/90">We'll notify you as soon as Plately launches.</p>
            </div>
          )}
        </div>

        <p className="text-sm text-white/80 text-center max-w-md mt-2">
          We'll only use your email to let you know when we launch.
          <br />
          No spam, ever.
        </p>
      </div>
    </section>
  );
};

export default FinalCTA; 