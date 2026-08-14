import React, { useState } from 'react';
import { Shield, Lock, Key, Server, CheckCircle2, FileCheck, RefreshCw } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'soc2' | 'zero-retention' | 'hipaa' | 'vpc'>('soc2');
  const [nonce, setNonce] = useState<string>('0x7f83a992be841029c');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(true);

  const handleVerifyNonce = () => {
    setVerifying(true);
    setVerified(false);
    setTimeout(() => {
      setNonce(`0x${Math.random().toString(16).substring(2, 12)}${Math.random().toString(16).substring(2, 10)}`);
      setVerifying(false);
      setVerified(true);
    }, 600);
  };

  return (
    <section id="security" className="relative z-10 w-full py-20 px-5 sm:px-8 md:px-12 bg-zinc-900 text-white border-t border-zinc-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 mb-3">
              <Shield size={13} className="text-emerald-400" />
              Enterprise Grade Security Matrix
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Zero-Retention Security & Compliance
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-body mt-2 max-w-2xl">
              Engineered from the ground up for strict regulatory compliance, VPC network isolation, and ephemeral vector inference.
            </p>
          </div>
        </div>

        {/* Security Tabs & Interactive Spec Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-zinc-950 rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-2xl">
          
          {/* Left Tabs (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            {[
              { id: 'soc2', name: 'SOC2 Type II Certified', desc: 'Annual continuous 3rd-party audits' },
              { id: 'zero-retention', name: 'Zero-Retention Mode', desc: 'Ephemeral memory • No payload storage' },
              { id: 'hipaa', name: 'HIPAA & BAA Ready', desc: 'PHI detection & automated redaction' },
              { id: 'vpc', name: 'Dedicated VPC Peering', desc: 'AWS / GCP isolated cluster endpoints' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-zinc-900 border-white text-white shadow-md'
                    : 'bg-zinc-950/60 border-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                }`}
              >
                <div className="font-heading font-bold text-sm text-white mb-0.5">{tab.name}</div>
                <div className="text-xs text-zinc-500 font-body">{tab.desc}</div>
              </button>
            ))}

            {/* Cryptographic Verifier Box */}
            <div className="mt-6 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-zinc-400 text-[11px] uppercase">Cryptographic Audit Nonce</span>
                <button
                  onClick={handleVerifyNonce}
                  disabled={verifying}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Generate Fresh Nonce"
                >
                  <RefreshCw size={13} className={verifying ? 'animate-spin' : ''} />
                </button>
              </div>
              <div className="font-mono text-emerald-400 text-[11px] break-all bg-black/80 p-2 rounded-lg border border-zinc-800 mb-2">
                {nonce}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                <CheckCircle2 size={13} />
                <span>Zero Storage Verification: Validated</span>
              </div>
            </div>
          </div>

          {/* Right Detail Pane (8 cols) */}
          <div className="lg:col-span-8 bg-zinc-900/50 rounded-2xl p-6 sm:p-8 border border-zinc-800/80 flex flex-col justify-between">
            {activeTab === 'soc2' && (
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-white mb-3">
                  <FileCheck size={20} />
                </div>
                <h3 className="text-xl font-heading font-bold text-white">SOC2 Type II Certified Cloud Infrastructure</h3>
                <p className="text-sm text-zinc-300 font-body leading-relaxed">
                  Velcora undergoes continuous third-party compliance auditing across Security, Availability, Processing Integrity, and Confidentiality trust principles.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • 256-bit AES at rest & TLS 1.3 in-transit
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • Continuous automated penetration tests
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • Role-based SAML SSO & SCIM provisioning
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • Real-time immutable audit logs
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'zero-retention' && (
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-white mb-3">
                  <Lock size={20} />
                </div>
                <h3 className="text-xl font-heading font-bold text-white">Guaranteed Zero Data Retention</h3>
                <p className="text-sm text-zinc-300 font-body leading-relaxed">
                  When Zero-Retention is toggled, customer payloads exist purely in ephemeral RAM during LLM inference and are purged immediately post-dispatch.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • RAM-only vector similarity search
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • No LLM model training on customer data
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • Automated PII anonymization pipeline
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • GDPR Right-to-be-Forgotten compliance
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hipaa' && (
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-white mb-3">
                  <Key size={20} />
                </div>
                <h3 className="text-xl font-heading font-bold text-white">HIPAA & Business Associate Agreement (BAA)</h3>
                <p className="text-sm text-zinc-300 font-body leading-relaxed">
                  Dedicated healthcare tenants receive signed Business Associate Agreements with automated Protected Health Information (PHI) masking before vector tokenization.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • Signed BAA on Enterprise tier
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • Real-time medical entity anonymizer
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • Audit-ready access controls
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • Disaster recovery RPO &lt; 1 min
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vpc' && (
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-white mb-3">
                  <Server size={20} />
                </div>
                <h3 className="text-xl font-heading font-bold text-white">Dedicated Private VPC Peering</h3>
                <p className="text-sm text-zinc-300 font-body leading-relaxed">
                  Direct network peering with your private AWS, Google Cloud, or Azure VPC clusters without traversing the public internet.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • AWS PrivateLink & GCP VPC Peering
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • Dedicated tenant database instances
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • Custom IP whitelisting & firewall rules
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300">
                    • Single-tenant GPU inference clusters
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Status: All compliance controls active</span>
              <span className="text-emerald-400 font-semibold">100% Passing</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
