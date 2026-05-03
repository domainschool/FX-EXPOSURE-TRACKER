import React, { useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  TrendingDown, 
  Zap, 
  Globe, 
  ChevronDown, 
  AlertCircle, 
  ArrowRight,
  Target,
  GraduationCap,
  Sparkles
} from 'lucide-react';

const ParticleField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0b0e14]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            opacity: Math.random() 
          }}
          animate={{
            y: [null, '-10%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export const AboutPage = ({ onBack }: { onBack: () => void }) => {
  useScroll();
  const [activeTab, setActiveTab] = useState<'mvp' | 'enterprise'>('mvp');
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-300 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 border-b border-white/5 bg-[#0b0e14]/80 backdrop-blur-xl z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500" />
          <span className="font-mono font-bold text-white tracking-tighter">DOMAIN SCHOOL</span>
        </div>
        <button 
          onClick={onBack}
          className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
        >
          Back to Dashboard
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-16">
        <ParticleField />
        <div className="relative z-10 max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles size={14} />
            Institutional Grade Strategy
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight text-white leading-[0.9]"
          >
            The Financial <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
              Shield.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Bridging the gap between writing code and solving a multi-million dollar liquidity problem. 
            Protecting the bottom line from currency volatility.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-slate-500"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll to Explore</span>
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pain Point Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white tracking-tight">The Profit Eraser.</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Imagine a US retailer buying <span className="font-mono text-white">$1M</span> of leather from Italy. 
              The price is agreed today, but paid in 30 days. If the market moves, the profit vanishes.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-1 bg-red-500/10 rounded border border-red-500/20">
                  <AlertCircle size={16} className="text-red-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">The "Excel Lag"</h4>
                  <p className="text-sm text-slate-500">Spreadsheets are updated too late. The market moves in milliseconds.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-1 bg-red-500/10 rounded border border-red-500/20">
                  <AlertCircle size={16} className="text-red-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Invisible Losses</h4>
                  <p className="text-sm text-slate-500">Massive FX Loss line items only appear when it's too late to act.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-slate-900/50 border border-white/5 p-8 rounded-3xl backdrop-blur-xl overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Transaction Simulation</span>
                <button 
                  onClick={() => setShowAfter(!showAfter)}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
                >
                  {showAfter ? 'Reset View' : 'Trigger 5% Market Move'}
                </button>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-950/50 border border-white/5">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">Original Cost (USD)</p>
                  <span className="text-4xl font-mono font-bold text-white tracking-tighter">$1,000,000</span>
                </div>

                <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: showAfter ? '100%' : '0%' }}
                    className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {showAfter ? (
                    <motion.div
                      key="after"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20"
                    >
                      <p className="text-xs font-medium text-red-400 uppercase tracking-widest mb-2">New Cost after 30 Days</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-mono font-bold text-red-500 tracking-tighter">$1,050,000</span>
                        <span className="text-red-400 font-bold text-sm">+5%</span>
                      </div>
                      <p className="mt-4 text-xs font-bold text-red-400/80 uppercase tracking-widest">⚠️ Margin Erased: $50,000 Loss</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="before"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
                    >
                      <p className="text-xs font-medium text-emerald-400 uppercase tracking-widest mb-2">Safe Zone</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-mono font-bold text-emerald-500 tracking-tighter">$1,000,000</span>
                        <span className="text-emerald-400 font-bold text-sm">Target</span>
                      </div>
                      <p className="mt-4 text-xs font-bold text-emerald-400/80 uppercase tracking-widest">Profit Protected</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl font-bold text-white tracking-tight">The Secret Sauce.</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Core domain concepts built into the architecture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[600px]">
            <BentoItem 
              className="md:col-span-2 md:row-span-2"
              icon={<Globe size={24} className="text-blue-400" />}
              title="Transaction Exposure"
              desc="The risk that exchange rates change between signing a contract and moving cash. We track this gap in real-time."
            />
            <BentoItem 
              className="md:col-span-2"
              icon={<Zap size={24} className="text-amber-400" />}
              title="Volatility Threshold"
              desc="The 'panic button.' A 2% move triggers automated alerts across the entire tech stack."
            />
            <BentoItem 
              icon={<Shield size={24} className="text-emerald-400" />}
              title="Hedging"
              desc="Strategic offsets to lock in today's rates."
            />
            <BentoItem 
              icon={<TrendingDown size={24} className="text-indigo-400" />}
              title="Base vs Quote"
              desc="Reporting vs Variable cost logic."
            />
          </div>
        </div>
      </section>

      {/* Blueprint Comparison */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-white tracking-tight">Builder’s Blueprint.</h2>
          <div className="inline-flex p-1 bg-white/5 rounded-xl border border-white/10">
            <button 
              onClick={() => setActiveTab('mvp')}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === 'mvp' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              The MVP
            </button>
            <button 
              onClick={() => setActiveTab('enterprise')}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === 'enterprise' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Enterprise
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          <ComparisonRow label="Data Frequency" mvp="Daily / Hourly Updates" enterprise="Millisecond Tick Data" active={activeTab} />
          <ComparisonRow label="Risk Logic" mvp="2% Weekly Alert" enterprise="Value-at-Risk (VaR) Modeling" active={activeTab} />
          <ComparisonRow label="UI Focus" mvp="Actionable Warning States" enterprise="Heatmaps & Ledger Integration" active={activeTab} />
          <ComparisonRow label="Execution" mvp="Manual Triggers" enterprise="Direct Bank API Portals" active={activeTab} />
          <ComparisonRow label="Compliance" mvp="Visual Gain/Loss" enterprise="Automated IFRS 9 Logs" active={activeTab} />
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-32 px-6 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-white tracking-tight text-center mb-24">The Learning Path.</h2>
        <div className="relative space-y-24">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0" />
          
          <PathItem 
            icon={<Target size={20} />} 
            title="Business-Fluent" 
            desc="Stop talking about fetch() and start talking about protecting the bottom line." 
          />
          <PathItem 
            icon={<AlertCircle size={20} />} 
            title="The Aha! Moment" 
            desc="The dashboard flips from Green to Red at 2.1%. Code becomes a Decision Support Tool." 
            align="right"
          />
          <PathItem 
            icon={<GraduationCap size={20} />} 
            title="Cracking the Interview" 
            desc="'I built a Risk Mitigation tool for supply chains to prevent margin erosion.'" 
          />
        </div>
      </section>

      {/* Footer / Conversion */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-gradient-x"></div>
          <div className="relative bg-slate-900 border border-white/10 p-12 rounded-3xl text-center space-y-8 overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Shield size={120} />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white tracking-tight">The Domain School Mission.</h2>
              <p className="text-lg text-slate-400 max-w-xl mx-auto">
                Transforming engineers into strategists. Solve real problems. Build capital preservation systems.
              </p>
            </div>
            <button className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl overflow-hidden transition-transform active:scale-95">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
              Join the Masterclass
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-xs font-mono font-bold text-slate-600 uppercase tracking-widest border-t border-white/5">
        &copy; 2024 Domain School. Institutional Standards.
      </footer>
    </div>
  );
};

const BentoItem = ({ icon, title, desc, className }: { icon: React.ReactNode; title: string; desc: string; className?: string }) => (
  <div className={`relative group p-8 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-xl overflow-hidden hover:border-blue-500/30 transition-all ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10 space-y-4">
      <div className="p-3 bg-white/5 rounded-2xl w-fit group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  </div>
);

const ComparisonRow = ({ label, mvp, enterprise, active }: { label: string; mvp: string; enterprise: string; active: 'mvp' | 'enterprise' }) => (
  <div className="grid grid-cols-2 p-6 rounded-2xl bg-white/[0.02] border border-white/5 items-center gap-8">
    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    <AnimatePresence mode="wait">
      <motion.span 
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`text-sm font-medium ${active === 'mvp' ? 'text-blue-400' : 'text-emerald-400'}`}
      >
        {active === 'mvp' ? mvp : enterprise}
      </motion.span>
    </AnimatePresence>
  </div>
);

const PathItem = ({ icon, title, desc, align = 'left' }: { icon: React.ReactNode; title: string; desc: string; align?: 'left' | 'right' }) => (
  <motion.div 
    initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className={`flex items-center gap-8 md:gap-12 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 z-10 bg-[#0b0e14]">
      {icon}
    </div>
    <div className={`space-y-2 ${align === 'right' ? 'md:text-right' : ''}`}>
      <h4 className="text-xl font-bold text-white">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed max-w-sm">{desc}</p>
    </div>
  </motion.div>
);
