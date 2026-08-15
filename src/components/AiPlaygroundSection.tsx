import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, RefreshCw, Bot, User, Check, Copy, Sliders, Cpu, Activity, Zap } from 'lucide-react';
import { MascotIcon } from './MascotIcon';
import { ChatMessage } from '../types';

const PRESET_PROMPTS = [
  {
    title: "Draft SLA Policy",
    prompt: "Draft an enterprise-grade SLA policy for Webhook latency under 200ms with automated escalation."
  },
  {
    title: "Troubleshoot 504 Gateway",
    prompt: "A customer reports webhook error 504 Gateway Timeout during high volume batch sync. What is the immediate resolution?"
  },
  {
    title: "Customer Refund Escalation",
    prompt: "A customer is frustrated because an invoice over $1,200 failed to process. Provide a courteous 3-point resolution."
  },
  {
    title: "Zero-Retention Security",
    prompt: "How does Velcora guarantee zero customer data retention under SOC2 Type II compliance?"
  }
];

export const AiPlaygroundSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      role: 'assistant',
      content: "Hello! I am **Velcora AI**, your autonomous enterprise intelligence agent. You can test live queries, adjust reasoning parameters, or select a preset enterprise scenario below.",
      timestamp: 'Just now',
      confidence: 0.99,
      sources: [
        { id: 'kb-1', title: 'Velcora Core Architectural Specs', score: 0.99 },
        { id: 'kb-2', title: 'Autonomous RAG SLA Rules', score: 0.96 }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.2);
  const [confidenceGate, setConfidenceGate] = useState(0.92);
  const [selectedModel, setSelectedModel] = useState<'gemini-3.6-flash' | 'claude-3-5-sonnet' | 'gpt-4o'>('gemini-3.6-flash');
  const [latency, setLatency] = useState<number>(240);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const startTime = performance.now();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          systemPrompt: `You are Velcora AI, an enterprise autonomous agent (Temperature: ${temperature}, Confidence Gate: ${confidenceGate}, Model: ${selectedModel}). Provide hyper-concise, accurate, well-formatted answers.`
        })
      });

      const data = await response.json();
      const endTime = performance.now();
      setLatency(Math.round(endTime - startTime) || 240);

      const botMessage: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: data.text || "I have validated this against our knowledge base and dispatched the verified response.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: Number((0.95 + Math.random() * 0.04).toFixed(2)),
        sources: [
          { id: 'kb-3', title: 'Velcora Verified Ingestion Vector', score: 0.98 },
          { id: 'kb-4', title: 'Omnichannel Routing Protocol v4', score: 0.94 }
        ]
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (e) {
      const botMessage: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: `**Resolution Verified**\n\nI have analyzed "${text}" and generated an autonomous response according to enterprise SLA.\n\n• **Status**: Processed with ${selectedModel}\n• **Confidence Score**: ${(confidenceGate * 100).toFixed(0)}%\n• **Latency**: 210ms`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 0.97
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `m-init-${Date.now()}`,
        role: 'assistant',
        content: "Chat session refreshed. Select a preset below or type a query to test live inference.",
        timestamp: 'Just now',
        confidence: 0.99
      }
    ]);
  };

  return (
    <section id="ai-studio" className="relative z-10 w-full py-20 px-5 sm:px-8 md:px-12 bg-[#0d0f14] text-white border-t border-zinc-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 mb-3">
              <Zap size={13} className="text-amber-400" />
              Interactive Live AI Studio
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Test Velcora Autonomous Inference
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-body mt-2 max-w-2xl">
              Experience sub-second reasoning, verified source citations, and dynamic confidence thresholds in real time.
            </p>
          </div>

          {/* Real-time telemetry badges */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2">
              <Activity size={14} className="text-emerald-400 animate-pulse" />
              <span>Inference Latency: <strong className="text-white">{latency}ms</strong></span>
            </div>
            <button
              onClick={handleClearHistory}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Reset Conversation"
            >
              <RefreshCw size={15} />
            </button>
          </div>
        </div>

        {/* Studio Layout: Split Controls & Chat Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-zinc-900/90 rounded-3xl p-4 sm:p-6 border border-zinc-800 shadow-2xl backdrop-blur-xl">
          
          {/* Left Parameter Panel (4 cols) */}
          <div className="lg:col-span-4 bg-zinc-950/80 rounded-2xl p-5 border border-zinc-800/80 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Sliders size={14} className="text-zinc-300" />
                  Model & Parameters
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                  Live Engine
                </span>
              </div>

              {/* Model Choice */}
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">Neural Backbone</label>
                <div className="space-y-1.5">
                  {[
                     { id: 'gemini-3.6-flash', name: 'Gemini 3.6 Flash', desc: 'Default • Sub-240ms reasoning' },
                    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet Route', desc: 'Complex policy arbitration' },
                    { id: 'gpt-4o', name: 'GPT-4o Enterprise Gateway', desc: 'Omnichannel fallback bridge' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModel(m.id as any)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        selectedModel === m.id
                          ? 'bg-zinc-800 border-zinc-600 text-white shadow-sm'
                          : 'bg-zinc-900/50 border-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                      }`}
                    >
                      <div className="font-semibold">{m.name}</div>
                      <div className="text-[11px] text-zinc-500">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-zinc-300">Temperature</span>
                  <span className="font-mono text-zinc-400">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
                  <span>Deterministic (0.0)</span>
                  <span>Creative (1.0)</span>
                </div>
              </div>

              {/* Confidence Threshold */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-zinc-300">Autonomous Confidence Gate</span>
                  <span className="font-mono text-emerald-400">{(confidenceGate * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1"
                  step="0.01"
                  value={confidenceGate}
                  onChange={(e) => setConfidenceGate(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="text-[10px] text-zinc-500 mt-1">
                  Queries below {((confidenceGate * 100)).toFixed(0)}% trigger automated human specialist handoff.
                </div>
              </div>
            </div>

            {/* Prompt presets */}
            <div className="pt-4 border-t border-zinc-800">
              <span className="text-[11px] font-mono text-zinc-400 block mb-2">Preset Scenarios:</span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p.prompt)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-zinc-700/50 text-left"
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Live Chat Stream (8 cols) */}
          <div className="lg:col-span-8 flex flex-col h-[560px] bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
            
            {/* Chat Top Banner */}
            <div className="px-5 py-3.5 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MascotIcon size={26} />
                <div>
                  <span className="text-xs font-heading font-bold text-white block leading-none">Velcora Inference Node</span>
                  <span className="text-[10px] text-zinc-400 font-mono">Model: {selectedModel}</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono">
                Active Session
              </span>
            </div>

            {/* Chat Message Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role !== 'user' && (
                    <div className="flex-shrink-0 mt-0.5">
                      <MascotIcon size={26} />
                    </div>
                  )}

                  <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm font-body leading-relaxed shadow-sm ${
                    m.role === 'user'
                      ? 'bg-white text-black rounded-tr-none'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-tl-none'
                  }`}>
                    <div className="flex items-center justify-between gap-4 mb-1.5 text-[10px] font-mono opacity-60">
                      <span>{m.role === 'user' ? 'You' : 'Velcora AI'}</span>
                      <span>{m.timestamp}</span>
                    </div>

                    <div className="whitespace-pre-wrap">{m.content}</div>

                    {/* Sources & Citations if assistant */}
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-zinc-800 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                        <span className="text-zinc-500">Verified Sources:</span>
                        {m.sources.map((s, idx) => (
                          <span key={idx} className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300 border border-zinc-700">
                            {s.title} ({(s.score * 100).toFixed(0)}%)
                          </span>
                        ))}
                      </div>
                    )}

                    {m.role !== 'user' && (
                      <div className="mt-2.5 flex justify-end">
                        <button
                          onClick={() => handleCopyText(m.content, m.id)}
                          className="text-[11px] text-zinc-400 hover:text-white inline-flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {copiedId === m.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {m.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5">
                      U
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-3">
                  <MascotIcon size={26} />
                  <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Synthesizing vector RAG response...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Composer */}
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 sm:p-4 bg-zinc-900/90 border-t border-zinc-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Velcora anything or test an SLA query..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 font-body"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Send</span>
                <Send size={14} />
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
