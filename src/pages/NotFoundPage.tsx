import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto text-center py-24 px-4">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 font-black text-2xl mx-auto mb-4">
        404
      </div>
      <h1 className="text-2xl font-bold text-slate-950 mb-2">Page Not Found</h1>
      <p className="text-xs text-slate-500 mb-6">
        The tool or directory page you are looking for does not exist or may have been relocated.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Return to Home
      </Link>
    </div>
  );
};
