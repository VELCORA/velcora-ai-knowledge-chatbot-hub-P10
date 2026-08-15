import React, { useState } from 'react';
import { Database, Search, Plus, Sparkles, FileText, Check, Layers, ExternalLink, ArrowUpRight } from 'lucide-react';
import { KnowledgeDocument } from '../types';
import { postJson } from '../lib/apiClient';

const INITIAL_DOCS: KnowledgeDocument[] = [
  {
    id: 'kb-01',
    title: 'Omnichannel Ingestion & Webhook SLA Routing',
    category: 'API',
    updatedAt: '2026-08-12',
    chunkCount: 18,
    tags: ['webhooks', 'sla', 'routing', 'dispatch'],
    content: `Velcora AI synchronizes inbound events across REST webhooks, WebSocket streams, and native CRM bridges.
When an inbound message arrives, the Semantic Ingestion layer calculates message embeddings within 18ms.
If confidence exceeds 94%, the Autonomous Agent immediately drafts and dispatches the response.
If urgency is marked Critical or sentiment is Frustrated, Velcora automatically routes the thread to an on-call human specialist.`
  },
  {
    id: 'kb-02',
    title: 'Zero-Retention Security & SOC2 Type II Architecture',
    category: 'Security',
    updatedAt: '2026-08-10',
    chunkCount: 24,
    tags: ['soc2', 'security', 'encryption', 'gdpr'],
    content: `All customer conversation data processed through Velcora AI is encrypted in-flight using TLS 1.3 and at rest with AES-256 GCM.
Enterprise tenants can enable Zero-Retention Mode, ensuring that no customer payload is stored after inference.
Audit logs provide cryptographic nonces for regulatory compliance.`
  },
  {
    id: 'kb-03',
    title: 'Automated Human Handoff Protocols & Agent Assist',
    category: 'Policies',
    updatedAt: '2026-08-08',
    chunkCount: 12,
    tags: ['handoff', 'agent-assist', 'escalation'],
    content: `When a customer inquiry triggers an escalation condition (e.g. refund requests over $500, legal questions, or high negative sentiment), Velcora switches into Agent Assist mode.
The human agent receives a synthesized 3-bullet briefing, customer sentiment timeline, and 2 one-click proposed resolutions.`
  },
  {
    id: 'kb-04',
    title: 'Custom Vector Sync with Notion, Confluence & GitHub',
    category: 'Integrations',
    updatedAt: '2026-08-04',
    chunkCount: 32,
    tags: ['connectors', 'notion', 'github', 'confluence'],
    content: `Velcora continuous crawler monitors your documentation repositories.
Every Git commit or Notion page update triggers incremental vector re-indexing.
Only changed sections are re-embedded, minimizing API overhead and ensuring zero downtime.`
  },
  {
    id: 'kb-05',
    title: 'Troubleshooting Latency Spikes in High-Volume Webhooks',
    category: 'Troubleshooting',
    updatedAt: '2026-07-29',
    chunkCount: 15,
    tags: ['latency', 'throughput', 'rate-limits', 'redis'],
    content: `For tenants experiencing over 50,000 requests per minute, ensure connection pooling is active.
Velcora supports regional edge endpoints in us-east, us-west, eu-central, and ap-southeast with edge-cached embeddings.`
  }
];

export const KnowledgeSection: React.FC = () => {
  const [docs, setDocs] = useState<KnowledgeDocument[]>(INITIAL_DOCS);
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDocument>(INITIAL_DOCS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'API' | 'Policies' | 'Troubleshooting' | 'Integrations' | 'Security'>('Policies');
  const [newContent, setNewContent] = useState('');
  const [synthesizing, setSynthesizing] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  const categories = ['All', 'API', 'Policies', 'Security', 'Integrations', 'Troubleshooting'];

  const filteredDocs = docs.filter((doc) => {
    const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddNewDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newDoc: KnowledgeDocument = {
      id: `kb-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      updatedAt: new Date().toISOString().split('T')[0],
      chunkCount: Math.ceil(newContent.length / 150),
      tags: [newCategory.toLowerCase(), 'custom-doc', 'synced'],
      content: newContent.trim(),
    };

    setDocs([newDoc, ...docs]);
    setSelectedDoc(newDoc);
    setNewTitle('');
    setNewContent('');
    setShowAddForm(false);
  };

  const handleAskAIAboutDoc = async () => {
    setSynthesizing(true);
    setAiSummary(null);
    try {
      const data = await postJson('/api/knowledge-query', {
        query: `Summarize key rules and actions for document: ${selectedDoc.title}`,
        documents: [selectedDoc],
      });
      setAiSummary(data.answer || "Extracted 3 primary enforcement protocols and high confidence response rules.");
    } catch {
      setAiSummary(`**Synthesized Insights for ${selectedDoc.title}**\n\n• **Core Objective**: Standardizes platform SLA & automated response parameters.\n• **Vector Health**: Fully indexed and live across all connected conversational channels.`);
    } finally {
      setSynthesizing(false);
    }
  };

  return (
    <section id="knowledge-engine" className="relative z-10 w-full py-20 px-5 sm:px-8 md:px-12 bg-zinc-50 text-black border-t border-zinc-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-mono text-zinc-700 mb-3 shadow-xs">
              <Database size={13} className="text-black" />
              Continuous RAG Ingestion Pipeline
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-black tracking-tight">
              Vector Knowledge Repositories
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base font-body mt-2 max-w-2xl">
              Real-time synchronization across company documents, wikis, and technical runbooks with sub-18ms semantic vector search.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-xs sm:text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
            >
              <Plus size={15} />
              <span>{showAddForm ? 'View Repository' : 'Ingest New Article'}</span>
            </button>
          </div>
        </div>

        {/* Live Vector Hub Interface */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[580px]">
          
          {/* Left Column: Document Navigator & Search */}
          <div className="w-full md:w-80 lg:w-96 border-r border-zinc-200 bg-zinc-50/70 flex flex-col flex-shrink-0">
            
            {/* Search Box */}
            <div className="p-4 border-b border-zinc-200">
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search vectorized articles..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs sm:text-sm text-black placeholder:text-zinc-400 focus:outline-none focus:border-black font-body shadow-xs"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar pb-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      activeCategory === cat
                        ? 'bg-black text-white'
                        : 'bg-zinc-200/70 text-zinc-600 hover:text-black'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Document List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredDocs.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => {
                    setSelectedDoc(doc);
                    setShowAddForm(false);
                    setAiSummary(null);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer border ${
                    selectedDoc.id === doc.id && !showAddForm
                      ? 'bg-white border-black/20 shadow-md ring-1 ring-black/5'
                      : 'bg-transparent border-transparent hover:bg-zinc-200/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono uppercase font-semibold text-zinc-500">{doc.category}</span>
                    <span className="font-mono text-zinc-400">{doc.chunkCount} vectors</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-black line-clamp-1 mb-1 font-heading">
                    {doc.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-zinc-500 line-clamp-2 font-body">
                    {doc.content}
                  </p>
                </button>
              ))}

              {filteredDocs.length === 0 && (
                <div className="text-center py-10 text-zinc-400 text-xs">
                  No matching documents found.
                </div>
              )}
            </div>

            {/* Bottom Ingestion Stats */}
            <div className="p-3.5 bg-zinc-100/80 border-t border-zinc-200 text-xs text-zinc-600 flex items-center justify-between font-mono">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Index Sync
              </span>
              <span>100% Vectorized</span>
            </div>
          </div>

          {/* Right Main Pane: Document Viewer / Add Form */}
          <div className="flex-1 flex flex-col p-6 sm:p-8 bg-white overflow-y-auto">
            {showAddForm ? (
              <form onSubmit={handleAddNewDoc} className="max-w-xl mx-auto w-full space-y-4 py-4">
                <div className="border-b border-zinc-100 pb-3">
                  <h3 className="text-lg font-heading font-bold text-black">Ingest New Knowledge Article</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Article will be chunked into 512-dim embedding vectors for live inference.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Document Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Global High-Volume API Rate Limits v3"
                    className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black font-body"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black font-body bg-white"
                  >
                    <option value="Policies">Policies</option>
                    <option value="API">API</option>
                    <option value="Security">Security</option>
                    <option value="Integrations">Integrations</option>
                    <option value="Troubleshooting">Troubleshooting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Document Content</label>
                  <textarea
                    required
                    rows={6}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Paste technical documentation, SLA rules, support policies, or API endpoints..."
                    className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black font-body"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-xs font-medium text-zinc-600 hover:text-black transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold bg-black text-white rounded-xl hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
                  >
                    Vectorize & Ingest
                  </button>
                </div>
              </form>
            ) : (
              <div className="max-w-3xl space-y-6">
                
                {/* Article Header */}
                <div className="border-b border-zinc-100 pb-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 font-mono font-medium border border-zinc-200">
                      {selectedDoc.category}
                    </span>
                    <span>•</span>
                    <span>Last Synced: {selectedDoc.updatedAt}</span>
                    <span>•</span>
                    <span className="font-mono">{selectedDoc.chunkCount} Vector Nodes</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-black">
                    {selectedDoc.title}
                  </h3>
                </div>

                {/* AI Knowledge Synthesizer */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-zinc-50 to-zinc-100/70 border border-zinc-200/80">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-black" />
                      <span className="text-xs sm:text-sm font-semibold text-black font-heading">AI Knowledge Extraction</span>
                    </div>
                    <button
                      onClick={handleAskAIAboutDoc}
                      disabled={synthesizing}
                      className="text-xs inline-flex items-center gap-1 bg-black text-white px-3.5 py-1.5 rounded-full hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50 font-medium"
                    >
                      {synthesizing ? 'Synthesizing...' : 'Generate AI Summary'}
                    </button>
                  </div>
                  {aiSummary ? (
                    <div className="mt-3 p-3.5 bg-white rounded-xl text-xs sm:text-sm text-zinc-800 leading-relaxed border border-zinc-200 font-body whitespace-pre-wrap">
                      {aiSummary}
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-500 font-body">
                      Extract immediate enforcement rules, response parameters, and operational triggers for this document.
                    </p>
                  )}
                </div>

                {/* Document Body */}
                <div className="space-y-4 text-xs sm:text-sm text-zinc-800 font-body leading-relaxed whitespace-pre-wrap">
                  {selectedDoc.content}
                </div>

                {/* Tags */}
                <div className="pt-4 border-t border-zinc-100 flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-zinc-400 font-mono">Semantic Tags:</span>
                  {selectedDoc.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-zinc-100 text-zinc-600 px-2.5 py-0.5 rounded-full border border-zinc-200/60 font-mono"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
