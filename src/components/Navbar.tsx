import React, { useState } from 'react';
import { MascotIcon } from './MascotIcon';
import { ActiveModalType } from '../types';

interface NavbarProps {
  onOpenModal: (type: ActiveModalType) => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal, onScrollTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleNavClick = (sectionId: string, modalType?: ActiveModalType) => {
    onScrollTo(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-30 w-full px-5 sm:px-8 py-3.5 sm:py-4 flex justify-between items-center bg-white/75 backdrop-blur-md border-b border-black/5 transition-all">
        {/* Logo (Left) */}
        <div
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none"
        >
          <span
            className="text-[20px] sm:text-[24px] tracking-tight text-black font-heading transition-opacity group-hover:opacity-75"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Velcora AI®
          </span>
          <span
            className="text-[22px] sm:text-[26px] text-black select-none leading-none -tracking-[0.02em] transition-transform duration-300 group-hover:rotate-45"
          >
            ✳︎
          </span>
          <div className="hidden sm:inline-flex ml-1">
            <MascotIcon size={26} />
          </div>
        </div>

        {/* Desktop Nav Links (Center, hidden below md) */}
        <div className="hidden md:flex items-center text-[18px] lg:text-[21px] text-black font-body">
          <button
            onClick={() => handleNavClick('knowledge-engine', 'knowledge')}
            className="cursor-pointer hover:opacity-60 transition-opacity bg-transparent border-none p-0 text-inherit focus:outline-none"
          >
            Knowledge Base
          </button>
          <span className="select-none mx-1.5 text-zinc-400">, </span>
          <button
            onClick={() => handleNavClick('ai-studio', 'chatbot')}
            className="cursor-pointer hover:opacity-60 transition-opacity bg-transparent border-none p-0 text-inherit focus:outline-none"
          >
            AI Agent
          </button>
          <span className="select-none mx-1.5 text-zinc-400">, </span>
          <button
            onClick={() => handleNavClick('conversations-hub', 'conversations')}
            className="cursor-pointer hover:opacity-60 transition-opacity bg-transparent border-none p-0 text-inherit focus:outline-none"
          >
            Conversations
          </button>
          <span className="select-none mx-1.5 text-zinc-400">, </span>
          <button
            onClick={() => handleNavClick('architecture', 'architecture')}
            className="cursor-pointer hover:opacity-60 transition-opacity bg-transparent border-none p-0 text-inherit focus:outline-none"
          >
            Platform
          </button>
          <span className="select-none mx-1.5 text-zinc-400">, </span>
          <button
            onClick={() => handleNavClick('calculator')}
            className="cursor-pointer hover:opacity-60 transition-opacity bg-transparent border-none p-0 text-inherit focus:outline-none"
          >
            ROI
          </button>
          <span className="select-none mx-1.5 text-zinc-400">, </span>
          <button
            onClick={() => handleNavClick('pricing')}
            className="cursor-pointer hover:opacity-60 transition-opacity bg-transparent border-none p-0 text-inherit focus:outline-none"
          >
            Pricing
          </button>
        </div>

        {/* Desktop CTA (Right, hidden below md) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onOpenModal('chatbot')}
            className="text-xs font-semibold px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-black transition-colors cursor-pointer border border-black/10"
          >
            Quick Chat
          </button>
          <button
            onClick={() => handleNavClick('contact', 'contact')}
            className="text-[18px] lg:text-[21px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity bg-transparent border-none p-0 cursor-pointer font-body focus:outline-none"
          >
            Get in touch
          </button>
        </div>

        {/* Mobile Hamburger (Visible below md) */}
        <button
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden relative z-20 flex flex-col justify-center items-center w-8 h-8 p-1 focus:outline-none cursor-pointer"
        >
          <div className="flex flex-col gap-[5px] w-6">
            <span
              className={`w-6 h-[2px] bg-black block transition-all duration-300 transform origin-center ${
                mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-black block transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-black block transition-all duration-300 transform origin-center ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 z-[25] bg-white/98 backdrop-blur-xl md:hidden flex flex-col justify-center items-start px-8 gap-6 transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <MascotIcon size={38} />
          <span className="text-[26px] font-heading font-bold">Velcora AI®</span>
        </div>

        <button
          onClick={() => handleNavClick('ai-studio')}
          className="text-[26px] font-medium text-black text-left hover:opacity-60 transition-opacity bg-transparent border-none p-0"
        >
          Live AI Studio
        </button>
        <button
          onClick={() => handleNavClick('knowledge-engine')}
          className="text-[26px] font-medium text-black text-left hover:opacity-60 transition-opacity bg-transparent border-none p-0"
        >
          Knowledge Base
        </button>
        <button
          onClick={() => handleNavClick('conversations-hub')}
          className="text-[26px] font-medium text-black text-left hover:opacity-60 transition-opacity bg-transparent border-none p-0"
        >
          Conversations
        </button>
        <button
          onClick={() => handleNavClick('architecture')}
          className="text-[26px] font-medium text-black text-left hover:opacity-60 transition-opacity bg-transparent border-none p-0"
        >
          Platform Architecture
        </button>
        <button
          onClick={() => handleNavClick('calculator')}
          className="text-[26px] font-medium text-black text-left hover:opacity-60 transition-opacity bg-transparent border-none p-0"
        >
          ROI Calculator
        </button>
        <button
          onClick={() => handleNavClick('pricing')}
          className="text-[26px] font-medium text-black text-left hover:opacity-60 transition-opacity bg-transparent border-none p-0"
        >
          Pricing Plans
        </button>
        <button
          onClick={() => handleNavClick('contact')}
          className="text-[26px] font-medium text-black text-left underline underline-offset-4 hover:opacity-60 transition-opacity bg-transparent border-none p-0"
        >
          Get in touch
        </button>
      </div>
    </>
  );
};
