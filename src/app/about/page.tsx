import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About - Plately AI',
  description: 'Learn about Plately AI and our mission to help restaurants with social media content creation.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link 
        href="/" 
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Homepage
      </Link>
      
      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Plately</h1>
        
        <div className="space-y-6 text-gray-700">
          <p>
            Plately is a small Norwegian–U.S. team of former servers, managers, marketers, creatives and tech-tinkerers. We've watched independent restaurants pour hours into social-media busywork, so we're building an AI tool that turns the photos and menu you already have into platform-perfect posts in minutes, not nights.
          </p>
          
          <p>
            We're still pre-launch—sketching flows, testing features, and documenting every step in public. No corporate jargon, no glossy agency fees—just practical tech from people who've closed plenty of checks and wiped plenty of tables.
          </p>
          
          <p>
            If keeping your socials fresh feels harder than keeping the line moving, hop on the wait-list and help shape Plately as we build it. Our goal is simple: give every neighbourhood eatery the social presence of a big brand—without the big-brand budget or time sink. We can't wait to show you what's cooking.
          </p>
        </div>
        
        <div className="mt-10">
          <Link 
            href="/#join-waitlist" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent/90 transition-colors"
          >
            Join the Waitlist
          </Link>
        </div>
      </div>
    </div>
  );
}
