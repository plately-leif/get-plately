'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

function UpdatePasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    // Check for the access token in the URL hash
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get('access_token');
    
    if (token) {
      setAccessToken(token);
    } else {
      setError('Invalid password reset link');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!accessToken) {
      setError('No access token found');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setMessage('Password updated successfully! Redirecting to sign in...');
      
      // Redirect to sign in after a short delay
      setTimeout(() => {
        router.push('/auth/signin');
      }, 2000);
    } catch (err) {
      console.error('Update password error:', err);
      setError('Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-primary" style={{ color: '#0B3954', fontFamily: 'Inter, sans-serif' }}>
            Update Password
          </h2>
          <p className="mt-2 text-center text-base text-secondary-text" style={{ color: '#6B7280' }}>
            Enter your new password below.
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 border border-red-200">
            <p className="text-base font-medium text-red-800">{error}</p>
          </div>
        )}

        {message ? (
          <div className="rounded-md bg-green-50 p-4 border border-green-200">
            <p className="text-base font-medium text-green-800">{message}</p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="password" className="sr-only">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-4 py-3 border border-border placeholder-secondary-text text-text focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-base"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  style={{ borderColor: '#E5E7EB', color: '#111827', fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-4 py-3 border border-border placeholder-secondary-text text-text focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-base"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  style={{ borderColor: '#E5E7EB', color: '#111827', fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-accent text-white font-semibold rounded-md px-6 py-3 w-full hover:bg-primary transition disabled:opacity-50"
                style={{ backgroundColor: '#FE644D', fontFamily: 'Inter, sans-serif' }}
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        )}

        <div className="text-center">
          <Link
            href="/auth/signin"
            className="text-accent hover:text-primary font-medium"
            style={{ color: '#FE644D' }}
          >
            Back to Sign In
          </Link>
        </div>
      </div>
  );
}

// Loading fallback component
function UpdatePasswordLoading() {
  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-4xl font-extrabold text-primary" style={{ color: '#0B3954', fontFamily: 'Inter, sans-serif' }}>
          Update Password
        </h2>
        <p className="mt-2 text-center text-base text-secondary-text" style={{ color: '#6B7280' }}>
          Loading...
        </p>
      </div>
      <div className="rounded-md bg-gray-50 p-4 border border-gray-200">
        <p className="text-base font-medium text-gray-800">Please wait while we load your information...</p>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function UpdatePassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-BG1 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<UpdatePasswordLoading />}>
        <UpdatePasswordForm />
      </Suspense>
    </div>
  );
}
