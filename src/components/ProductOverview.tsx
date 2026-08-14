import React from 'react';
import { Bot, Database, MessageSquare, Zap, Shield, ArrowDown, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { MascotIcon } from './MascotIcon';

interface ProductOverviewProps {
  onScrollTo: (id: string) => void;
  onOpenModal: (type: any) => void;
}

export const ProductOverview: React.FC<ProductOverviewProps> = ({ onScrollTo, onOpenModal }) => {
  return (
    <section id="overview" className="relative z-10 w-full py-20 px-5 sm:px-8 md:px-12 bg-white text-black border-t border-zinc-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-100">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-700 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Autonomous Support & RAG Infrastructure
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-black leading-[1.15]">
              What is Velcora AI?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 font-body leading-relaxed">
              Velcora AI is an enterprise-grade autonomous intelligence platform that transforms fragmented company documentation, internal APIs, and knowledge silos into a real-time conversational agent capable of resolving customer requests with human-level nuance and sub-240ms speed.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onScrollTo('ai-studio')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs sm:text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Try Live AI Studio</span>
            </button>
            <button
              onClick={() => onScrollTo('calculator')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-black text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-zinc-200"
            >
              <span>Calculate ROI</span>
            </button>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          
          <div 
            onClick={() => onScrollTo('ai-studio')}
            className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-black hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Bot size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-black mb-2">Autonomous AI Agents</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-body">
                Context-aware multimodal LLM orchestration powered by Gemini 3.7 with dynamic confidence thresholding and instant smart responses.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center justify-between text-xs font-semibold text-black">
              <span>Explore Live Studio</span>
              <span className="font-mono">→</span>
            </div>
          </div>

          <div 
            onClick={() => onScrollTo('knowledge-engine')}
            className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-black hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Database size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-black mb-2">Vector Graph RAG</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-body">
                Continuous documentation ingestion across Notion, Confluence, GitHub & Zendesk with sub-18ms semantic vector search.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center justify-between text-xs font-semibold text-black">
              <span>View Vector Hub</span>
              <span className="font-mono">→</span>
            </div>
          </div>

          <div 
            onClick={() => onScrollTo('conversations-hub')}
            className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-black hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <MessageSquare size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-black mb-2">Omnichannel Dispatch</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-body">
                Unified live inbox across Slack, WhatsApp, Email & Webchat with automated sentiment classification and human escalation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center justify-between text-xs font-semibold text-black">
              <span>Open Live Inbox</span>
              <span className="font-mono">→</span>
            </div>
          </div>

          <div 
            onClick={() => onScrollTo('architecture')}
            className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-black hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Shield size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-black mb-2">Zero-Retention Security</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-body">
                SOC2 Type II, GDPR, and HIPAA compliant VPC inference. Cryptographic nonces ensure customer payloads are never retained.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center justify-between text-xs font-semibold text-black">
              <span>View Architecture</span>
              <span className="font-mono">→</span>
            </div>
          </div>

        </div>

        {/* Live Platform Health Bar */}
        <div className="mt-10 p-5 rounded-2xl bg-zinc-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs sm:text-sm font-medium">Production Inference Health: <strong className="text-emerald-400">99.99% Online</strong></span>
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-400 font-mono">
            <span>Avg Response: <strong className="text-white">240ms</strong></span>
            <span>Vector Nodes: <strong className="text-white">1.8M+</strong></span>
            <span>Deflection: <strong className="text-white">84.6%</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
};
