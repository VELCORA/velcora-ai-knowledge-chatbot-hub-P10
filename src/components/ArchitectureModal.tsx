import React from 'react';
import { X, CheckCircle2, Shield, Cpu, Zap, Database, Network, ArrowRight } from 'lucide-react';
import { MascotIcon } from './MascotIcon';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
  onOpenChatbot: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
  onOpenChatbot,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl h-[90vh] max-h-[820px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-black/10">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/90">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black text-white rounded-xl">
              <Network size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-heading font-semibold text-black">How Velcora AI Operates</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-200 text-zinc-800 font-mono font-medium">
                  Architecture v4.8
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-body">4-tier neural pipeline & enterprise deployment guarantees</p>
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
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-[#fafafc]">
          
          {/* 4-Tier Pipeline Visualization */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider text-zinc-400 mb-4">Neural Architecture Pipeline</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm relative group hover:border-black transition-colors">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-black mb-3">
                  <Database size={18} />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Layer 01</span>
                <h5 className="text-sm font-bold text-black font-heading mt-0.5">Continuous Ingestion</h5>
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                  Real-time webhook sync across Notion, Confluence, Zendesk & Git repositories with auto-chunking.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm relative group hover:border-black transition-colors">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-black mb-3">
                  <Cpu size={18} />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Layer 02</span>
                <h5 className="text-sm font-bold text-black font-heading mt-0.5">Vector Graph RAG</h5>
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                  Sub-18ms semantic vector search querying 512-dim embedding matrices with relevance re-ranking.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm relative group hover:border-black transition-colors">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-black mb-3">
                  <Zap size={18} />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Layer 03</span>
                <h5 className="text-sm font-bold text-black font-heading mt-0.5">LLM Routing Gate</h5>
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                  Multi-agent orchestration with Gemini 3.6 Flash generating grounded citations and tool execution.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm relative group hover:border-black transition-colors">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-black mb-3">
                  <Shield size={18} />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Layer 04</span>
                <h5 className="text-sm font-bold text-black font-heading mt-0.5">Omnichannel Dispatch</h5>
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                  Instant multi-channel reply dispatch with automated human handoff triggers and SLA logging.
                </p>
              </div>

            </div>
          </div>

          {/* Performance & Security Benchmarks */}
          <div className="bg-zinc-900 text-white p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-zinc-400 uppercase">Enterprise Benchmarks</span>
              <h4 className="text-lg font-heading font-bold text-white">99.99% Uptime • Zero Data Retention</h4>
              <p className="text-xs text-zinc-400 max-w-xl">
                Velcora operates dedicated VPC inferences with SOC2 Type II, GDPR, and HIPAA compliance. Customer data is never trained upon.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <button
                onClick={onOpenChatbot}
                className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-full hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Test Live AI Bot
              </button>
              <button
                onClick={onOpenContact}
                className="px-4 py-2 border border-zinc-700 text-white text-xs font-semibold rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Request Enterprise Audit
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h4 className="text-sm font-mono uppercase tracking-wider text-zinc-400 mb-2">Pricing</h4>
            <p className="text-base font-bold text-black font-heading">100% Free</p>
            <p className="text-xs text-zinc-500 mt-2">Velcora AI is completely free to use. Hit <span className="font-semibold text-black">Get in touch</span> and we'll get you live in minutes.</p>
          </div>

        </div>

      </div>
    </div>
  );
};
