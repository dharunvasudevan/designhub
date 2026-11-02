import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, User as UserIcon, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [navSearch, setNavSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/explore?q=${encodeURIComponent(navSearch.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const handleCategoriesClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('disciplines');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xs border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105 shadow-xs">
            {/* Stylized D Logo */}
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h7a8 8 0 0 1 8 8 8 8 0 0 1-8 8H4V4zm4 4v8h3a4 4 0 0 0 4-4 4 4 0 0 0-4-4H8z" />
            </svg>
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">DesignHub</span>
        </Link>

        {/* Center: Main Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? 'text-slate-950 font-semibold' : 'text-slate-600 hover:text-slate-950'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? 'text-slate-950 font-semibold' : 'text-slate-600 hover:text-slate-950'
              }`
            }
          >
            Explore Tools
          </NavLink>
          <Link
            to="/explore"
            onClick={handleCategoriesClick}
            className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors"
          >
            Categories
          </Link>
        </nav>

        {/* Right: Search, Explore Tools Button, Profile */}
        <div className="hidden sm:flex items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              placeholder="Search..."
              className="w-44 md:w-52 pl-8 pr-3 py-1.5 bg-white text-xs rounded-lg border border-slate-200 hover:border-slate-300 focus:border-slate-400 focus:outline-hidden transition-all placeholder:text-slate-400"
            />
          </form>

          <Link
            to="/explore"
            className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs"
          >
            Explore Tools
          </Link>

          {/* User Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-slate-800 transition-colors cursor-pointer shadow-2xs"
              title={isAuthenticated ? user?.email : 'Account'}
            >
              <UserIcon className="w-4 h-4 text-white" />
            </button>

            {userDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 text-xs"
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 border-b border-slate-100">
                      <div className="font-semibold text-slate-900">{user?.name}</div>
                      <div className="text-slate-500 truncate">{user?.email}</div>
                    </div>
                    <Link
                      to="/explore"
                      className="block px-3 py-2 text-slate-700 hover:bg-slate-50"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Saved Tools ({user?.savedToolSlugs.length || 0})
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-slate-800 font-medium hover:bg-slate-50"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-3 py-2 text-slate-600 hover:bg-slate-50"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 px-4 py-3 bg-white space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 text-sm rounded-lg border border-slate-200"
            />
          </form>
          <div className="flex flex-col space-y-2 pt-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium py-1 text-slate-800"
            >
              Home
            </Link>
            <Link
              to="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium py-1 text-slate-800"
            >
              Explore Tools
            </Link>
            <Link
              to="/explore"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleCategoriesClick(e);
              }}
              className="text-sm font-medium py-1 text-slate-800"
            >
              Categories
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium py-1 text-slate-600"
            >
              {isAuthenticated ? 'My Profile' : 'Sign In'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
