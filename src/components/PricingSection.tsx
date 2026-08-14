import React, { useState } from 'react';
import { Check, Zap, Sparkles, Shield, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      desc: 'Ideal for fast-scaling startups automating initial customer workflows.',
      priceMonthly: 299,
      priceAnnual: 239,
      conversations: '5,000 conversations / mo',
      features: [
        'Webchat & Slack Connectors',
        '5 Vector Knowledge Bases',
        'Sub-500ms Average Latency',
        'Standard Email Support (8hr SLA)',
        'Automated Confidence Triage'
      ],
      cta: 'Start 14-Day Free Trial',
      popular: false
    },
    {
      name: 'Growth',
      desc: 'For scaling support teams requiring omnichannel triage & custom vectors.',
      priceMonthly: 899,
      priceAnnual: 719,
      conversations: '25,000 conversations / mo',
      features: [
        'Slack, WhatsApp, Email & Webchat',
        'Unlimited Vector Knowledge Bases',
        'Sub-240ms Gemini 3.7 Flash Engine',
        'Automated Agent Assist & Drafts',
        'Priority 24/7 Support (1hr SLA)',
        'SOC2 Type II & Zero-Retention Mode'
      ],
      cta: 'Launch Growth Workspace',
      popular: true
    },
    {
      name: 'Enterprise',
      desc: 'Mission-critical deployments with dedicated VPCs and custom LLM routing.',
      priceMonthly: 2499,
      priceAnnual: 1999,
      conversations: 'Unlimited Volume Tier',
      features: [
        'Dedicated Private VPC Peering',
        'Custom Fine-Tuned Model Weights',
        'Signed HIPAA BAA & GDPR Guarantee',
        'Dedicated Solutions Architect',
        'Custom CRM & Internal API Bridges',
        '99.99% Guaranteed SLA Uptime'
      ],
      cta: 'Deploy Enterprise Cluster',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="relative z-10 w-full py-20 px-5 sm:px-8 md:px-12 bg-white text-black border-t border-zinc-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-700 mb-3">
            <Zap size={13} className="text-black" />
            Transparent Enterprise Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-black tracking-tight">
            Predictable Plans for Any Scale
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-body mt-3">
            Deploy autonomous support agents without per-seat human license penalties.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                !annual ? 'bg-black text-white shadow-xs' : 'text-zinc-600 hover:text-black'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                annual ? 'bg-black text-white shadow-xs' : 'text-zinc-600 hover:text-black'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[10px] font-mono">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = annual ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={idx}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all border ${
                  plan.popular
                    ? 'bg-zinc-950 text-white border-zinc-800 shadow-2xl scale-[1.02] ring-2 ring-black'
                    : 'bg-zinc-50 text-black border-zinc-200/90 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-bold text-xl">{plan.name}</h3>
                    {plan.popular && (
                      <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-white text-black font-semibold">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className={`text-xs font-body mb-6 ${plan.popular ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {plan.desc}
                  </p>

                  <div className="mb-6 pb-6 border-b border-zinc-200/20">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight">
                        ${price}
                      </span>
                      <span className={`text-xs font-mono ${plan.popular ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        / month
                      </span>
                    </div>
                    <div className={`text-xs font-mono mt-1 ${plan.popular ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {plan.conversations}
                    </div>
                  </div>

                  {/* Feature list */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs font-body">
                        <Check size={15} className={`flex-shrink-0 mt-0.5 ${plan.popular ? 'text-emerald-400' : 'text-black'}`} />
                        <span className={plan.popular ? 'text-zinc-300' : 'text-zinc-700'}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    plan.popular
                      ? 'bg-white text-black hover:bg-zinc-200'
                      : 'bg-black text-white hover:bg-zinc-800'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
