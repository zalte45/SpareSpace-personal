import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Clock, 
  Building, 
  Plus, 
  Calendar, 
  ChevronRight, 
  Check, 
  X, 
  Star, 
  MapPin, 
  ArrowUpRight, 
  ArrowDownRight,
  Bell, 
  Search,
  Activity,
  AlertCircle
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
  Cell 
} from 'recharts';

// Animated Counter Component using requestAnimationFrame for smooth numeric transitions
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
      
      // Easing out quadratic
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

// Custom Tooltip for Recharts that matches premium theme
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-sm font-bold text-[#2B7FFF]">
          {payload[0].name === 'revenue' 
            ? `$${payload[0].value.toLocaleString()}` 
            : `${payload[0].value} bookings`}
        </p>
      </div>
    );
  }
  return null;
};

const DashBoard = ({ActivePage,setActivePage }) => {
  // Page states
  const [activeSpacesCount, setActiveSpacesCount] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chartFilter, setChartFilter] = useState('6M');
  const [toasts, setToasts] = useState([]);
  
  // New Space Form State
  const [newSpace, setNewSpace] = useState({
    title: '',
    location: '',
    type: 'Garage',
    price: '',
    size: ''
  });

  // Pending Requests State (with interactive remove effect)
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, name: "Sophia Martinez", space: "Downtown Space B", duration: "3 months", price: "$220/mo", initials: "SM", color: "bg-blue-100 text-[#2B7FFF]" },
    { id: 2, name: "Liam Patterson", space: "Climate Controlled Vault", duration: "6 months", price: "$150/mo", initials: "LP", color: "bg-purple-100 text-purple-600" },
    { id: 3, name: "Ava Cooper", space: "Suburban Basement Area", duration: "12 months", price: "$320/mo", initials: "AC", color: "bg-emerald-100 text-emerald-600" }
  ]);

  // Timeline Activity State
  const [activities, setActivities] = useState([
    { id: 1, type: 'booking', title: 'Booking request from Ava Cooper', time: '10 mins ago', desc: 'Space: Suburban Basement Area', color: 'bg-amber-500' },
    { id: 2, type: 'payment', title: 'Payout of $1,250 processed', time: '2 hours ago', desc: 'Direct Deposit: Bank of America', color: 'bg-emerald-500' },
    { id: 3, type: 'review', title: '5.0 Star review from John D.', time: '1 day ago', desc: '"Cleanest garage space I have ever used!"', color: 'bg-blue-500' },
    { id: 4, type: 'listing', title: 'Space "Cozy Basement" listed', time: '3 days ago', desc: 'Size: 150 sq ft · Rate: $140/mo', color: 'bg-purple-500' }
  ]);

  // Recent Transactions State
  const [transactions, setTransactions] = useState([
    { id: 'TX-1002', name: 'Ava Cooper', space: 'Climate-Controlled Attic', date: 'Jul 10, 2026', amount: '$150.00', status: 'Completed', avatar: 'AC', color: 'bg-emerald-100 text-emerald-600' },
    { id: 'TX-1001', name: 'Liam Patterson', space: 'Downtown Parking Lot', date: 'Jul 08, 2026', amount: '$85.00', status: 'Completed', avatar: 'LP', color: 'bg-emerald-100 text-emerald-600' },
    { id: 'TX-1000', name: 'Sophia Martinez', space: 'Suburban Clean Basement', date: 'Jul 05, 2026', amount: '$320.00', status: 'Pending', avatar: 'SM', color: 'bg-amber-100 text-amber-600' },
    { id: 'TX-0999', name: 'Marcus Miller', space: 'Sleek Driveway Area', date: 'Jun 28, 2026', amount: '$120.00', status: 'Refunded', avatar: 'MM', color: 'bg-slate-100 text-slate-600' },
  ]);

  // Chart Data Configurations
  const data30Days = [
    { name: 'Week 1', revenue: 950 },
    { name: 'Week 2', revenue: 1100 },
    { name: 'Week 3', revenue: 870 },
    { name: 'Week 4', revenue: 1200 },
  ];

  const data6Months = [
    { name: 'Feb', revenue: 1800 },
    { name: 'Mar', revenue: 3200 },
    { name: 'Apr', revenue: 4000 },
    { name: 'May', revenue: 3600 },
    { name: 'Jun', revenue: 4800 },
    { name: 'Jul', revenue: 5200 },
  ];

  const data12Months = [
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
  ];

  const weeklyBookingData = [
    { name: 'Mon', bookings: 3 },
    { name: 'Tue', bookings: 5 },
    { name: 'Wed', bookings: 2 },
    { name: 'Thu', bookings: 8 },
    { name: 'Fri', bookings: 6 },
    { name: 'Sat', bookings: 10 },
    { name: 'Sun', bookings: 7 },
  ];

  // Current Date formatting
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Action triggered when approving/declining a request
  const handleRequestAction = (id, renterName, actionType) => {
    setPendingRequests(prev => prev.filter(r => r.id !== id));
    
    // Add to activity timeline
    const newAct = {
      id: Date.now(),
      type: actionType === 'approve' ? 'payment' : 'review',
      title: `Request from ${renterName} ${actionType === 'approve' ? 'approved' : 'declined'}`,
      time: 'Just now',
      desc: actionType === 'approve' ? 'Lease agreement sent to renter' : 'Renter notified of declination',
      color: actionType === 'approve' ? 'bg-emerald-500' : 'bg-rose-500'
    };
    setActivities(prev => [newAct, ...prev]);

    // Show custom toast notification
    triggerToast(
      actionType === 'approve' 
        ? `Approved booking request from ${renterName}`
        : `Declined booking request from ${renterName}`,
      actionType === 'approve' ? 'success' : 'info'
    );
  };

  // Toast handler helper
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Filter lists based on Search input query
  const filteredTransactions = transactions.filter(tx => 
    tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.space.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredActivities = activities.filter(act => 
    act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    act.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Framer Motion Animation Variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const headerVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 120, damping: 15 } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 110, damping: 16 } 
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
        
        {/* Floating Custom Toast Messages */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
          <AnimatePresence>
            {toasts.map(toast => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="pointer-events-auto bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs md:text-sm font-semibold max-w-sm"
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

        {/* 1. HEADER SECTION */}
        <motion.header 
          variants={headerVariants}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-6"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950">Dashboard Overview</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Welcome back! Here's an overview of your storage business.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transactions, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-48 md:w-60 text-xs rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Date Badge */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
              <Calendar className="w-4 h-4 text-[#2B7FFF]" />
              <span>{currentDate}</span>
            </div>

            {/* Notification Badge */}
            <div className="relative p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
              <Bell className="w-4.5 h-4.5 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2B7FFF] ring-2 ring-white animate-pulse" />
            </div>

            {/* Add New Space Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActivePage("ListSpace")}
              className="px-4.5 py-2.5 bg-[#2B7FFF] hover:bg-[#1A6EEF] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/10 transition duration-150 cursor-pointer"
            >
              <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>Add New Space</span>
            </motion.button>
          </div>
        </motion.header>

        {/* 2. STATISTICS CARDS SECTION */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {/* Card 1: Total Earnings */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.04)" }}
            className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Earnings</span>
              <div className="p-2 bg-blue-50 rounded-xl text-[#2B7FFF]">
                <DollarSign className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedCounter value={12480} prefix="$" />
              </h3>
              <p className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> +12.5% vs last month
              </p>
            </div>
            {/* Sparkline integration */}
            <div className="h-8.75 mt-4 overflow-hidden -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { v: 1000 }, { v: 1400 }, { v: 1200 }, { v: 1900 }, 
                  { v: 2400 }, { v: 2200 }, { v: 2800 }, { v: 3400 }, { v: 3820 }
                ]} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="spark1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2B7FFF" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#2B7FFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#2B7FFF" strokeWidth={1.8} fillOpacity={1} fill="url(#spark1)" isAnimationActive={true} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Card 2: Active Spaces */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.04)" }}
            className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Spaces</span>
              <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
                <Building className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedCounter value={activeSpacesCount} />
              </h3>
              <p className="text-[10px] font-bold text-purple-500 mt-1">
                2 listed · {activeSpacesCount - 2} occupied
              </p>
            </div>
            {/* Visual breakdown segments */}
            <div className="flex gap-1.5 h-1.5 w-full mt-6 rounded-full overflow-hidden bg-slate-100">
              <div className="bg-[#2B7FFF] rounded-full" style={{ width: `${(2 / activeSpacesCount) * 100}%` }} />
              <div className="bg-emerald-500 rounded-full" style={{ width: `${((activeSpacesCount - 2) / activeSpacesCount) * 100}%` }} />
            </div>
          </motion.div>

          {/* Card 3: Occupancy */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.04)" }}
            className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Occupancy</span>
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                <Users className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedCounter value={85} suffix="%" />
              </h3>
              <p className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> +5.3% vs last month
              </p>
            </div>
            {/* Animated Progress Bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="bg-emerald-500 h-full rounded-full"
              />
            </div>
          </motion.div>

          {/* Card 4: Monthly Revenue */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.04)" }}
            className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Monthly Revenue</span>
              <div className="p-2 bg-rose-50 rounded-xl text-rose-500">
                <Activity className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedCounter value={3820} prefix="$" />
              </h3>
              <p className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 mt-1">
                <TrendingUp className="w-3.5 h-3.5" /> +8.2% vs last month
              </p>
            </div>
            {/* Sparkline Area chart */}
            <div className="h-8.75 mt-4 overflow-hidden -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { v: 1200 }, { v: 1100 }, { v: 1500 }, { v: 1800 }, 
                  { v: 2200 }, { v: 2900 }, { v: 3400 }, { v: 3200 }, { v: 3820 }
                ]} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="spark2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E11D48" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#E11D48" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#E11D48" strokeWidth={1.8} fillOpacity={1} fill="url(#spark2)" isAnimationActive={true} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Card 5: Pending Requests */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.04)" }}
            className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Requests</span>
              <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
                <Clock className="w-4.5 h-4.5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedCounter value={pendingRequests.length} />
              </h3>
              <p className="text-[10px] font-bold text-amber-500 mt-1 flex items-center gap-1.5">
                {pendingRequests.length > 0 ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    Requires approval
                  </>
                ) : (
                  "All caught up!"
                )}
              </p>
            </div>
            {/* Visual alert message block */}
            <div className={`mt-5 px-3 py-2 rounded-xl text-[10px] font-bold flex items-center justify-between ${
              pendingRequests.length > 0 ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'
            }`}>
              <span>Status</span>
              <span>{pendingRequests.length > 0 ? 'Pending Action' : 'Fully Cleared'}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* 3. CHARTS ROW - Large Revenue Line Chart & Weekly Booking Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Analytics Line Chart (2/3 width) */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-2 bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">Revenue Analytics</h2>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Track earnings and booking payouts over time.</p>
              </div>

              {/* Chart Filters */}
              <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-100 self-start sm:self-auto">
                {['30D', '6M', '12M'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setChartFilter(filter)}
                    className={`relative px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                      chartFilter === filter 
                        ? 'bg-white text-[#2B7FFF] shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {filter === '30D' ? '30 Days' : filter === '6M' ? '6 Months' : '12 Months'}
                  </button>
                ))}
              </div>
            </div>

            {/* Line/Area Chart */}
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={
                    chartFilter === '30D' ? data30Days :
                    chartFilter === '6M' ? data6Months : data12Months
                  } 
                  margin={{ top: 10, right: 10, left: -22, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2B7FFF" stopOpacity={0.24}/>
                      <stop offset="95%" stopColor="#2B7FFF" stopOpacity={0.00}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="name" 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }}
                    dx={-10}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2B7FFF', strokeWidth: 1, strokeDasharray: '3 3' }} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    name="revenue"
                    stroke="#2B7FFF" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    isAnimationActive={true}
                    animationDuration={1100}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Weekly Booking Bar Chart (1/3 width) */}
          <motion.div 
            variants={cardVariants}
            className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
          >
            <div>
              <h2 className="text-base font-bold text-slate-900">Weekly Bookings</h2>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">Booking request volumes for this week.</p>
            </div>

            <div className="w-full h-80 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyBookingData} margin={{ top: 10, right: 10, left: -22, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="name" 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }}
                    dx={-10}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(43, 127, 255, 0.03)' }} />
                  <Bar 
                    dataKey="bookings" 
                    name="bookings"
                    fill="#E0ECFF" 
                    radius={[6, 6, 0, 0]}
                    isAnimationActive={true}
                    animationDuration={1100}
                    maxBarSize={28}
                  >
                    {weeklyBookingData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 5 ? '#2B7FFF' : '#E0ECFF'} 
                        className="hover:fill-[#2B7FFF] transition-colors duration-200"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* 4. DETAILS ROW - Top Performing Space, Pending Requests, Occupancy Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Top Performing Space */}
          <motion.div 
            variants={cardVariants}
            className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between"
          >
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-1">Top Performing Space</h2>
              <p className="text-xs font-semibold text-slate-400 mb-4">Highest revenue space in your catalog.</p>
              
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden h-40 group cursor-pointer">
                  <img 
                    src="/garage.jpg" 
                    alt="Top performing garage storage space" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-800">4.9</span>
                    <span className="text-[10px] text-slate-400 font-semibold">(124 reviews)</span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                    <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                      98% Occupancy
                    </span>
                    <span className="bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                      Top Earned
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-base font-bold text-slate-900">Climate-Controlled Garage Storage</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#2B7FFF]" /> 1420 Pine St, Seattle Metro Area
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 py-3.5 mt-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Monthly Earnings</span>
                    <p className="text-base font-extrabold text-slate-800 mt-0.5">
                      <AnimatedCounter value={1850} prefix="$" />
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Bookings</span>
                    <p className="text-base font-extrabold text-slate-800 mt-0.5">
                      <AnimatedCounter value={42} /> active
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <span>Manage Space</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </motion.button>
          </motion.div>

          {/* Pending Requests Card */}
          <motion.div 
            variants={cardVariants}
            className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between"
          >
            <div className="w-full">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-bold text-slate-900">Pending Requests</h2>
                {pendingRequests.length > 0 && (
                  <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md text-[10px] font-bold">
                    {pendingRequests.length} pending
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-slate-400 mb-4">Review and accept booking requests for spaces.</p>

              <div className="space-y-3 max-h-75 overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {pendingRequests.length > 0 ? (
                    pendingRequests.map((req) => (
                      <motion.div
                        key={req.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40, height: 0, padding: 0, marginBottom: 0, overflow: 'hidden' }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100/60 p-3.5 rounded-2xl flex flex-col justify-between gap-3 transition"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-inner ${req.color}`}>
                            {req.initials}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">{req.name}</p>
                            <p className="text-[10px] font-semibold text-slate-500 mt-0.5">{req.space}</p>
                            <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
                              <span>{req.duration}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300" />
                              <span className="font-bold text-[#2B7FFF]">{req.price}</span>
                            </p>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center justify-end gap-2.5 pt-1 border-t border-slate-100/40">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleRequestAction(req.id, req.name, 'decline')}
                            className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                          >
                            Decline
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleRequestAction(req.id, req.name, 'approve')}
                            className="px-3.5 py-1.5 rounded-lg text-[10px] font-bold bg-[#2B7FFF] hover:bg-[#1A6EEF] text-white shadow-sm transition cursor-pointer"
                          >
                            Approve Lease
                          </motion.button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-12 flex flex-col items-center justify-center text-center space-y-2"
                    >
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                        <Check className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-800">All caught up!</h4>
                      <p className="text-[10px] text-slate-400 font-semibold px-6">You have responded to all pending lease request forms.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button className="w-full mt-4 py-2 text-xs font-bold text-[#2B7FFF] hover:text-[#1A6EEF] flex items-center justify-center gap-1 transition cursor-pointer">
              <span>View all lease history</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Occupancy Breakdown Progress */}
          <motion.div 
            variants={cardVariants}
            className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between"
          >
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-1">Occupancy Breakdown</h2>
              <p className="text-xs font-semibold text-slate-400 mb-2">Detailed storage volume distribution.</p>
              
              <div className="flex flex-col items-center justify-center py-2">
                {/* SVG Progress Ring */}
                <div className="relative flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="48"
                      className="text-slate-100"
                      strokeWidth={9}
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="48"
                      className="text-[#2B7FFF]"
                      strokeWidth={9}
                      strokeDasharray={2 * Math.PI * 48}
                      initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 48 - (2 * Math.PI * 48 * 85) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-extrabold text-slate-900">
                      <AnimatedCounter value={85} suffix="%" />
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Occupied</span>
                  </div>
                </div>
                
                <div className="w-full mt-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2B7FFF]" />
                      <span>Occupied Volume</span>
                    </div>
                    <span className="font-bold text-slate-950">1,062.5 sq ft</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                      <span>Available Space</span>
                    </div>
                    <span className="font-bold text-slate-950">187.5 sq ft</span>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>Total Managed Capacity</span>
                    <span className="text-slate-950 font-extrabold">1,250 sq ft</span>
                  </div>
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition cursor-pointer border border-slate-200/50"
            >
              <span>Capacity Report</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </motion.button>
          </motion.div>
        </div>

        {/* 5. RECENT TRANSACTIONS TABLE & RECENT ACTIVITY TIMELINE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Transactions Table (2/3 width) */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-2 bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Recent Transactions</h2>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Latest booking payments registered.</p>
              </div>
              {searchQuery && (
                <span className="bg-blue-50 text-[#2B7FFF] px-2 py-0.5 rounded-md text-[10px] font-bold">
                  Found {filteredTransactions.length} items
                </span>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {filteredTransactions.length > 0 ? (
                <table className="w-full text-left border-collapse min-w-125">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      <th className="pb-3 pl-2">Renter</th>
                      <th className="pb-3">Space Title</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3 text-right pr-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50/80 text-xs font-semibold text-slate-600">
                    {filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/40 transition-colors duration-150 group">
                        <td className="py-3.5 pl-2 flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${tx.color}`}>
                            {tx.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{tx.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{tx.id}</p>
                          </div>
                        </td>
                        <td className="py-3.5 text-slate-700 font-medium">{tx.space}</td>
                        <td className="py-3.5 text-slate-500 font-medium">{tx.date}</td>
                        <td className="py-3.5 text-slate-800 font-bold">{tx.amount}</td>
                        <td className="py-3.5 text-right pr-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                            tx.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center">
                    <Search className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">No matching transactions</h4>
                  <p className="text-[10px] text-slate-400 font-semibold px-6">Try refining your search query term.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Activity Timeline (1/3 width) */}
          <motion.div 
            variants={cardVariants}
            className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
          >
            <div className="mb-6">
              <h2 className="text-base font-bold text-slate-900">Recent Activity</h2>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">Live feed of storage business events.</p>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <AnimatePresence initial={false}>
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((act) => (
                    <motion.div
                      key={act.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="relative"
                    >
                      {/* Circle indicator */}
                      <span className={`absolute left-[-23.5px] top-1.5 w-3.5 h-3.5 rounded-full border-[3px] border-white shadow-sm ${act.color}`} />
                      
                      <div className="space-y-0.5">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-800">{act.title}</p>
                          <span className="text-[9px] text-slate-400 font-semibold shrink-0 ml-2">{act.time}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold">{act.desc}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center">
                      <Search className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-800">No matching activities</h4>
                    <p className="text-[10px] text-slate-400 font-semibold px-6">Try refining your search query term.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>

     

    </motion.div>
  );
};

export default DashBoard;
