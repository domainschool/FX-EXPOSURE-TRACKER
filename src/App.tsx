import React, { useState } from 'react';
import { Activity, LayoutDashboard, Settings, PieChart, Bell, RefreshCcw, TrendingUp, AlertTriangle, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { useFXData } from './hooks/useFXData';
import { AboutPage } from './components/AboutPage';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const currentRate = payload[0].value as number;
    
    return (
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-3 rounded-lg shadow-xl">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono font-bold text-white">{currentRate.toFixed(4)}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono">
            EUR/USD
          </span>
        </div>
      </div>
    );
  }
  return null;
};

function App() {
  const [view, setView] = useState<'dashboard' | 'about'>('dashboard');
  const { rate, lastUpdated, history, loading, error, refresh } = useFXData();
  const [invoiceAmount, setInvoiceAmount] = useState<string>('1000');
  
  // Simulation Mode State
  const [isSimulationMode, setIsSimulationMode] = useState(false);
  const [simulatedVolatility, setSimulatedVolatility] = useState(0.5);

  const usdValue = rate ? parseFloat(invoiceAmount || '0') * rate : 0;

  // Industry Logic: Calculate 7-day % change
  const historicalRate = history.length > 0 ? history[0].rate : null;
  const livePercentChange = (rate && historicalRate) 
    ? ((rate - historicalRate) / historicalRate) * 100 
    : 0;
  
  const currentVolatility = isSimulationMode ? simulatedVolatility : livePercentChange;
  const isCritical = currentVolatility > 2;

  const getStrategyAdvice = (vol: number) => {
    if (vol >= 2) return {
      status: 'CRITICAL',
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/50',
      advice: 'Margin erosion imminent. Recommended Action: Execute Forward Contract or Currency Option to lock in rates.'
    };
    if (vol >= 1) return {
      status: 'WARNING',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/50',
      advice: 'Volatility increasing. Review outstanding EUR invoices for next 60 days.'
    };
    return {
      status: 'OPTIMIZED',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/50',
      advice: 'No action required. Maintain current spot-market strategy.'
    };
  };

  const strategy = getStrategyAdvice(currentVolatility);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0e14] text-slate-300 font-sans">
      {/* Sidebar */}
      <aside className="w-16 md:w-64 flex-shrink-0 border-r border-slate-800 bg-[#0b0e14] flex flex-col transition-all duration-300">
        <div className="h-14 flex items-center justify-center md:justify-start md:px-6 border-b border-slate-800">
          <Activity className="w-6 h-6 text-blue-500" />
        </div>
        
        <nav className="flex-1 py-4 flex flex-col gap-2 px-3">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={view === 'dashboard'} 
            onClick={() => setView('dashboard')}
          />
          <NavItem 
            icon={<PieChart size={20} />} 
            label="About Project" 
            active={view === 'about'} 
            onClick={() => setView('about')}
          />
          <NavItem icon={<Bell size={20} />} label="Alerts" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {view === 'about' ? (
          <AboutPage onBack={() => setView('dashboard')} />
        ) : (
          <>
            {/* Top Navigation Bar */}
            <header className="h-14 border-b border-slate-800 bg-[#0b0e14]/80 backdrop-blur-md flex items-center justify-between px-6 flex-shrink-0 z-10">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-mono tracking-widest font-bold text-white">
                  FX EXPOSURE TRACKER
                </h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-slate-800/50 rounded-full px-3 py-1 border border-slate-700/50">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-green-400">System Live</span>
                </div>
              </div>
            </header>

            {/* Main Workspace */}
            <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-[#0b0e14] via-[#0f172a] to-[#0b0e14] pb-20">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Risk Banner */}
            <AnimatePresence>
              {isCritical && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center justify-between gap-4 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-500/20 rounded-lg animate-pulse">
                        <AlertTriangle size={20} className="text-red-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-red-500 uppercase tracking-wider">Critical Risk Alert</h4>
                        <p className="text-xs text-red-400/80 font-medium">
                          Euro has strengthened by {currentVolatility.toFixed(2)}% in 7 days. Hedging recommended to protect margins.
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-widest shadow-lg shadow-red-900/20">
                      Hedging Desk
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hero Stat Card */}
            <div className={`relative group transition-all duration-300 hover:scale-[1.02] ${isSimulationMode ? 'opacity-70 grayscale-[0.5]' : ''}`}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative p-8 border border-slate-800 rounded-2xl bg-slate-900/40 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    {isSimulationMode && <span className="bg-amber-500/20 text-amber-500 text-[10px] px-1.5 py-0.5 rounded border border-amber-500/20">SIMULATED</span>}
                    Current Market Rate
                  </p>
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-5xl font-mono font-bold text-white tabular-nums">
                      {loading ? '---' : rate?.toFixed(4)}
                    </h2>
                    <span className="text-xl font-mono text-slate-500">EUR / USD</span>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-xs text-slate-500">Last Updated: {lastUpdated || 'Never'}</span>
                    {error && <span className="text-xs text-red-400 font-medium">| Error: {error}</span>}
                  </div>
                </div>

                <button 
                  onClick={refresh}
                  disabled={loading || isSimulationMode}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-900/20 active:scale-95 group/btn"
                >
                  <RefreshCcw size={18} className={`${loading ? 'animate-spin' : 'group-hover/btn:rotate-180 transition-transform duration-500'}`} />
                  {loading ? 'Refreshing...' : 'Refresh Market'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Exposure Calculator Card */}
              <motion.div 
                className="relative group transition-all duration-300 hover:scale-[1.02]"
                animate={isCritical ? {
                  x: [0, -4, 4, -4, 4, 0],
                  transition: { duration: 0.5, repeat: 0 }
                } : {}}
              >
                <div className={`absolute -inset-0.5 rounded-2xl blur transition duration-1000 ${
                  isCritical 
                    ? 'bg-red-500 opacity-20 animate-pulse' 
                    : 'bg-gradient-to-r from-emerald-500/50 to-blue-500/50 opacity-10 group-hover:opacity-30'
                }`}></div>
                <div className={`relative p-6 border rounded-2xl bg-slate-900/40 backdrop-blur-xl shadow-xl space-y-6 transition-colors duration-500 ${
                  isCritical ? 'border-red-500/50' : 'border-slate-800/50'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <Activity size={18} className="text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-200">Exposure Calculator</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="eur-amount" className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Invoice Amount (EUR)
                      </label>
                      <div className="relative">
                        <input
                          id="eur-amount"
                          type="number"
                          value={invoiceAmount}
                          onChange={(e) => setInvoiceAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-white font-mono outline-none transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">
                          EUR
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/30 border border-slate-800/50 space-y-1">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Current USD Value</p>
                      <div className="flex items-baseline gap-2">
                        <motion.span 
                          key={usdValue}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-3xl font-mono font-bold text-emerald-400 tabular-nums"
                        >
                          ${usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </motion.span>
                        <span className="text-sm font-mono text-slate-600">USD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Weekly Volatility Chart */}
              <div className={`relative group transition-all duration-300 hover:scale-[1.02] ${isSimulationMode ? 'opacity-70 grayscale-[0.5]' : ''}`}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-indigo-500/50 rounded-2xl blur opacity-10 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative p-6 border border-slate-800/50 rounded-2xl bg-slate-900/40 backdrop-blur-xl shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <TrendingUp size={18} className="text-blue-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-200">Weekly Volatility</h3>
                    </div>
                    <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest bg-slate-800/30 px-2 py-1 rounded border border-slate-800/50">
                      Live Market
                    </div>
                  </div>

                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={history}>
                        <defs>
                          <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748b', fontSize: 10 }}
                          dy={10}
                        />
                        <YAxis 
                          domain={['auto', 'auto']} 
                          hide 
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area 
                          type="monotone" 
                          dataKey="rate" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorRate)" 
                          animationDuration={2000}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Simulation Lab */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative p-8 border border-slate-800 rounded-2xl bg-slate-900/40 backdrop-blur-xl shadow-xl space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-violet-500/10 rounded-lg">
                      <Layers size={20} className="text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Market Simulation Lab</h3>
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Practice & Stress Testing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-slate-950/50 p-1 rounded-xl border border-slate-800">
                    <button 
                      onClick={() => setIsSimulationMode(false)}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${!isSimulationMode ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      Live Market
                    </button>
                    <button 
                      onClick={() => setIsSimulationMode(true)}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${isSimulationMode ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      Simulation
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="space-y-6 lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <ScenarioButton 
                        label="Stable Market" 
                        value={0.2} 
                        current={simulatedVolatility} 
                        onClick={(v) => { setIsSimulationMode(true); setSimulatedVolatility(v); }}
                      />
                      <ScenarioButton 
                        label="Euro Rally" 
                        value={3.5} 
                        current={simulatedVolatility} 
                        onClick={(v) => { setIsSimulationMode(true); setSimulatedVolatility(v); }}
                      />
                      <ScenarioButton 
                        label="USD Strength" 
                        value={-2.5} 
                        current={simulatedVolatility} 
                        onClick={(v) => { setIsSimulationMode(true); setSimulatedVolatility(v); }}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          Manual Volatility Control
                        </label>
                        <span className={`text-sm font-mono font-bold ${simulatedVolatility >= 2 ? 'text-red-500' : 'text-violet-400'}`}>
                          {simulatedVolatility > 0 ? '+' : ''}{simulatedVolatility.toFixed(2)}%
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="-5" 
                        max="5" 
                        step="0.1" 
                        value={simulatedVolatility}
                        onChange={(e) => { setIsSimulationMode(true); setSimulatedVolatility(parseFloat(e.target.value)); }}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                      />
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl border transition-all duration-500 flex flex-col justify-between gap-4 ${strategy.bg} ${strategy.border}`}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${strategy.color}`}>Strategy Advisor</span>
                        <div className={`h-2 w-2 rounded-full animate-pulse ${strategy.status === 'CRITICAL' ? 'bg-red-500' : strategy.status === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      </div>
                      <h4 className={`text-2xl font-mono font-bold ${strategy.color}`}>{strategy.status}</h4>
                    </div>
                    <p className="text-xs font-medium text-slate-300 leading-relaxed italic">
                      "{strategy.advice}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    )}
    
    {/* Global Market Ticker */}
    <footer className="h-10 bg-slate-950 border-t border-slate-800 flex items-center overflow-hidden absolute bottom-0 w-full z-20">
      <div className="flex-shrink-0 bg-blue-600 h-full px-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-white z-10">
        <span className="animate-pulse">●</span> Global Markets
      </div>
      <div className="flex whitespace-nowrap animate-marquee py-1">
        <TickerItem pair="GBP/USD" rate="1.2645" change="+0.12%" />
        <TickerItem pair="USD/JPY" rate="151.42" change="-0.04%" />
        <TickerItem pair="AUD/USD" rate="0.6512" change="+0.24%" />
        <TickerItem pair="USD/CAD" rate="1.3567" change="-0.11%" />
        <TickerItem pair="EUR/GBP" rate="0.8543" change="+0.05%" />
        <TickerItem pair="NZD/USD" rate="0.5982" change="+0.18%" />
        <TickerItem pair="USD/CHF" rate="0.9012" change="-0.08%" />
        {/* Duplicated for seamless loop */}
        <TickerItem pair="GBP/USD" rate="1.2645" change="+0.12%" />
        <TickerItem pair="USD/JPY" rate="151.42" change="-0.04%" />
        <TickerItem pair="AUD/USD" rate="0.6512" change="+0.24%" />
        <TickerItem pair="USD/CAD" rate="1.3567" change="-0.11%" />
        <TickerItem pair="EUR/GBP" rate="0.8543" change="+0.05%" />
      </div>
    </footer>
  </div>
</div>
  );
}

function TickerItem({ pair, rate, change }: { pair: string; rate: string; change: string }) {
  const isUp = change.startsWith('+');
  return (
    <div className="inline-flex items-center gap-4 px-8 border-r border-slate-800/50">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{pair}</span>
      <span className="text-xs font-mono font-bold text-white tabular-nums">{rate}</span>
      <span className={`text-[10px] font-mono font-bold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
        {change}
      </span>
    </div>
  );
}

function ScenarioButton({ label, value, current, onClick }: { label: string; value: number; current: number; onClick: (v: number) => void }) {
  const isActive = current === value;
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
        isActive 
          ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-900/20 scale-[0.98]' 
          : 'bg-slate-950/50 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
      }`}
    >
      {label}
    </button>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors group ${
        active 
          ? 'bg-blue-500/10 text-blue-400' 
          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
      }`}
    >
      <div className={`${active ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
        {icon}
      </div>
      <span className="hidden md:block text-sm font-medium">{label}</span>
    </button>
  );
}

export default App;
