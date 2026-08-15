import React, { useState } from 'react';
import { MessageSquare, CheckCircle, Send, Sparkles, Zap, Clock, User, Check, RefreshCw } from 'lucide-react';
import { MascotIcon } from './MascotIcon';
import { ConversationTicket } from '../types';
import { postJson } from '../lib/apiClient';

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

export const ConversationHubSection: React.FC = () => {
  const [tickets, setTickets] = useState<ConversationTicket[]>(INITIAL_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<ConversationTicket>(INITIAL_TICKETS[0]);
  const [replyText, setReplyText] = useState('');
  const [filterChannel, setFilterChannel] = useState<string>('All');
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);

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

    const updated: ConversationTicket = {
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
            content: `Generate a polite, hyper-concise professional customer response for this ticket inquiry: "${selectedTicket.lastMessage}" (Customer: ${selectedTicket.customerName}, Channel: ${selectedTicket.channel}, Urgency: ${selectedTicket.urgency}).`,
          }
        ],
      });
      setReplyText(data.text || `Hi ${selectedTicket.customerName.split(' ')[0]}, we have verified your request against our knowledge repository and updated your cluster.`);
    } catch {
      setReplyText(`Hi ${selectedTicket.customerName.split(' ')[0]}, thank you for reaching out. We have analyzed your ticket (${selectedTicket.id}) and applied the verified resolution from our knowledge repository. Please let us know if you need any additional assistance.`);
    } finally {
      setIsGeneratingReply(false);
    }
  };

  const handleResolveTicket = () => {
    const updated: ConversationTicket = {
      ...selectedTicket,
      status: 'Resolved' as const,
    };
    setSelectedTicket(updated);
    setTickets(tickets.map((t) => (t.id === updated.id ? updated : t)));
  };

  return (
    <section id="conversations-hub" className="relative z-10 w-full py-20 px-5 sm:px-8 md:px-12 bg-white text-black border-t border-zinc-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-700 mb-3">
              <MessageSquare size={13} className="text-black" />
              Omnichannel Triage & Live Queue
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-black tracking-tight">
              Unified Conversation Hub
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base font-body mt-2 max-w-2xl">
              Synchronize customer inquiries across Slack, WhatsApp, Web & Email with automated sentiment triage, instant deflection, and seamless human handoff.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Autonomous Ingestion Active</span>
          </div>
        </div>

        {/* Live Top Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl border border-zinc-200 bg-zinc-50 overflow-hidden mb-6 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 text-xs">
          <div className="p-4">
            <span className="text-zinc-500 block font-mono text-[11px] uppercase">AI Auto-Deflection</span>
            <span className="text-xl font-bold text-black font-heading mt-0.5 block">84.6%</span>
            <span className="text-[11px] text-emerald-600 font-medium">↑ 3.2% this week</span>
          </div>
          <div className="p-4">
            <span className="text-zinc-500 block font-mono text-[11px] uppercase">Median Response Time</span>
            <span className="text-xl font-bold text-black font-heading mt-0.5 block">240ms</span>
            <span className="text-[11px] text-zinc-500">SLA: &lt; 500ms guaranteed</span>
          </div>
          <div className="p-4">
            <span className="text-zinc-500 block font-mono text-[11px] uppercase">CSAT Satisfaction</span>
            <span className="text-xl font-bold text-black font-heading mt-0.5 block">4.92 / 5.0</span>
            <span className="text-[11px] text-emerald-600 font-medium">98.8% positive sentiment</span>
          </div>
          <div className="p-4">
            <span className="text-zinc-500 block font-mono text-[11px] uppercase">Active Queue</span>
            <span className="text-xl font-bold text-black font-heading mt-0.5 block">{tickets.length} Live Threads</span>
            <span className="text-[11px] text-zinc-500">All channels synced</span>
          </div>
        </div>

        {/* Unified Hub Applet */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          {/* Left Column: Ticket Ingestion Stream */}
          <div className="w-full md:w-80 lg:w-96 border-r border-zinc-200 bg-zinc-50/70 flex flex-col flex-shrink-0">
            
            {/* Filter Pills */}
            <div className="p-4 border-b border-zinc-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {['All', 'Slack', 'Email', 'WhatsApp', 'Web'].map((ch) => (
                <button
                  key={ch}
                  onClick={() => setFilterChannel(ch)}
                  className={`text-[11px] px-3 py-1 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    filterChannel === ch ? 'bg-black text-white' : 'bg-zinc-200/70 text-zinc-600 hover:text-black'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>

            {/* Ticket Cards */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredTickets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTicket(t)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer border ${
                    selectedTicket.id === t.id
                      ? 'bg-white border-black/20 shadow-md ring-1 ring-black/5'
                      : 'bg-transparent border-transparent hover:bg-zinc-200/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="font-semibold text-zinc-700">{t.channel}</span>
                      <span className="text-zinc-300">•</span>
                      <span className="text-zinc-400">{t.id}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      t.urgency === 'Critical' ? 'bg-rose-100 text-rose-800' :
                      t.urgency === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {t.urgency}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs sm:text-sm font-semibold text-black font-heading line-clamp-1">
                      {t.customerName}
                    </h4>
                    <span className="text-[10px] text-zinc-400 font-mono">{t.timestamp}</span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-zinc-500 line-clamp-2 font-body">
                    {t.lastMessage}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-zinc-400 pt-2 border-t border-zinc-100 font-mono">
                    <span>{t.assignedAgent}</span>
                    <span className={`font-semibold ${
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
            
            {/* Inspector Header */}
            <div className="p-4 sm:p-5 border-b border-zinc-200 bg-zinc-50/50 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-heading font-bold text-black">{selectedTicket.customerName}</h3>
                  <span className="text-xs text-zinc-400 font-mono">({selectedTicket.id})</span>
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                    selectedTicket.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-800' :
                    selectedTicket.sentiment === 'frustrated' ? 'bg-rose-100 text-rose-800' : 'bg-zinc-100 text-zinc-700'
                  }`}>
                    Sentiment: {selectedTicket.sentiment} ({(selectedTicket.sentimentScore * 100).toFixed(0)}%)
                  </span>
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  Channel: <span className="font-semibold text-black">{selectedTicket.channel}</span> • Assigned: {selectedTicket.assignedAgent}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResolveTicket}
                  className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-800 font-medium transition-colors cursor-pointer shadow-xs"
                >
                  <CheckCircle size={14} className="text-emerald-600" />
                  <span>Mark Resolved</span>
                </button>
              </div>
            </div>

            {/* Conversation History Stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-zinc-50/40">
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
                    className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm font-body leading-relaxed shadow-xs ${
                      m.sender === 'customer'
                        ? 'bg-white text-zinc-900 border border-zinc-200 rounded-tl-xs'
                        : 'bg-black text-white rounded-tr-xs'
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

            {/* Smart Response Composer */}
            <div className="p-4 sm:p-5 bg-white border-t border-zinc-200">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-black" />
                  AI Agent Copilot Assistance
                </span>
                <button
                  onClick={handleGenerateSmartReply}
                  disabled={isGeneratingReply}
                  className="text-xs inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors cursor-pointer font-medium disabled:opacity-50"
                >
                  <Zap size={13} className="text-amber-500" />
                  <span>{isGeneratingReply ? 'Synthesizing...' : 'Generate Auto-Response'}</span>
                </button>
              </div>

              <form onSubmit={handleSendReply} className="flex gap-2">
                <textarea
                  rows={2}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type response or click Generate Auto-Response..."
                  className="flex-1 p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-black font-body resize-none"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-5 bg-black text-white rounded-2xl hover:bg-zinc-800 disabled:opacity-40 transition-colors flex items-center justify-center cursor-pointer shadow-sm"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
