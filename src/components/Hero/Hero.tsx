"use client";
import React, { useState } from "react";
import Image from "next/image";
import { addToWaitlist } from "@/lib/supabase/waitlist";

const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      const { error } = await addToWaitlist({ email });
      if (error) throw error;
      
      setMessage({ 
        type: 'success', 
        text: 'Thanks for joining the waitlist! We\'ll be in touch soon.' 
      });
      setEmail('');
    } catch (error: unknown) {
      console.error('Error joining waitlist:', error);
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message);
      }
      
      setMessage({ 
        type: 'error', 
        text: errorMessage.toLowerCase().includes('duplicate') 
          ? 'This email is already on the waitlist!' 
          : `Error: ${errorMessage}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="w-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-15 pt-12 pb-20 bg-gradient-to-r from-gray-50 to-white gap-18">
      {/* Left: Text & CTA */}
      <div className="flex-1 flex flex-col items-center lg:items-start gap-8 max-w-xl ml-0 md:ml-8 lg:ml-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center lg:text-left text-gray-900 leading-tight">
          Turn restaurant photos into a month of <span className="text-accent">scroll-stopping</span> social posts — in minutes.
        </h1>
        <p className="text-lg md:text-xl text-center lg:text-left text-gray-600 max-w-lg">
          Plately is the AI-powered content tool built exclusively for restaurants.
        </p>
        <form className="w-full flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-base"
            required
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className={`bg-accent text-white font-semibold rounded-md px-6 py-3 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Joining...' : 'Join The Waitlist'}
          </button>
        </form>
        {message && (
          <p className={`text-sm max-w-lg text-center lg:text-left ${
            message.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}>
            {message.text}
          </p>
        )}
        <p className="text-sm text-gray-500 max-w-lg text-center lg:text-left">We'll notify you when early access becomes available. No spam, ever.</p>
      </div>
      {/* Right: Illustration */}
      <div className="flex-1 flex items-center justify-center scale-90">
        <Image
          src="https://assets.getplately.com/assets/images/Hero-Pasta-plately.webp"
          alt="Bowl of basil-tomato linguine next to a generated social-media post, demonstrating Plately output"
          width={720}
          height={720}
          className="w-full max-w-[720px] rounded-2xl shadow-xl object-cover ring-1 ring-gray-100"
          priority
        />
      </div>
    </section>
  );
};

export default Hero; 