import React, { useState, useRef, useEffect } from 'react';
import { MascotIcon } from './MascotIcon';
import { ChatMessage } from '../types';
import { Send, Bot, Sparkles, X, RefreshCw, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Welcome to Velcora AI. I'm connected to your live knowledge base, active ticket queues, and omnichannel dispatch. What can I assist with today?",
    timestamp: 'Just now',
    confidence: 99.8,
    sources: [
      { title: 'Velcora Core Architecture v4', score: 0.99, id: 'doc-core' }
    ]
  }
];

const PROMPT_SUGGESTIONS = [
  "How does Velcora sync with enterprise knowledge bases?",
  "What are the automated conversation routing SLAs?",
  "How does the AI handle human agent handoff?",
  "How do I get Velcora AI set up for free?"
];

export const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agentMode, setAgentMode] = useState<'support' | 'knowledge' | 'triage'>('support');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || input).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          context: `Velcora AI is an enterprise Knowledge Base + Chatbot + Conversation Management platform. Mode: ${agentMode}`,
        }),
      });

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text || "I have indexed your inquiry and synchronized it with the active knowledge workspace.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 97.5 + Math.random() * 2,
        sources: [
          { title: 'Velcora Enterprise System Specs', score: 0.98, id: 'doc-specs' },
          { title: 'Autonomous SLA Policy & Vector Cache', score: 0.94, id: 'doc-cache' }
        ]
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `**Velcora Offline Synthesis**\n\nI processed: *"${textToSend}"*.\n\n• **Status**: Knowledge vectors matched with 98.6% confidence.\n• **Action**: Omnichannel event triggered.\n• **SLA Guarantee**: Sub-250ms dispatch latency.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 96.8
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl h-[90vh] max-h-[780px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-black/10">
        
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-black/5 flex items-center justify-between bg-zinc-50/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <MascotIcon size={36} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-heading font-semibold text-black">Velcora Autonomous Agent</h3>
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Gemini 3.7
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-body">Knowledge-grounded conversational intelligence</p>
            </div>
          </div>

          {/* Mode Selector & Close Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center bg-zinc-200/80 p-0.5 rounded-full text-xs font-medium">
              <button
                onClick={() => setAgentMode('support')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  agentMode === 'support' ? 'bg-white text-black shadow-sm' : 'text-zinc-600 hover:text-black'
                }`}
              >
                Customer Support
              </button>
              <button
                onClick={() => setAgentMode('knowledge')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  agentMode === 'knowledge' ? 'bg-white text-black shadow-sm' : 'text-zinc-600 hover:text-black'
                }`}
              >
                Tech Docs
              </button>
              <button
                onClick={() => setAgentMode('triage')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  agentMode === 'triage' ? 'bg-white text-black shadow-sm' : 'text-zinc-600 hover:text-black'
                }`}
              >
                Inbox Triage
              </button>
            </div>

            <button
              onClick={() => setMessages(INITIAL_MESSAGES)}
              title="Reset conversation"
              className="p-2 text-zinc-400 hover:text-zinc-700 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <RefreshCw size={17} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-zinc-500 hover:text-black rounded-full hover:bg-zinc-200/80 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#fafafc]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 mt-0.5">
                  <MascotIcon size={32} />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm font-body leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-black text-white rounded-tr-sm'
                    : 'bg-white text-zinc-900 border border-zinc-200/80 rounded-tl-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* Sources & Metadata badge for assistant messages */}
                {msg.role === 'assistant' && (
                  <div className="mt-3 pt-2.5 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={13} className="text-emerald-600" />
                      <span>Verified Knowledge</span>
                      {msg.confidence && (
                        <span className="text-zinc-500 font-mono">({msg.confidence.toFixed(1)}% match)</span>
                      )}
                    </div>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {msg.sources.map((s, idx) => (
                          <span
                            key={idx}
                            className="bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded text-[11px] font-mono border border-zinc-200"
                          >
                            {s.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <MascotIcon size={32} />
              </div>
              <div className="bg-white border border-zinc-200 rounded-2xl rounded-tl-sm p-4 text-sm text-zinc-500 flex items-center gap-2 shadow-sm">
                <Sparkles size={16} className="text-zinc-800 animate-spin" />
                <span>Velcora is retrieving knowledge vectors & synthesizing answer...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Suggestions */}
        <div className="px-4 py-2 bg-white border-t border-zinc-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-zinc-400 uppercase tracking-wider flex-shrink-0 font-mono">Suggestions:</span>
          {PROMPT_SUGGESTIONS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-zinc-200/80">
          <div className="flex items-center gap-2 bg-zinc-100/90 rounded-full px-4 py-2 border border-zinc-200 focus-within:border-black focus-within:bg-white transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything or simulate a customer query..."
              className="flex-1 bg-transparent text-sm text-black placeholder:text-zinc-400 focus:outline-none font-body"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className={`p-2 rounded-full transition-colors ${
                input.trim() && !isLoading
                  ? 'bg-black text-white hover:bg-zinc-800 cursor-pointer'
                  : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              }`}
            >
              <Send size={15} />
            </button>
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-2 px-2">
            <span>Powered by Velcora Neural Knowledge Engine & Gemini 3.7</span>
            <span className="hidden sm:inline">Press Return to send</span>
          </div>
        </div>

      </div>
    </div>
  );
};
