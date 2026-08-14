import React, { useState } from 'react';
import { DollarSign, Clock, TrendingUp, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenContact: () => void;
}

export const RoiCalculatorSection: React.FC<RoiCalculatorProps> = ({ onOpenContact }) => {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(25000);
  const [costPerTicket, setCostPerTicket] = useState<number>(14);
  const [deflectionRate, setDeflectionRate] = useState<number>(84); // 84%

  // Calculations
  const rawMonthlyCost = monthlyVolume * costPerTicket;
  const deflectedTickets = Math.round(monthlyVolume * (deflectionRate / 100));
  const velcoraEstimatedCost = 899 + Math.round(deflectedTickets * 0.08); // Base platform fee + compute
  const monthlySavings = Math.max(0, rawMonthlyCost - (rawMonthlyCost * (1 - deflectionRate / 100) + velcoraEstimatedCost));
  const annualSavings = monthlySavings * 12;
  const hoursSavedPerYear = Math.round((deflectedTickets * 12 * 8.5) / 60); // Assuming 8.5 min per ticket

  return (
    <section id="calculator" className="relative z-10 w-full py-20 px-5 sm:px-8 md:px-12 bg-white text-black border-t border-zinc-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-700 mb-3">
              <DollarSign size={13} className="text-emerald-600" />
              Interactive Financial Model
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-black tracking-tight">
              Enterprise ROI & Cost Deflection Calculator
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base font-body mt-2 max-w-2xl">
              Model your support organization's immediate annual cost reduction, hours liberated, and resolution acceleration.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white font-semibold text-xs sm:text-sm hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
          >
            <span>Request Custom Audit</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-zinc-50 rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-xl">
          
          {/* Sliders & Parameters (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="border-b border-zinc-200 pb-4">
              <h3 className="text-lg font-heading font-bold text-black">Your Support Parameters</h3>
              <p className="text-xs text-zinc-500 mt-1">Adjust sliders to reflect your current operational metrics.</p>
            </div>

            {/* Slider 1: Monthly Tickets */}
            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-black mb-2">
                <span>Monthly Inbound Conversations</span>
                <span className="font-mono text-base font-bold bg-white px-3 py-1 rounded-xl border border-zinc-200 shadow-2xs">
                  {monthlyVolume.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="150000"
                step="1000"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 mt-1.5 font-mono">
                <span>2,000 / mo</span>
                <span>75,000 / mo</span>
                <span>150,000 / mo</span>
              </div>
            </div>

            {/* Slider 2: Current Cost per Ticket */}
            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-black mb-2">
                <span>Current Human Cost Per Ticket ($)</span>
                <span className="font-mono text-base font-bold bg-white px-3 py-1 rounded-xl border border-zinc-200 shadow-2xs">
                  ${costPerTicket}
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="30"
                step="1"
                value={costPerTicket}
                onChange={(e) => setCostPerTicket(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 mt-1.5 font-mono">
                <span>$4 (Basic L1)</span>
                <span>$14 (Blended Avg)</span>
                <span>$30 (Tier 3 Tech)</span>
              </div>
            </div>

            {/* Slider 3: Target AI Deflection Rate */}
            <div>
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-black mb-2">
                <span>Velcora AI Deflection Rate</span>
                <span className="font-mono text-base font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                  {deflectionRate}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                step="1"
                value={deflectionRate}
                onChange={(e) => setDeflectionRate(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 mt-1.5 font-mono">
                <span>50% (Conservative)</span>
                <span>84% (Production Avg)</span>
                <span>95% (Optimized)</span>
              </div>
            </div>

            {/* Deflected Summary Pill */}
            <div className="p-4 rounded-2xl bg-white border border-zinc-200 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-600">Autonomous Deflections:</span>
              <span className="font-bold text-black text-sm">{deflectedTickets.toLocaleString()} tickets / month</span>
            </div>

          </div>

          {/* ROI Cards Output (6 cols) */}
          <div className="lg:col-span-6 bg-black text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <DollarSign size={160} />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-4">
                <Sparkles size={14} />
                <span>Estimated Annual Savings</span>
              </div>

              <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-none mb-4">
                ${annualSavings.toLocaleString()}
                <span className="text-xs sm:text-sm font-normal text-zinc-400 block mt-2 font-mono">
                  ${monthlySavings.toLocaleString()} saved every single month
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6 border-t border-zinc-800 my-6">
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                  <Clock size={14} />
                  <span>Support Hours Saved</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                  {hoursSavedPerYear.toLocaleString()} hrs/yr
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                  <TrendingUp size={14} className="text-emerald-400" />
                  <span>Payback Period</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                  &lt; 6 Days
                </div>
              </div>
            </div>

            <button
              onClick={onOpenContact}
              className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Deploy Velcora for Your Workspace</span>
              <ArrowRight size={15} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
