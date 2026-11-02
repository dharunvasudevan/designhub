import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await login({ email, password });
      navigate('/explore');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      <div className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-xs">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white font-bold mx-auto mb-3 shadow-xs">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h7a8 8 0 0 1 8 8 8 8 0 0 1-8 8H4V4zm4 4v8h3a4 4 0 0 0 4-4 4 4 0 0 0-4-4H8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-950">Welcome back</h1>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to access your saved tools and custom curated collections.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@studio.com"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <a href="#forgot" className="text-[11px] text-slate-500 hover:text-slate-900">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-slate-400 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-xs mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
          Don't have an account yet?{' '}
          <Link to="/signup" className="font-semibold text-slate-950 hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};
