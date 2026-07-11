import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  Calendar, 
  Download, 
  Check, 
  AlertCircle, 
  Clock, 
  ArrowDownRight, 
  Building,
  CreditCard,
  Percent,
  CheckCircle,
  FileText
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  Legend
} from 'recharts';

// Animated Counter component matching Dashboard design
const AnimatedCounter = ({ value, duration = 1000, prefix = "", suffix = "", decimalPlaces = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    if (isNaN(end)) {
      setCount(value);
      return;
    }
    if (end === 0) return;
    
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const easeProgress = progress * (2 - progress);
      const currentCount = start + easeProgress * (end - start);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value, duration]);

  const formatted = count.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return <span>{prefix}{formatted}{suffix}</span>;
};

// Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-sm font-bold text-[#2B7FFF]">
          ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    );
  }
  return null;
};

const Earning = () => {
  const [timeframe, setTimeframe] = useState('6M');
  const [toasts, setToasts] = useState([]);

  // Toast notifier
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Mock data for charts
  const lineChartData = {
    '30D': [
      { name: 'Week 1', revenue: 950 },
      { name: 'Week 2', revenue: 1100 },
      { name: 'Week 3', revenue: 870 },
      { name: 'Week 4', revenue: 1200 },
    ],
    '6M': [
      { name: 'Feb', revenue: 1800 },
      { name: 'Mar', revenue: 3200 },
      { name: 'Apr', revenue: 4000 },
      { name: 'May', revenue: 3600 },
      { name: 'Jun', revenue: 4800 },
      { name: 'Jul', revenue: 5200 },
    ],
    '12M': [
      { name: 'Jan', revenue: 2400 },
      { name: 'Feb', revenue: 1800 },
      { name: 'Mar', revenue: 3200 },
      { name: 'Apr', revenue: 4000 },
      { name: 'May', revenue: 3600 },
      { name: 'Jun', revenue: 4800 },
      { name: 'Jul', revenue: 5200 },
      { name: 'Aug', revenue: 5500 },
      { name: 'Sep', revenue: 5900 },
      { name: 'Oct', revenue: 6200 },
      { name: 'Nov', revenue: 7000 },
      { name: 'Dec', revenue: 7850 },
    ]
  };

  const monthlyBarData = [
    { name: 'Jan', payouts: 2000 },
    { name: 'Feb', payouts: 1500 },
    { name: 'Mar', payouts: 3000 },
    { name: 'Apr', payouts: 3500 },
    { name: 'May', payouts: 3200 },
    { name: 'Jun', payouts: 4500 },
    { name: 'Jul', payouts: 4900 },
  ];

  const categoryDonutData = [
    { name: 'Garages', value: 6500, color: '#2B7FFF' },
    { name: 'Attics', value: 2400, color: '#8B5CF6' },
    { name: 'Basements', value: 3100, color: '#10B981' },
    { name: 'Closets', value: 480, color: '#F59E0B' },
  ];

  // Payout History Data
  const payoutHistory = [
    { id: 'PAY-8909', date: 'Jul 05, 2026', method: 'Direct Deposit (Bank of America)', status: 'Completed', amount: 3820.00 },
    { id: 'PAY-8908', date: 'Jun 05, 2026', method: 'Direct Deposit (Bank of America)', status: 'Completed', amount: 3250.00 },
    { id: 'PAY-8907', date: 'May 05, 2026', method: 'Direct Deposit (Bank of America)', status: 'Completed', amount: 2800.00 },
    { id: 'PAY-8906', date: 'Apr 05, 2026', method: 'Direct Deposit (Bank of America)', status: 'Completed', amount: 1360.00 },
  ];

  // Animations configuration
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, type: "spring", stiffness: 120, damping: 17 }
    })
  };

  const handleExport = () => {
    triggerToast("Earnings report compiled and downloaded!", "success");
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="h-full overflow-y-auto bg-[#FBFDFE] text-slate-800 font-sans selection:bg-[#2B7FFF]/10 selection:text-[#2B7FFF]"
    >
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* Toast Notifier */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
          <AnimatePresence>
            {toasts.map(toast => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="pointer-events-auto bg-slate-900 border border-slate-800 text-white px-4.5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs md:text-sm font-semibold max-w-sm"
              >
                {toast.type === 'success' ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <AlertCircle className="w-3.5 h-3.5" />
                  </div>
                )}
                <span>{toast.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* HEADER */}
        <motion.header 
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-6"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950">Earnings</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">Track revenue and payouts.</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleExport}
            className="px-4.5 py-2.5 bg-[#2B7FFF] hover:bg-[#1A6EEF] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/10 transition cursor-pointer self-start md:self-auto"
          >
            <Download className="w-4.5 h-4.5 stroke-[2.5]" />
            <span>Export Report</span>
          </motion.button>
        </motion.header>

        {/* STATISTICS */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {/* Total Earnings */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
            className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Earnings</span>
              <div className="p-2 bg-blue-50 rounded-xl text-[#2B7FFF]">
                <DollarSign className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedCounter value={12480} prefix="$" />
              </h3>
              <p className="text-[10px] font-bold text-emerald-500 mt-1 flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +12.5% vs last year
              </p>
            </div>
          </motion.div>

          {/* Monthly Earnings */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
            className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Monthly Earnings</span>
              <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
                <Calendar className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedCounter value={3820} prefix="$" />
              </h3>
              <p className="text-[10px] font-bold text-emerald-500 mt-1 flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +8.2% vs last month
              </p>
            </div>
          </motion.div>

          {/* Pending Payout */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
            className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Payout</span>
              <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
                <Clock className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedCounter value={1250} prefix="$" />
              </h3>
              <p className="text-[10px] font-bold text-amber-500 mt-1 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                </span>
                Payout in progress
              </p>
            </div>
          </motion.div>

          {/* Completed Payouts */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
            className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed Payouts</span>
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-500">
                <CheckCircle className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedCounter value={11230} prefix="$" />
              </h3>
              <p className="text-[10px] font-bold text-slate-400 mt-1">Settled to bank account</p>
            </div>
          </motion.div>
        </motion.div>

        {/* CHARTS CONTAINER - Row 1 (Line Chart & Donut Chart) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Area Chart */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">Revenue Analytics</h2>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Track earnings and booking payouts over time.</p>
              </div>

              {/* Timeframe selector */}
              <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-100">
                {['30D', '6M', '12M'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setTimeframe(f)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                      timeframe === f ? 'bg-white text-[#2B7FFF] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {f === '30D' ? '30 Days' : f === '6M' ? '6 Months' : '12 Months'}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineChartData[timeframe]} margin={{ top: 10, right: 10, left: -22, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2B7FFF" stopOpacity={0.24}/>
                      <stop offset="95%" stopColor="#2B7FFF" stopOpacity={0.00}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} dy={10} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} dx={-10} tickFormatter={(v) => `$${v}`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2B7FFF', strokeWidth: 1, strokeDasharray: '3 3' }} />
                  <Area type="monotone" dataKey="revenue" name="revenue" stroke="#2B7FFF" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" isAnimationActive={true} animationDuration={1000} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Revenue Donut Chart */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between"
          >
            <div>
              <h2 className="text-base font-bold text-slate-900">Revenue Breakdown</h2>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">By category type listings.</p>
            </div>

            <div className="w-full h-44 relative flex items-center justify-center mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDonutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                    isAnimationActive={true}
                    animationDuration={1000}
                  >
                    {categoryDonutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Earnings']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900">$12.4K</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Earnings</span>
              </div>
            </div>

            {/* Labels */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-bold text-slate-600">
              {categoryDonutData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name} ({Math.round((item.value / 12480) * 100)}%)</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CHARTS CONTAINER - Row 2 (Monthly Payout Bar Chart, Top Space & Summary) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Payout Bar Chart */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-2 bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
          >
            <div>
              <h2 className="text-base font-bold text-slate-900">Monthly Payouts</h2>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">Summary of settled bank payout distributions.</p>
            </div>

            <div className="w-full h-64 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyBarData} margin={{ top: 10, right: 10, left: -22, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} dy={10} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} dx={-10} tickFormatter={(v) => `$${v}`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(43, 127, 255, 0.03)' }} />
                  <Bar dataKey="payouts" name="payouts" fill="#2B7FFF" radius={[6, 6, 0, 0]} isAnimationActive={true} animationDuration={1000} maxBarSize={32}>
                    {monthlyBarData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 6 ? '#2B7FFF' : '#E0ECFF'} className="hover:fill-[#2B7FFF] transition-colors duration-200" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Top Performing Space & Revenue Summary */}
          <motion.div 
            variants={cardVariants}
            className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between"
          >
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-4">Earnings Summary</h2>
              
              {/* Performance Indicator */}
              <div className="space-y-4">
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-[#2B7FFF] rounded-xl">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Top Performing Listing</span>
                    <h4 className="text-xs font-bold text-slate-800">Climate-Controlled Garage</h4>
                    <p className="text-[10px] text-emerald-500 font-bold mt-0.5 flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> $1,850 earnings this month
                    </p>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="space-y-3.5 pt-2">
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      <span>Payout Success Rate</span>
                      <span className="text-emerald-500">100%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.2, delay: 0.1 }} className="bg-emerald-500 h-full rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      <span>Target Goal Progress</span>
                      <span className="text-[#2B7FFF]">62%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "62%" }} transition={{ duration: 1.2, delay: 0.2 }} className="bg-[#2B7FFF] h-full rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500 space-y-2">
                  <div className="flex justify-between">
                    <span>Average Payout Cycle</span>
                    <span className="text-slate-800 font-bold">5 Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Payout Fees</span>
                    <span className="text-slate-800 font-bold">$0.00 (Waived)</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition cursor-pointer border border-slate-200/50">
              View payouts report <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </motion.div>
        </div>

        {/* PAYMENT HISTORY TABLE */}
        <motion.div 
          variants={cardVariants}
          className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
        >
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-900">Recent Bank Payouts</h2>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">Historical logs of cleared payout files.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-3 pl-2">Payout ID</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Destination Method</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3 text-right pr-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50/80 text-xs font-semibold text-slate-600">
                {payoutHistory.map((p, idx) => (
                  <motion.tr 
                    key={p.id}
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10px" }}
                    variants={rowVariants}
                    className="hover:bg-slate-50/40 transition-colors duration-150"
                  >
                    <td className="py-4 pl-2 font-bold text-slate-800 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#2B7FFF]" />
                      <span>{p.id}</span>
                    </td>
                    <td className="py-4 text-slate-500 font-medium">{p.date}</td>
                    <td className="py-4 text-slate-700 font-medium">{p.method}</td>
                    <td className="py-4 text-slate-950 font-black">${p.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="py-4 text-right pr-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {p.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Earning;
