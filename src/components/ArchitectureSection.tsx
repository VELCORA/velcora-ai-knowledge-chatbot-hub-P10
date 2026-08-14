import React, { useState } from 'react';
import { Layers, Zap, Database, Bot, Shield, Play, CheckCircle2, Code2, ArrowRight } from 'lucide-react';
import { MascotIcon } from './MascotIcon';

const TIERS = [
  {
    id: 1,
    title: 'Tier 1: Continuous Ingestion & Webhook Stream',
    shortName: 'Ingestion Stream',
    badge: '18ms Latency',
    desc: 'Receives event streams from Slack, WhatsApp, REST Webhooks, and Zendesk via an asynchronous message bus.',
    payload: `// Inbound Webhook Payload
POST /api/v1/events/inbound
{
  "event_id": "evt_9821a7df",
  "channel": "slack",
  "sender": "elena.rostova@acme.com",
  "content": "Can we configure custom confidence thresholds per workspace?",
  "timestamp": "2026-08-14T09:42:01.201Z",
  "security_nonce": "0x7f83a...aes256"
}`,
    stats: ['Throughput: 140,000 req/min', 'Edge Buffer: Redis Cluster', 'Drop Rate: 0.000%']
  },
  {
    id: 2,
    title: 'Tier 2: Vector Graph RAG & Document Embeddings',
    shortName: 'Vector Graph RAG',
    badge: '512-Dim Cosine Distance',
    desc: 'Performs sub-18ms semantic vector search across 1.8M indexed chunks from Notion, GitHub, and internal Confluence wikis.',
    payload: `// Vector Retrieval & Context Match
{
  "query_embedding_dim": 512,
  "cosine_similarity_top_k": [
    { "doc_id": "kb-804", "title": "Workspace Threshold Policies", "score": 0.984 },
    { "doc_id": "kb-109", "title": "Autonomous Confidence Matrix", "score": 0.941 }
  ],
  "retrieval_time_ms": 14.8
}`,
    stats: ['Nodes: 1.84M Chunks', 'Similarity: Cosine Distance', 'Cache Hit Ratio: 92.4%']
  },
  {
    id: 3,
    title: 'Tier 3: LLM Reasoning Gate & Policy Enforcement',
    shortName: 'LLM Reasoning Gate',
    badge: 'Gemini 3.7 Flash Engine',
    desc: 'Evaluates context against enterprise security rules and confidence thresholds. Validates whether autonomous dispatch is permitted.',
    payload: `// Autonomous Gate Validation
{
  "model": "gemini-3.7-flash",
  "temperature": 0.2,
  "confidence_score": 0.98,
  "threshold_required": 0.92,
  "action_decision": "AUTONOMOUS_DISPATCH",
  "grounded_sources": ["kb-804", "kb-109"]
}`,
    stats: ['Inference Time: 190ms', 'Hallucination Rate: <0.01%', 'Guardrails: Active']
  },
  {
    id: 4,
    title: 'Tier 4: Omnichannel Dispatch & Telemetry',
    shortName: 'Omnichannel Dispatch',
    badge: 'Sub-240ms Total Loop',
    desc: 'Dispatches signed, verified response back to the client channel while recording encrypted audit telemetry.',
    payload: `// Signed Dispatch Response
HTTP/2 200 OK
{
  "status": "delivered",
  "channel": "slack",
  "dispatched_at": "2026-08-14T09:42:01.441Z",
  "e2e_duration_ms": 240,
  "deflection_status": "AUTONOMOUS_RESOLVED"
}`,
    stats: ['Total E2E: 240ms', 'Delivery: Guaranteed Once', 'SOC2 Logged: Verified']
  }
];

export const ArchitectureSection: React.FC = () => {
  const [activeTier, setActiveTier] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(1);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    setActiveTier(1);

    const interval = setInterval(() => {
      setSimStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsSimulating(false);
          return 4;
        }
        const next = prev + 1;
        setActiveTier(next);
        return next;
      });
    }, 900);
  };

  const selectedTierData = TIERS.find((t) => t.id === activeTier) || TIERS[0];

  return (
    <section id="architecture" className="relative z-10 w-full py-20 px-5 sm:px-8 md:px-12 bg-[#090b0e] text-white border-t border-zinc-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 mb-3">
              <Layers size={13} className="text-white" />
              Sub-240ms Neural Pipeline
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Platform Architecture
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-body mt-2 max-w-2xl">
              An enterprise distributed system designed for high concurrency, zero customer data retention, and instant vector retrieval.
            </p>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer disabled:opacity-50"
          >
            <Play size={14} className={isSimulating ? 'animate-spin' : ''} />
            <span>{isSimulating ? `Simulating Tier ${simStep}...` : 'Run Live Pipeline Simulation'}</span>
          </button>
        </div>

        {/* 4 Pipeline Tier Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => {
                if (!isSimulating) setActiveTier(tier.id);
              }}
              className={`p-5 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                activeTier === tier.id
                  ? 'bg-zinc-900 border-white text-white shadow-xl ring-1 ring-white/20'
                  : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {isSimulating && simStep === tier.id && (
                <div className="absolute inset-0 bg-white/5 animate-pulse" />
              )}
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-mono text-zinc-500">0{tier.id}</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-300">
                  {tier.badge}
                </span>
              </div>
              <h3 className="font-heading font-bold text-sm text-white mb-1.5">{tier.shortName}</h3>
              <p className="text-xs text-zinc-400 font-body line-clamp-2">{tier.desc}</p>
            </button>
          ))}
        </div>

        {/* Active Tier Inspector & Code Payload Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-zinc-950 rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-2xl">
          
          {/* Left Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>Tier 0{selectedTierData.id} Deep Dive</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-3">
                {selectedTierData.title}
              </h3>
              <p className="text-sm text-zinc-400 font-body leading-relaxed">
                {selectedTierData.desc}
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-zinc-800">
              <span className="text-xs font-mono text-zinc-500 uppercase">Operational SLA Metrics:</span>
              <div className="space-y-2">
                {selectedTierData.stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-300 bg-zinc-900/80 px-3.5 py-2 rounded-xl border border-zinc-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Code Payload Console (7 cols) */}
          <div className="lg:col-span-7 bg-[#050608] rounded-2xl border border-zinc-800/90 overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Code2 size={14} className="text-zinc-300" />
                <span>Telemetry Payload & Wire Protocol</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                200 OK
              </span>
            </div>
            <div className="p-5 font-mono text-xs sm:text-[13px] text-zinc-300 overflow-x-auto leading-relaxed">
              <pre className="text-emerald-400/90 whitespace-pre">{selectedTierData.payload}</pre>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
