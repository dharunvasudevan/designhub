import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send } from 'lucide-react';
import { disciplinesData } from '../../data/disciplinesData';

interface SubmitToolModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const SubmitToolModal: React.FC<SubmitToolModalProps> = ({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  useEffect(() => {
    const handleOpen = () => setInternalIsOpen(true);
    window.addEventListener('open-submit-modal', handleOpen);
    return () => window.removeEventListener('open-submit-modal', handleOpen);
  }, []);

  const [name, setName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [category, setCategory] = useState(disciplinesData[0].name);
  const [pricingModel, setPricingModel] = useState<'Freemium' | 'Paid' | 'Free & Open Source'>('Freemium');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && websiteUrl.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setWebsiteUrl('');
        setDescription('');
        setEmail('');
        handleClose();
      }, 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-fade"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-xl relative animate-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Submission Received!</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Thank you for contributing to DesignHub. Our editorial team reviews submissions weekly for stability, utility, and design craft.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-slate-900"></span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                COMMUNITY DIRECTORY
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-950 mb-1">Submit a Tool</h2>
            <p className="text-xs text-slate-500 mb-6">
              Recommend an industry essential or newly launched design software for curation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tool Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Penpot, Rive, Framer"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Website URL *</label>
                <input
                  type="url"
                  required
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Discipline</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-slate-400 focus:bg-white cursor-pointer"
                  >
                    {disciplinesData.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pricing Model</label>
                  <select
                    value={pricingModel}
                    onChange={(e) => setPricingModel(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-slate-400 focus:bg-white cursor-pointer"
                  >
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid</option>
                    <option value="Free & Open Source">Free &amp; Open Source</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="One or two sentences describing what this tool does best..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-slate-400 focus:bg-white resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Email (for notification)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@studio.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit for Review</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
