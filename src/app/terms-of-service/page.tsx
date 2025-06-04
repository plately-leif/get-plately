import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - Plately AI',
  description: 'Terms and conditions for using the Plately AI website and services.',
};

export default function TermsOfService() {
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
      
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Plately AI – Pre-Launch Terms of Service</h1>
        <p className="text-gray-600">Effective date: 1 June 2025</p>
      </div>

      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Who we are</h2>
          <p className="mb-4">
            Plately AI AS ("Plately," "we," "our," or "us") is building software that will help restaurants create and schedule social-media content. Until the product is live, this website (the "Site") serves only as an information page and wait-list form.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. What you can do on this Site</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Read about the upcoming product.</li>
            <li>Join the wait-list by submitting a valid email address.</li>
            <li>That's it—no paid features, no user accounts, no dashboards (yet).</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Your wait-list submission</h2>
          <p className="mb-4">By entering your email you:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>confirm you are at least 18 years old or have permission from a legal guardian;</li>
            <li>give us permission to send occasional emails about product progress, beta invites, launch dates, and related updates;</li>
            <li>may unsubscribe at any time via the "unsubscribe" link in any message.</li>
          </ul>
          <p className="mb-4">
            We will never sell your email address or spam you with unrelated offers.
            For details on how we store and protect personal data, see our <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Intellectual property</h2>
          <p className="mb-4">
            All text, images, logos, and mock-ups on the Site belong to Plately AI or our licensors. You may not copy, modify, or redistribute them without our written consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. No warranties & limitation of liability</h2>
          <p className="mb-2">The Site and any pre-launch materials are provided "as is." We do not guarantee:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>that the future product will launch on any specific date;</li>
            <li>that the features described will remain unchanged.</li>
          </ul>
          <p>
            To the fullest extent permitted by Norwegian law, Plately AI and its directors, employees, or partners are not liable for any indirect or consequential losses arising from your use of—or inability to use—this Site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Governing law</h2>
          <p>
            These Terms are governed by the laws of Norway, without regard to conflict-of-law rules. Any dispute will be handled by the courts of Oslo, unless applicable consumer law gives you the right to choose a different venue.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Changes to these Terms</h2>
          <p>
            We may update these Terms when we move from wait-list to live product or for other operational reasons. Material changes will be highlighted on this page and, where appropriate, notified via email. Continued use of the Site after changes means you accept the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact</h2>
          <p className="mb-4">Questions? Email <a href="mailto:legal@plately.com" className="text-accent hover:underline">legal@plately.com</a> or write to:</p>
          <address className="not-italic">
            Plately AI<br />
            Apotekergata 10<br />
            0180 Oslo, Norway
          </address>
        </section>
      </div>
    </div>
  );
}
