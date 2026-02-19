'use client';

import { useState } from 'react';
import Image from 'next/image';
import { registerUser, loginUser } from '@/lib/actions/user-actions';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { email, password, confirmPassword } = formData;

      if (isLogin) {
        // SIGN IN
        const response = await loginUser(email, password);
        cookieStore.set('token', response.payload.token);
        cookieStore.set('role', response.payload.user);
        router.push('admin/dashboard');
      } else {
        // SIGN UP
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (!email) {
          alert('Email is required');
        }
        if (!password) {
          alert('password is required');
        }
        const response = await registerUser(email, password);
        if (!response) {
          alert('user created successfully');
        }
        router.push('admin/dashboard');
      }
    } catch (err: any) {
      // Beautiful error messages - NO CRASH OVERLAY!
      const errorMessages: Record<string, string> = {
        'User not found': 'No account found with this email',
        'Invalid password': 'Incorrect password',
        'User already exists': 'Account already exists! Try signing in.',
        'Passwords do not match': 'Passwords must match',
      };

      setError(errorMessages[err.message] || err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-stretch bg-gray-50"
      style={
        {
          '--left-width': '60%',
          '--right-width': '40%',
        } as React.CSSProperties
      }
    >
      <div className="grid h-screen w-full grid-cols-[var(--left-width)_var(--right-width)] overflow-hidden bg-white">
        {/* LEFT: Branding */}
        <div className="hidden flex-col items-center justify-center gap-6 border-r bg-gradient-to-br from-green-50 to-blue-50 px-10 py-12 lg:flex">
          <Image src="/logo.png" alt="Kamna Logo" width={120} height={120} priority />
          <div className="text-center">
            <h1 className="mb-2 text-4xl font-bold text-gray-900">Kamna</h1>
            <p className="text-lg text-gray-600">Welcome back</p>
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16">
          <div className="w-full max-w-md space-y-8">
            {/* Toggle */}
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
                disabled={isLoading}
                className={`flex-1 rounded-md px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  isLogin
                    ? 'bg-white text-green-700 shadow-sm ring-2 ring-green-200'
                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                } disabled:opacity-50`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
                disabled={isLoading}
                className={`flex-1 rounded-md px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  !isLogin
                    ? 'bg-white text-green-700 shadow-sm ring-2 ring-green-200'
                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                } disabled:opacity-50`}
              >
                Sign Up
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="animate-shake rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading}
              />

              {/* Password */}
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading}
              />

              {/* Confirm Password - ONLY for signup */}
              {!isLogin && (
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading}
                />
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing…
                  </>
                ) : isLogin ? (
                  'Sign In'
                ) : (
                  'Create account'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
