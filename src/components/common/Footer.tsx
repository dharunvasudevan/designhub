import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group inline-flex">
              <div className="w-6 h-6 rounded-md bg-slate-950 flex items-center justify-center text-white font-bold">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h7a8 8 0 0 1 8 8 8 8 0 0 1-8 8H4V4zm4 4v8h3a4 4 0 0 0 4-4 4 4 0 0 0-4-4H8z" />
                </svg>
              </div>
              <span className="font-bold text-slate-900 text-base tracking-tight">DesignHub</span>
            </Link>

            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              The Curated Directory for Creative Professionals. Precision tooling, modern workflows, and architectural design systems.
            </p>

            {/* Newsletter input form */}
            <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for weekly dispatches"
                className="grow px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-slate-400 placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shrink-0 shadow-xs cursor-pointer"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>

          {/* Curated Categories */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Curated Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li>
                <Link to="/explore?category=UI%2FUX+Design" className="hover:text-slate-900 transition-colors">
                  Interface Design
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Graphic+Design" className="hover:text-slate-900 transition-colors">
                  Typography &amp; Type
                </Link>
              </li>
              <li>
                <Link to="/explore?category=UI%2FUX+Design" className="hover:text-slate-900 transition-colors">
                  Design Systems
                </Link>
              </li>
              <li>
                <Link to="/explore?category=3D+%26+Motion" className="hover:text-slate-900 transition-colors">
                  Motion &amp; 3D
                </Link>
              </li>
              <li>
                <Link to="/explore?category=AI+Design" className="hover:text-slate-900 transition-colors">
                  Generative AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Directory
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-submit-modal'))}
                  className="hover:text-slate-900 transition-colors cursor-pointer text-left"
                >
                  Submit a Tool
                </button>
              </li>
              <li>
                <Link to="/explore" className="hover:text-slate-900 transition-colors">
                  Featured Software
                </Link>
              </li>
              <li>
                <a href="#standards" className="hover:text-slate-900 transition-colors">
                  Editorial Standards
                </a>
              </li>
              <li>
                <Link to="/explore" className="hover:text-slate-900 transition-colors">
                  Archive Index
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Legal &amp; Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li>
                <a href="#privacy" className="hover:text-slate-900 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-slate-900 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-slate-900 transition-colors">
                  Cookie Preferences
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p className="uppercase tracking-wider font-medium text-slate-500">
            DESIGNHUB — THE CURATED DIRECTORY FOR CREATIVE PROFESSIONALS
          </p>
          <p>
            &copy; 2026 DesignHub Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
