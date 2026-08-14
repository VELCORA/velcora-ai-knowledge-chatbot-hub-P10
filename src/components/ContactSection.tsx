import React, { useState } from 'react';
import { Mail, Check, Copy, Send, Sparkles, Briefcase, Lightbulb, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  onCopyEmail: (email: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onCopyEmail }) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'pitch' | 'careers' | 'hello'>('demo');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedEmail(address);
    onCopyEmail(address);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
    }, 1000);
  };

  return (
    <section id="contact" className="relative z-10 w-full py-20 px-5 sm:px-8 md:px-12 bg-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 mb-3">
              <Mail size={13} className="text-white" />
              Direct Communication Gateway
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Get in Touch with Velcora AI
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-body mt-2 max-w-2xl">
              Whether you are looking to deploy an enterprise pilot, pitch an integration idea, or join our research team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCopy('hello@velcora.ai')}
              className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
            >
              {copiedEmail === 'hello@velcora.ai' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>hello@velcora.ai</span>
            </button>
            <button
              onClick={() => handleCopy('careers@velcora.ai')}
              className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
            >
              {copiedEmail === 'careers@velcora.ai' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>careers@velcora.ai</span>
            </button>
          </div>
        </div>

        {/* Multi-Intent Contact Box */}
        <div className="bg-zinc-900 rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-2xl">
          
          {/* 4 Tabs */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-zinc-800 mb-8">
            {[
              { id: 'demo', label: 'Enterprise Demo & POC', icon: Sparkles },
              { id: 'pitch', label: 'Pitch Us an Idea', icon: Lightbulb },
              { id: 'careers', label: 'Come Work Here', icon: Briefcase },
              { id: 'hello', label: 'Send a Brief Hello', icon: MessageSquare },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTab(t.id as any);
                    setSubmitted(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === t.id
                      ? 'bg-white text-black shadow-md'
                      : 'bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <Icon size={14} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          {submitted ? (
            <div className="py-12 text-center max-w-md mx-auto space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">Transmission Received</h3>
              <p className="text-sm text-zinc-400 font-body">
                Thank you for reaching out. A Velcora solutions engineer will review your request and reply within 4 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-white hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5 font-mono">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Elena Rostova"
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-body"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5 font-mono">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@company.com"
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-body"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 font-mono">Company / Project / Team</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Technologies Inc."
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-body"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 font-mono">
                  {activeTab === 'demo' ? 'Tell us about your conversation volume & support stack' :
                   activeTab === 'pitch' ? 'Describe your idea, tool suggestion, or integration pitch' :
                   activeTab === 'careers' ? 'Tell us about your background, GitHub/portfolio, or dream role' :
                   'How can we help?'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    activeTab === 'demo' ? 'We handle 30k monthly Zendesk tickets and want to pilot automated vector RAG...' :
                    activeTab === 'pitch' ? 'I have an idea for an automated linear webhook sync...' :
                    activeTab === 'careers' ? 'Distributed systems engineer with 5 years in Rust/Go and LLM infrastructure...' :
                    'Just wanted to connect and discuss your architecture...'
                  }
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-body"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">
                  Protected by 256-bit TLS encryption.
                </span>
                <button
                  type="submit"
                  className="px-8 py-3 bg-white text-black font-semibold text-xs sm:text-sm rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Transmit Request</span>
                  <Send size={14} />
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
