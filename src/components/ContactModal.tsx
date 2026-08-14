import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, Copy, Sparkles, Building2, MessageCircle } from 'lucide-react';
import { MascotIcon } from './MascotIcon';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyEmail: (email: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onCopyEmail }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [volume, setVolume] = useState('10k - 50k conversations/mo');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep state or auto close after user feedback
    }, 2000);
  };

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-black/10">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/90">
          <div className="flex items-center gap-3">
            <MascotIcon size={32} />
            <div>
              <h3 className="text-base font-heading font-semibold text-black">Get in Touch with Velcora AI</h3>
              <p className="text-xs text-zinc-500 font-body">Schedule custom architecture demo or enterprise deployment</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-black rounded-full hover:bg-zinc-200/80 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 bg-white">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-xl font-heading font-bold text-black">Request Received</h4>
              <p className="text-sm text-zinc-600 max-w-md mx-auto">
                Thank you, {name}! A Velcora Solutions Engineer has received your specifications and will respond at <span className="font-semibold text-black">{email}</span> within 2 business hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-black text-white text-xs font-semibold rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Return to Experience
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black font-body"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black font-body"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Technologies"
                    className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black font-body"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Expected Monthly Volume</label>
                  <select
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black font-body bg-white"
                  >
                    <option>&lt; 10k conversations/mo</option>
                    <option>10k - 50k conversations/mo</option>
                    <option>50k - 200k conversations/mo</option>
                    <option>200k+ enterprise tier</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Use Case & Integrations</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your knowledge base sources, customer support channels, or custom agent requirements..."
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:border-black font-body"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-100">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Mail size={14} className="text-zinc-400" />
                  <span>Direct: </span>
                  <button
                    type="button"
                    onClick={() => onCopyEmail('hello@velcora.ai')}
                    className="text-black font-semibold underline underline-offset-2 hover:opacity-75 cursor-pointer"
                  >
                    hello@velcora.ai
                  </button>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-initial px-4 py-2 text-xs font-medium text-zinc-600 hover:text-black transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-initial px-6 py-2 text-xs font-semibold bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
                  >
                    Submit Request
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
