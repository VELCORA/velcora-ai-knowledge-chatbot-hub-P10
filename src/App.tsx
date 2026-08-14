/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductOverview } from './components/ProductOverview';
import { AiPlaygroundSection } from './components/AiPlaygroundSection';
import { KnowledgeSection } from './components/KnowledgeSection';
import { ConversationHubSection } from './components/ConversationHubSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { RoiCalculatorSection } from './components/RoiCalculatorSection';
import { SecuritySection } from './components/SecuritySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ChatbotModal } from './components/ChatbotModal';
import { KnowledgeBaseModal } from './components/KnowledgeBaseModal';
import { ConversationHubModal } from './components/ConversationHubModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { ContactModal } from './components/ContactModal';
import { Toast } from './components/Toast';
import { MascotIcon } from './components/MascotIcon';
import { ActiveModalType } from './types';

export default function App() {
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyEmail = useCallback((email: string) => {
    setToastMessage(`Copied ${email} to clipboard!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  const handleOpenModal = useCallback((modal: ActiveModalType) => {
    setActiveModal(modal);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const handleScrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const navHeight = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  // Global ESC key listener for instantaneous modal closing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-body bg-[#0a0c10] text-black select-none selection:bg-black selection:text-white">
      {/* High-Performance 60/120 FPS Background Scrub Video */}
      <BackgroundVideo />

      {/* Fixed Navigation Bar */}
      <Navbar
        onOpenModal={handleOpenModal}
        onScrollTo={handleScrollToSection}
      />

      {/* 1. Full-Screen Interactive Hero */}
      <main className="relative z-10 w-full">
        <Hero
          onOpenModal={handleOpenModal}
          onCopyEmail={handleCopyEmail}
          onScrollTo={handleScrollToSection}
        />
      </main>

      {/* 2. Product Overview Section */}
      <ProductOverview
        onScrollTo={handleScrollToSection}
        onOpenModal={handleOpenModal}
      />

      {/* 3. Live Interactive AI Studio Section */}
      <AiPlaygroundSection />

      {/* 4. Vector Knowledge Base & Ingestion Section */}
      <KnowledgeSection />

      {/* 5. Omnichannel Conversation Hub Section */}
      <ConversationHubSection />

      {/* 6. Platform Architecture & 4-Tier Pipeline Section */}
      <ArchitectureSection />

      {/* 7. Interactive ROI & Cost Deflection Calculator */}
      <RoiCalculatorSection
        onOpenContact={() => setActiveModal('contact')}
      />

      {/* 8. Security & Zero-Retention Compliance Matrix */}
      <SecuritySection />

      {/* 9. Multi-Intent Contact & Careers Gateway */}
      <ContactSection
        onCopyEmail={handleCopyEmail}
      />

      {/* 11. Platform Footer */}
      <Footer
        onScrollTo={handleScrollToSection}
        onOpenModal={handleOpenModal}
        onCopyEmail={handleCopyEmail}
      />

      {/* Floating 3D Mascot AI Agent Assistant Launcher (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-20 hidden sm:flex items-center gap-2">
        <button
          onClick={() => handleOpenModal('chatbot')}
          className="group flex items-center gap-2.5 bg-white/95 hover:bg-white text-black pl-2 pr-4 py-2 rounded-full shadow-2xl border border-black/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer font-body text-xs font-medium"
        >
          <MascotIcon size={26} />
          <span className="flex items-center gap-1.5">
            <span>Talk to Velcora AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </span>
        </button>
      </div>

      {/* Dedicated Workspace Modals */}
      <ChatbotModal
        isOpen={activeModal === 'chatbot'}
        onClose={handleCloseModal}
      />

      <KnowledgeBaseModal
        isOpen={activeModal === 'knowledge'}
        onClose={handleCloseModal}
      />

      <ConversationHubModal
        isOpen={activeModal === 'conversations'}
        onClose={handleCloseModal}
      />

      <ArchitectureModal
        isOpen={activeModal === 'architecture'}
        onClose={handleCloseModal}
        onOpenContact={() => setActiveModal('contact')}
        onOpenChatbot={() => setActiveModal('chatbot')}
      />

      <ContactModal
        isOpen={activeModal === 'contact'}
        onClose={handleCloseModal}
        onCopyEmail={handleCopyEmail}
      />

      {/* Toast Notification Container */}
      <Toast message={toastMessage} />
    </div>
  );
}
