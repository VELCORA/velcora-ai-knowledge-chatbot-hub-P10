import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { ActiveModalType } from '../types';
import { ArrowDown, Sparkles, Database, MessageSquare, Shield, DollarSign } from 'lucide-react';

interface HeroProps {
  onOpenModal: (type: ActiveModalType) => void;
  onCopyEmail: (email: string) => void;
  onScrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal, onCopyEmail, onScrollTo }) => {
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Typewriter hook with specified parameters
  const { displayed, done } = useTypewriter({
    text: "Glad you stopped in. Good taste tends to find us. Now, what are we building?",
    speed: 38,
    startDelay: 600,
  });

  // Action pills appear 400ms after page load, independent of typewriter
  useEffect(() => {
    const timer = setTimeout(() => {
      setPillsVisible(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const email = "hello@velcora.ai";
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      onCopyEmail(email);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      onCopyEmail(email);
    });
  };

  return (
    <section className="relative z-[1] w-full min-h-screen flex flex-col justify-between pt-24 pb-8 sm:pb-12 px-5 sm:px-8 md:px-12 overflow-hidden pointer-events-none">
      
      {/* Spacer for Top */}
      <div className="h-4 sm:h-12" />

      {/* Hero Center Text & Actions */}
      <div className="max-w-xl relative z-10 pointer-events-auto my-auto">
        {/* 1. Blurred Intro Label */}
        <div
          className="pointer-events-none select-none mb-4 sm:mb-5 text-black"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#000',
            filter: 'blur(4px)',
          }}
        >
          Hey there, meet Velcora,<br />
          Velcora's Adaptive Knowledge & Response Agent
        </div>

        {/* 2. Typewriter Text */}
        <p
          className="text-black mb-5 sm:mb-6 font-normal min-h-[54px]"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            color: '#000',
          }}
        >
          {displayed}
          {!done && (
            <span
              className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-cursor-blink"
            />
          )}
        </p>

        {/* 3. Action Pill Buttons */}
        <div
          className={`flex flex-wrap gap-y-1 transition-all duration-400 ease-out ${
            pillsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2'
          }`}
          style={{
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {/* White Pill Button 1: AI Chatbot */}
          <button
            onClick={() => onOpenModal('chatbot')}
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer select-none font-body shadow-sm"
          >
            Launch AI Chatbot
          </button>

          {/* White Pill Button 2: Knowledge Base */}
          <button
            onClick={() => onOpenModal('knowledge')}
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer select-none font-body shadow-sm"
          >
            Explore Knowledge Base
          </button>

          {/* White Pill Button 3: Conversations */}
          <button
            onClick={() => onOpenModal('conversations')}
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer select-none font-body shadow-sm"
          >
            Manage Conversations
          </button>

          {/* White Pill Button 4: Platform */}
          <button
            onClick={() => onOpenModal('architecture')}
            className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer select-none font-body shadow-sm"
          >
            See how we operate
          </button>

          {/* 1 Outline Pill Button: Reach us: hello@velcora.ai */}
          <button
            onClick={handleCopyClick}
            title="Click to copy email address"
            className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer select-none font-body shadow-sm"
          >
            <span>
              {copied ? "Copied to clipboard!" : (
                <>
                  Reach us: <span className="underline underline-offset-1">hello@velcora.ai</span>
                </>
              )}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block flex-shrink-0"
            >
              <rect
                x="3.5"
                y="1"
                width="7"
                height="7.5"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              <path
                d="M8.5 4.5V9.5C8.5 10.0523 8.05228 10.5 7.5 10.5H2.5C1.94772 10.5 1.5 10.0523 1.5 9.5V4.5C1.5 3.94772 1.94772 3.5 2.5 3.5H3.5"
                stroke="currentColor"
                strokeWidth="1.1"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Scroll Prompt Bar */}
      <div className="w-full flex items-center justify-between pointer-events-auto pt-6 border-t border-black/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onScrollTo('overview')}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-black hover:opacity-75 transition-opacity cursor-pointer bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/10 shadow-xs"
          >
            <span>Explore Platform Deep Dive</span>
            <ArrowDown size={14} className="animate-bounce" />
          </button>
        </div>

        {/* Quick jump pills */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-black">
          <button onClick={() => onScrollTo('ai-studio')} className="hover:underline cursor-pointer">Live Studio</button>
          <span>•</span>
          <button onClick={() => onScrollTo('knowledge-engine')} className="hover:underline cursor-pointer">Vector Hub</button>
          <span>•</span>
          <button onClick={() => onScrollTo('conversations-hub')} className="hover:underline cursor-pointer">Conversations</button>
          <span>•</span>
          <button onClick={() => onScrollTo('calculator')} className="hover:underline cursor-pointer">ROI Model</button>
          <span>•</span>
          <button onClick={() => onScrollTo('contact')} className="hover:underline cursor-pointer">Get in touch</button>
        </div>
      </div>

    </section>
  );
};
