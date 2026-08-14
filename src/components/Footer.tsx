import React from 'react';
import { MascotIcon } from './MascotIcon';
import { ArrowUp, Check, Copy } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onOpenModal: (type: any) => void;
  onCopyEmail: (email: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onOpenModal, onCopyEmail }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 w-full py-16 px-5 sm:px-8 md:px-12 bg-black text-white border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-800/80">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <MascotIcon size={32} />
              <span className="text-2xl font-heading font-bold text-white tracking-tight">Velcora AI®</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-body max-w-sm leading-relaxed">
              Autonomous Omnichannel Customer Intelligence & Vector RAG Platform. Delivering sub-240ms resolution with 84%+ automated deflection.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Systems Operational (99.99% SLA)</span>
              </div>
            </div>
          </div>

          {/* Navigation Links (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-body">
            
            <div className="space-y-3">
              <span className="font-mono text-zinc-400 uppercase tracking-wider text-[11px] block">Product Suite</span>
              <ul className="space-y-2 text-zinc-300">
                <li>
                  <button onClick={() => onScrollTo('ai-studio')} className="hover:text-white transition-colors cursor-pointer">
                    Live AI Studio
                  </button>
                </li>
                <li>
                  <button onClick={() => onScrollTo('knowledge-engine')} className="hover:text-white transition-colors cursor-pointer">
                    Vector Knowledge Hub
                  </button>
                </li>
                <li>
                  <button onClick={() => onScrollTo('conversations-hub')} className="hover:text-white transition-colors cursor-pointer">
                    Conversation Center
                  </button>
                </li>
                <li>
                  <button onClick={() => onScrollTo('architecture')} className="hover:text-white transition-colors cursor-pointer">
                    Neural Pipeline (SLA)
                  </button>
                </li>
                <li>
                  <button onClick={() => onScrollTo('calculator')} className="hover:text-white transition-colors cursor-pointer">
                    ROI Calculator
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-zinc-400 uppercase tracking-wider text-[11px] block">Security & Trust</span>
              <ul className="space-y-2 text-zinc-300">
                <li>
                  <button onClick={() => onScrollTo('security')} className="hover:text-white transition-colors cursor-pointer">
                    SOC2 Type II Certified
                  </button>
                </li>
                <li>
                  <button onClick={() => onScrollTo('security')} className="hover:text-white transition-colors cursor-pointer">
                    Zero-Retention Mode
                  </button>
                </li>
                <li>
                  <button onClick={() => onScrollTo('security')} className="hover:text-white transition-colors cursor-pointer">
                    HIPAA Compliance
                  </button>
                </li>
                <li>
                  <button onClick={() => onScrollTo('pricing')} className="hover:text-white transition-colors cursor-pointer">
                    Enterprise Plans
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-zinc-400 uppercase tracking-wider text-[11px] block">Direct Contact</span>
              <ul className="space-y-2 text-zinc-300">
                <li>
                  <button onClick={() => onCopyEmail('hello@velcora.ai')} className="hover:text-white transition-colors cursor-pointer">
                    hello@velcora.ai
                  </button>
                </li>
                <li>
                  <button onClick={() => onCopyEmail('careers@velcora.ai')} className="hover:text-white transition-colors cursor-pointer">
                    careers@velcora.ai
                  </button>
                </li>
                <li>
                  <button onClick={() => onScrollTo('contact')} className="hover:text-white transition-colors cursor-pointer">
                    Pitch Us an Idea
                  </button>
                </li>
                <li>
                  <button onClick={() => onScrollTo('contact')} className="hover:text-white transition-colors cursor-pointer">
                    Schedule Technical POC
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} Velcora AI, Inc. All rights reserved. Registered trademark.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  );
};
