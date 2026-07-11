import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Check, 
  AlertCircle, 
  Star, 
  Building, 
  Users, 
  FileText, 
  ArrowUpRight, 
  Calendar,
  Percent,
  ChevronRight,
  Zap,
  Award
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
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
        {payload.map((p, idx) => (
          <p key={idx} className="text-xs font-bold" style={{ color: p.color || p.stroke || '#2B7FFF' }}>
            {p.name === 'revenue' ? `Revenue: $${p.value.toLocaleString()}` : 
             p.name === 'bookings' ? `Bookings: ${p.value}` : `${p.name}: ${p.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const [yearFilter, setYearFilter] = useState('2026');
  const [toasts, setToasts] = useState([]);

  // Toast notifier
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Mock data for yearly statistics
  const dataMap = {
    '2026': {
      revenue: 12480,
      bookings: 42,
      occupancy: 85,
      rating: 4.8,
      lineChart: [
        { name: 'Jan', revenue: 2400, bookings: 8 },
        { name: 'Feb', revenue: 1800, bookings: 6 },
        { name: 'Mar', revenue: 3200, bookings: 11 },
        { name: 'Apr', revenue: 4000, bookings: 14 },
        { name: 'May', revenue: 3600, bookings: 12 },
        { name: 'Jun', revenue: 4800, bookings: 18 },
        { name: 'Jul', revenue: 5200, bookings: 20 },
      ],
      donutChart: [
        { name: 'Garage', value: 6500, color: '#2B7FFF' },
        { name: 'Basement', value: 3100, color: '#10B981' },
        { name: 'Attic', value: 2400, color: '#8B5CF6' },
        { name: 'Closet', value: 480, color: '#F59E0B' },
      ],
      comparisonData: [
        { name: 'Feb', '2026': 1800, '2025': 1200 },
        { name: 'Mar', '2026': 3200, '2025': 2000 },
        { name: 'Apr', '2026': 4000, '2025': 2500 },
        { name: 'May', '2026': 3600, '2025': 2200 },
        { name: 'Jun', '2026': 4800, '2025': 3100 },
        { name: 'Jul', '2026': 5200, '2025': 3300 },
      ]
    },
    '2025': {
      revenue: 8940,
      bookings: 31,
      occupancy: 72,
      rating: 4.6,
      lineChart: [
        { name: 'Jan', revenue: 1500, bookings: 5 },
        { name: 'Feb', revenue: 1200, bookings: 4 },
        { name: 'Mar', revenue: 2000, bookings: 7 },
        { name: 'Apr', revenue: 2500, bookings: 9 },
        { name: 'May', revenue: 2200, bookings: 8 },
        { name: 'Jun', revenue: 3100, bookings: 11 },
        { name: 'Jul', revenue: 3300, bookings: 12 },
      ],
      donutChart: [
        { name: 'Garage', value: 4500, color: '#2B7FFF' },
        { name: 'Basement', value: 2100, color: '#10B981' },
        { name: 'Attic', value: 1800, color: '#8B5CF6' },
        { name: 'Closet', value: 540, color: '#F59E0B' },
      ],
      comparisonData: [
        { name: 'Feb', '2026': 1800, '2025': 1200 },
        { name: 'Mar', '2026': 3200, '2025': 2000 },
        { name: 'Apr', '2026': 4000, '2025': 2500 },
        { name: 'May', '2026': 3600, '2025': 2200 },
        { name: 'Jun', '2026': 4800, '2025': 3100 },
        { name: 'Jul', '2026': 5200, '2025': 3300 },
      ]
    }
  };

  const activeData = dataMap[yearFilter];

  const handleExport = () => {
    triggerToast("Business analytics report compiled and downloaded!", "success");
  };

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
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950">Analytics</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">Business insights.</p>
          </div>
          
          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Year selector */}
            <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-100">
              {['2026', '2025'].map((y) => (
                <button
                  key={y}
                  onClick={() => setYearFilter(y)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                    yearFilter === y ? 'bg-white text-[#2B7FFF] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleExport}
              className="px-4.5 py-2.5 bg-[#2B7FFF] hover:bg-[#1A6EEF] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/10 transition cursor-pointer"
            >
              <Download className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>Export Analytics</span>
            </motion.button>
          </div>
        </motion.header>

        {/* STATISTICS */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {/* Revenue */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
            className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Revenue</span>
              <div className="p-2 bg-blue-50 rounded-xl text-[#2B7FFF]">
                <TrendingUp className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedCounter value={activeData.revenue} prefix="$" />
              </h3>
              <p className="text-[10px] font-bold text-emerald-500 mt-1 flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +15.2% vs baseline
              </p>
            </div>
          </motion.div>

          {/* Bookings */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
            className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Bookings</span>
              <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
                <FileText className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedCounter value={activeData.bookings} />
              </h3>
              <p className="text-[10px] font-bold text-purple-500 mt-1">Total lease agreements</p>
            </div>
          </motion.div>

          {/* Occupancy */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
            className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Occupancy</span>
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-500">
                <Users className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedCounter value={activeData.occupancy} suffix="%" />
              </h3>
              <p className="text-[10px] font-bold text-emerald-500 mt-1 flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> Optimal threshold
              </p>
            </div>
          </motion.div>

          {/* Customer Rating */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
            className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Customer Rating</span>
              <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
                <Star className="w-4.5 h-4.5 fill-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedCounter value={activeData.rating} decimalPlaces={1} />
              </h3>
              <p className="text-[10px] font-bold text-amber-500 mt-1">Excellent guest satisfaction</p>
            </div>
          </motion.div>
        </motion.div>

        {/* CHARTS ROWS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large Line/Area Chart */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-2 bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
          >
            <div>
              <h2 className="text-base font-bold text-slate-900">Revenue & Booking Trends</h2>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">Monthly trajectory of business performance indicators.</p>
            </div>

            <div className="w-full h-80 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeData.lineChart} margin={{ top: 10, right: 10, left: -22, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2B7FFF" stopOpacity={0.24}/>
                      <stop offset="95%" stopColor="#2B7FFF" stopOpacity={0.00}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} dy={10} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} dx={-10} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2B7FFF', strokeWidth: 1 }} />
                  <Area type="monotone" dataKey="revenue" name="revenue" stroke="#2B7FFF" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue2)" isAnimationActive={true} animationDuration={1000} />
                  <Line type="monotone" dataKey="bookings" name="bookings" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} isAnimationActive={true} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Donut Chart (Space Distributions) */}
          <motion.div 
            variants={cardVariants}
            className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between"
          >
            <div>
              <h2 className="text-base font-bold text-slate-900">Space Type Breakdown</h2>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">Asset distribution inside your current listings portfolio.</p>
            </div>

            <div className="w-full h-48 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activeData.donutChart}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                    isAnimationActive={true}
                    animationDuration={1000}
                  >
                    {activeData.donutChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue Share']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900">{yearFilter}</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Listings Portfolio</span>
              </div>
            </div>

            {/* Labels */}
            <div className="space-y-2 mt-4 text-xs font-bold text-slate-600">
              {activeData.donutChart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-slate-800">${item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* COMPARISON AND TOP PERFORMING SPACES ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Growth Year-over-Year Area Chart */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-2 bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
          >
            <div>
              <h2 className="text-base font-bold text-slate-900">Growth Comparison</h2>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">Year-over-year revenue comparison trend.</p>
            </div>

            <div className="w-full h-64 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeData.comparisonData} margin={{ top: 10, right: 10, left: -22, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} dy={10} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} dx={-10} tickFormatter={(v) => `$${v}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 600, paddingTop: 10 }} />
                  <Line type="monotone" dataKey="2026" stroke="#2B7FFF" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} isAnimationActive={true} />
                  <Line type="monotone" dataKey="2025" stroke="#E2E8F0" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} isAnimationActive={true} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Top Performing Spaces */}
          <motion.div 
            variants={cardVariants}
            className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between"
          >
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-4">Top Performing Spaces</h2>
              
              <div className="space-y-4">
                
                {/* Space 1 */}
                <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-[#2B7FFF] rounded-xl shrink-0">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Climate-Controlled Garage</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Seattle Metro Area</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-extrabold text-slate-900">$6,500</p>
                    <span className="text-[9px] text-emerald-500 font-bold block mt-0.5">52% Share</span>
                  </div>
                </div>

                {/* Space 2 */}
                <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Secure Basement Locker</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Downtown Seattle</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-extrabold text-slate-900">$3,100</p>
                    <span className="text-[9px] text-[#2B7FFF] font-bold block mt-0.5">25% Share</span>
                  </div>
                </div>

                {/* Space 3 */}
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Suburban Attic Space</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Eastside Seattle</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-extrabold text-slate-900">$2,400</p>
                    <span className="text-[9px] text-[#8B5CF6] font-bold block mt-0.5">19% Share</span>
                  </div>
                </div>

                {/* Progress Occupancy */}
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-2 mt-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#2B7FFF]" />
                      <span>Overall Portfolio Yield</span>
                    </div>
                    <span className="text-[#2B7FFF] font-black">94.8%</span>
                  </div>
                  <div className="w-full bg-slate-200/50 h-1 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "94.8%" }} transition={{ duration: 1.2 }} className="bg-[#2B7FFF] h-full rounded-full" />
                  </div>
                </div>

              </div>
            </div>

            <button className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition cursor-pointer">
              <span>View full catalog</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

export default Analytics;
