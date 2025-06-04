import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - Plately AI',
  description: 'Learn how Plately AI collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Plately AI – Pre-Launch Privacy Policy</h1>
        <p className="text-gray-600">Last updated: 1 June 2025</p>
      </div>

      <div className="prose max-w-none">
        <p className="mb-8">
          Plately AI ("Plately," "we," "our," or "us") respects your privacy. This policy explains what data we collect on this landing-page wait-list, why we collect it, and how you can exercise your rights under the EU / EEA General Data Protection Regulation ("GDPR") and Norwegian law.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">1. What we collect — and why</h2>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Data category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">What it is</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Purpose</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Legal basis (GDPR Art. 6)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Email address (supplied by you)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">hello@example.com</td>
                  <td className="px-4 py-3 text-sm text-gray-600">• Send product-launch updates, beta invites, and relevant progress news</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Consent (Art. 6 (1)(a))</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Basic analytics</td>
                  <td className="px-4 py-3 text-sm text-gray-600">IP address, coarse location (city), device type, pages viewed</td>
                  <td className="px-4 py-3 text-sm text-gray-600">• Understand site traffic • Improve copy & UX</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Legitimate interest (Art. 6 (1)(f))—optimising our website</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Server logs</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Date/time of request, user-agent</td>
                  <td className="px-4 py-3 text-sm text-gray-600">• Detect abuse and ensure site security</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Legitimate interest—security</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-sm text-gray-600 italic">
            No payment data, user-generated content, or behavioural profiling is collected at this pre-launch stage.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">2. Cookies & third-party tools</h2>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Tool / provider</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">What it does</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Opt-out?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Google Analytics 4 (USA)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Sets first-party cookies to measure page views, session length, and referrers</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Yes – cookie banner "Reject analytics" disables GA</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">AWS Amplify (EU region)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Hosts the site; stores log files</td>
                  <td className="px-4 py-3 text-sm text-gray-600">n/a (strictly necessary)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Supabase (EU region)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Stores wait-list emails in an encrypted database</td>
                  <td className="px-4 py-3 text-sm text-gray-600">n/a (strictly necessary)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-sm text-gray-600">
            We do not use marketing pixels or cross-site advertising cookies.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How long we keep your data</h2>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Data</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Retention rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Email address</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Until (a) you unsubscribe, or (b) 12 months after final launch email—whichever comes first</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Analytics & log data</td>
                  <td className="px-4 py-3 text-sm text-gray-600">14 months, then aggregated or deleted</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Your rights</h2>
          <p className="mb-4">You can, at any time:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate data</li>
            <li>Delete your data ("right to be forgotten")</li>
            <li>Withdraw consent for launch emails (unsubscribe link in every mail)</li>
            <li>Object to analytics processing</li>
            <li>Complain to the Norwegian Data Protection Authority (Datatilsynet) if you believe we mishandle your data</li>
          </ul>
          <p>
            To exercise any right, email <a href="mailto:privacy@plately.com" className="text-accent hover:underline">privacy@plately.com</a>—we'll reply within 30 days.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. International data transfers</h2>
          <p>
            Email addresses are stored on Supabase servers located in the EU. Google Analytics data may be processed in the USA under Google's EU Standard Contractual Clauses. By using the site you acknowledge these transfers.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Security measures</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>TLS encryption (HTTPS) for all traffic</li>
            <li>Encrypted storage (AES-256) for the wait-list table</li>
            <li>Least-privilege IAM roles on AWS & Supabase</li>
          </ul>
          <p className="text-sm text-gray-600">
            No internet transmission is 100% secure, but we take reasonable steps to protect your data.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children</h2>
          <p>
            This site is not directed to children under 16. We do not knowingly collect their data. If you believe a child has joined the wait-list, contact us for immediate deletion.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to this policy</h2>
          <p>
            We may update this policy as we move from wait-list to live product. Material changes will be announced by banner on the site and via email to subscribers at least 14 days before they take effect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact</h2>
          <address className="not-italic">
            Plately AI<br />
            Apotekergata 10, 0180 Oslo, Norway<br />
            Email: <a href="mailto:privacy@plately.com" className="text-accent hover:underline">privacy@plately.com</a>
          </address>
          <p className="mt-2 text-sm text-gray-600">
            (For legal notices: <a href="mailto:legal@plately.com" className="text-accent hover:underline">legal@plately.com</a>)
          </p>
          <p className="mt-6 italic">
            Thank you for trusting us with your email. We'll keep the comms useful, the data safe, and the legal bits clear.
          </p>
        </section>
      </div>
    </div>
  );
}
