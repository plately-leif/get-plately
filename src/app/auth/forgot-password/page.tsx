'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`
      });

      if (error) throw error;

      setMessage('Check your email for the password reset link');
      setEmail('');
    } catch (err) {
      console.error('Password reset error:', err);
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-BG1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-primary" style={{ color: '#0B3954', fontFamily: 'Inter, sans-serif' }}>
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-base text-secondary-text" style={{ color: '#6B7280' }}>
            Enter your email and we’ll send you a reset link.<br />
            Or{' '}
            <Link
              href="/auth/signin"
              className="text-accent underline hover:text-primary font-semibold"
              style={{ color: '#FE644D' }}
            >
              sign in to your account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-4 py-3 border border-border placeholder-secondary-text text-text focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-base"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                style={{ borderColor: '#E5E7EB', color: '#111827', fontFamily: 'Inter, sans-serif' }}
              />
            </div>
          </div>

          {message && (
            <div className="rounded-md bg-green-50 p-4 border border-green-200">
              <p className="text-base font-medium text-green-800">{message}</p>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200">
              <p className="text-base font-medium text-red-800">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-accent text-white font-semibold rounded-md px-6 py-3 w-full hover:bg-primary transition disabled:opacity-50"
              style={{ backgroundColor: '#FE644D', fontFamily: 'Inter, sans-serif' }}
            >
              {isLoading ? 'Sending...' : 'Send reset link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
