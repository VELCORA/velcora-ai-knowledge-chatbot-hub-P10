import React, { useState } from 'react';
import { ConversationTicket } from '../types';
import { MessageSquare, CheckCircle, AlertTriangle, Clock, User, Bot, Send, Sparkles, X, Filter, Zap, ArrowUpRight } from 'lucide-react';
import { MascotIcon } from './MascotIcon';
import { postJson } from '../lib/apiClient';

interface ConversationHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_TICKETS: ConversationTicket[] = [
  {
    id: 'TICK-9021',
    customerName: 'Elena Rostova',
    channel: 'Slack',
    status: 'Open',
    sentiment: 'positive',
    sentimentScore: 0.94,
    lastMessage: 'Can we configure custom confidence thresholds per workspace?',
    timestamp: '2m ago',
    urgency: 'Medium',
    assignedAgent: 'Velcora Bot (Auto)',
    messages: [
      { sender: 'customer', text: 'Hey team! We are onboarding 40 new engineers today.', time: '10:14 AM' },
      { sender: 'customer', text: 'Can we configure custom confidence thresholds per workspace?', time: '10:15 AM' },
      { sender: 'bot', text: 'Hi Elena! Yes, Velcora supports granular workspace confidence scores (0.0 - 1.0) via Settings > Policy Rules or via our REST API endpoint `/v1/workspaces/thresholds`.', time: '10:15 AM' },
    ]
  },
  {
    id: 'TICK-9022',
    customerName: 'Marcus Vance',
    channel: 'Email',
    status: 'Pending AI',
    sentiment: 'frustrated',
    sentimentScore: 0.32,
    lastMessage: 'Webhook delivery failed with error code 504 on our staging cluster.',
    timestamp: '8m ago',
    urgency: 'Critical',
    assignedAgent: 'Escalated to Tier 3',
    messages: [
      { sender: 'customer', text: 'Webhook delivery failed with error code 504 on our staging cluster. We need this resolved immediately.', time: '10:07 AM' },
    ]
  },
  {
    id: 'TICK-9023',
    customerName: 'Sophia Lin',
    channel: 'WhatsApp',
    status: 'Open',
    sentiment: 'neutral',
    sentimentScore: 0.72,
    lastMessage: 'Is SOC2 Type II compliance report available for download?',
    timestamp: '14m ago',
    urgency: 'Low',
    assignedAgent: 'Velcora Bot (Auto)',
    messages: [
      { sender: 'customer', text: 'Hi! Is SOC2 Type II compliance report available for download under NDA?', time: '10:01 AM' },
      { sender: 'bot', text: 'Hello Sophia! Absolutely. You can generate a self-serve NDA download link from Trust Center > Compliance Reports.', time: '10:02 AM' }
    ]
  },
  {
    id: 'TICK-9024',
    customerName: 'David K.',
    channel: 'Web',
    status: 'Resolved',
    sentiment: 'positive',
    sentimentScore: 0.98,
    lastMessage: 'Thanks! The vector re-indexing completed in 400ms.',
    timestamp: '25m ago',
    urgency: 'Low',
    assignedAgent: 'Auto-Resolved',
    messages: [
      { sender: 'customer', text: 'How do I trigger an instant re-sync of my documentation repo?', time: '9:48 AM' },
      { sender: 'bot', text: 'Use the `POST /api/v1/sync` endpoint with your repo ID.', time: '9:49 AM' },
      { sender: 'customer', text: 'Thanks! The vector re-indexing completed in 400ms.', time: '9:50 AM' }
    ]
  }
];

export const ConversationHubModal: React.FC<ConversationHubModalProps> = ({ isOpen, onClose }) => {
  const [tickets, setTickets] = useState<ConversationTicket[]>(INITIAL_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<ConversationTicket>(INITIAL_TICKETS[0]);
  const [replyText, setReplyText] = useState('');
  const [filterChannel, setFilterChannel] = useState<string>('All');
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);

  if (!isOpen) return null;

  const filteredTickets = tickets.filter((t) => {
    return filterChannel === 'All' || t.channel === filterChannel;
  });

  const handleSendReply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = {
      sender: 'agent' as const,
      text: replyText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = {
      ...selectedTicket,
      status: 'Open' as const,
      lastMessage: replyText.trim(),
      messages: [...selectedTicket.messages, newMsg],
    };

    setSelectedTicket(updated);
    setTickets(tickets.map((t) => (t.id === updated.id ? updated : t)));
    setReplyText('');
  };

  const handleGenerateSmartReply = async () => {
    setIsGeneratingReply(true);
    try {
      const data = await postJson('/api/chat', {
        messages: [
          {
            role: 'user',
            content: `Generate a polite, hyper-concise professional customer response for this ticket inquiry: "${selectedTicket.lastMessage}" (Urgency: ${selectedTicket.urgency}, Sentiment: ${selectedTicket.sentiment}).`,
          }
        ],
      });
      setReplyText(data.text || "Hello! We have reviewed your request and expedited it through our priority gateway.");
    } catch {
      setReplyText(`Hi ${selectedTicket.customerName.split(' ')[0]}, thank you for reaching out. We have analyzed your ticket (${selectedTicket.id}) and applied the verified resolution from our knowledge repository. Please let us know if you need any additional assistance.`);
    } finally {
      setIsGeneratingReply(false);
    }
  };

  const handleResolveTicket = () => {
    const updated = {
      ...selectedTicket,
      status: 'Resolved' as const,
    };
    setSelectedTicket(updated);
    setTickets(tickets.map((t) => (t.id === updated.id ? updated : t)));
  };

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-6xl h-[90vh] max-h-[820px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-black/10">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/90">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black text-white rounded-xl">
              <MessageSquare size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-heading font-semibold text-black">Velcora Conversation Management</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                  Autonomous Triage Active
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-body">Omnichannel inbox, sentiment classification & automated agent handoff</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-black rounded-full hover:bg-zinc-200/80 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Live Top Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-zinc-200 bg-white divide-x divide-zinc-200 text-xs">
          <div className="p-3 px-4">
            <span className="text-zinc-400 block font-mono text-[10px] uppercase">AI Auto-Deflection</span>
            <span className="text-base font-bold text-black font-heading">84.6%</span>
            <span className="text-[10px] text-emerald-600 ml-1">↑ 3.2% this week</span>
          </div>
          <div className="p-3 px-4">
            <span className="text-zinc-400 block font-mono text-[10px] uppercase">Median Response Time</span>
            <span className="text-base font-bold text-black font-heading">240ms</span>
            <span className="text-[10px] text-zinc-400 ml-1">(SLA: &lt; 500ms)</span>
          </div>
          <div className="p-3 px-4">
            <span className="text-zinc-400 block font-mono text-[10px] uppercase">CSAT Satisfaction</span>
            <span className="text-base font-bold text-black font-heading">4.92 / 5.0</span>
            <span className="text-[10px] text-emerald-600 ml-1">98.8% positive</span>
          </div>
          <div className="p-3 px-4">
            <span className="text-zinc-400 block font-mono text-[10px] uppercase">Active Queue</span>
            <span className="text-base font-bold text-black font-heading">{tickets.length} Live Threads</span>
            <span className="text-[10px] text-zinc-400 ml-1">All channels synced</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Column: Ticket Ingestion Stream */}
          <div className="w-full md:w-80 lg:w-96 border-r border-zinc-200 bg-[#f9fafb] flex flex-col flex-shrink-0">
            
            {/* Channel Filters */}
            <div className="p-3 border-b border-zinc-200 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
              {['All', 'Slack', 'Email', 'WhatsApp', 'Web'].map((ch) => (
                <button
                  key={ch}
                  onClick={() => setFilterChannel(ch)}
                  className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                    filterChannel === ch ? 'bg-black text-white' : 'bg-zinc-200/70 text-zinc-600 hover:text-black'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>

            {/* Ticket Cards */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {filteredTickets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTicket(t)}
                  className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                    selectedTicket.id === t.id
                      ? 'bg-white border-black/20 shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-zinc-200/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-zinc-500 font-medium">{t.channel}</span>
                      <span className="text-zinc-300">•</span>
                      <span className="font-mono text-zinc-400">{t.id}</span>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${
                      t.urgency === 'Critical' ? 'bg-rose-100 text-rose-800' :
                      t.urgency === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {t.urgency}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-semibold text-black font-heading line-clamp-1">
                      {t.customerName}
                    </h4>
                    <span className="text-[10px] text-zinc-400">{t.timestamp}</span>
                  </div>

                  <p className="text-[11px] text-zinc-500 line-clamp-2 font-body">
                    {t.lastMessage}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400 pt-1.5 border-t border-zinc-100">
                    <span>{t.assignedAgent}</span>
                    <span className={`font-medium ${
                      t.status === 'Resolved' ? 'text-emerald-600' :
                      t.status === 'Pending AI' ? 'text-amber-600' : 'text-blue-600'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Ticket Live Inspector */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            
            {/* Ticket Header & Triage Bar */}
            <div className="p-4 sm:p-5 border-b border-zinc-200 bg-zinc-50/50 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-heading font-bold text-black">{selectedTicket.customerName}</h3>
                  <span className="text-xs text-zinc-400 font-mono">({selectedTicket.id})</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                    selectedTicket.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-800' :
                    selectedTicket.sentiment === 'frustrated' ? 'bg-rose-100 text-rose-800' : 'bg-zinc-100 text-zinc-700'
                  }`}>
                    Sentiment: {selectedTicket.sentiment} ({(selectedTicket.sentimentScore * 100).toFixed(0)}%)
                  </span>
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  Channel: <span className="font-semibold text-black">{selectedTicket.channel}</span> • Assigned: {selectedTicket.assignedAgent}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResolveTicket}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-800 font-medium transition-colors cursor-pointer"
                >
                  <CheckCircle size={14} className="text-emerald-600" />
                  <span>Mark Resolved</span>
                </button>
              </div>
            </div>

            {/* Conversation History Stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#fafafc]">
              {selectedTicket.messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${m.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                >
                  {m.sender === 'customer' ? (
                    <div className="w-7 h-7 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-700 flex-shrink-0">
                      {selectedTicket.customerName[0]}
                    </div>
                  ) : (
                    <div className="order-2 flex-shrink-0">
                      <MascotIcon size={28} />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl p-3.5 text-xs font-body leading-relaxed shadow-sm ${
                      m.sender === 'customer'
                        ? 'bg-white text-zinc-900 border border-zinc-200 rounded-tl-sm'
                        : 'bg-black text-white rounded-tr-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-60 font-mono">
                      <span>{m.sender === 'customer' ? selectedTicket.customerName : 'Velcora AI Engine'}</span>
                      <span>{m.time}</span>
                    </div>
                    <div>{m.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Smart Reply Assistant & Composer */}
            <div className="p-4 bg-white border-t border-zinc-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-zinc-900" />
                  AI Agent Copilot
                </span>
                <button
                  onClick={handleGenerateSmartReply}
                  disabled={isGeneratingReply}
                  className="text-xs inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors cursor-pointer font-medium disabled:opacity-50"
                >
                  <Zap size={12} className="text-amber-500" />
                  <span>{isGeneratingReply ? 'Synthesizing...' : 'Generate Auto-Response'}</span>
                </button>
              </div>

              <form onSubmit={handleSendReply} className="flex gap-2">
                <textarea
                  rows={2}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Draft response or let Velcora AI generate solution..."
                  className="flex-1 p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:border-black font-body resize-none"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-4 bg-black text-white rounded-xl hover:bg-zinc-800 disabled:opacity-40 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
