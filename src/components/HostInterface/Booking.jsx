import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  User, 
  Building, 
  Check, 
  X, 
  Eye, 
  AlertCircle, 
  SlidersHorizontal, 
  DollarSign, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  XCircle,
  FileText,
  Phone,
  Mail,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

// Custom utility style to hide scrollbar in scrollable sections
const scrollbarHiddenStyle = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

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

const Booking = () => {
  // Mock bookings database
  const [bookings, setBookings] = useState([
    {
      id: "BK-8902",
      guest: "Ava Cooper",
      email: "ava.cooper@example.com",
      phone: "+1 (206) 555-0142",
      space: "Climate-Controlled Garage",
      location: "1420 Pine St, Seattle",
      spaceSize: "150 sq ft",
      dates: "Jul 10, 2026 - Jan 10, 2027",
      duration: "6 Months",
      amount: 1110.00,
      monthlyPrice: 185.00,
      paymentStatus: "Paid",
      paymentMethod: "Card ending in 4242",
      bookingStatus: "Confirmed",
      avatar: "AC",
      avatarColor: "bg-blue-100 text-[#2B7FFF]",
      createdDate: "2026-07-09"
    },
    {
      id: "BK-8901",
      guest: "Liam Patterson",
      email: "liam.p@example.com",
      phone: "+1 (206) 555-0189",
      space: "Climate-Controlled Vault",
      location: "405 Pike St, Seattle",
      spaceSize: "100 sq ft",
      dates: "Jun 15, 2026 - Dec 15, 2026",
      duration: "6 Months",
      amount: 900.00,
      monthlyPrice: 150.00,
      paymentStatus: "Paid",
      paymentMethod: "Direct Deposit (Chase)",
      bookingStatus: "Confirmed",
      avatar: "LP",
      avatarColor: "bg-purple-100 text-purple-600",
      createdDate: "2026-06-12"
    },
    {
      id: "BK-8900",
      guest: "Sophia Martinez",
      email: "sophia.m@example.com",
      phone: "+1 (206) 555-0111",
      space: "Clean Driveway Parking Spot",
      location: "2101 N 34th St, Seattle",
      spaceSize: "200 sq ft",
      dates: "May 01, 2026 - Oct 01, 2026",
      duration: "5 Months",
      amount: 375.00,
      monthlyPrice: 75.00,
      paymentStatus: "Pending",
      paymentMethod: "Card ending in 9876",
      bookingStatus: "Pending",
      avatar: "SM",
      avatarColor: "bg-amber-100 text-amber-600",
      createdDate: "2026-04-28"
    },
    {
      id: "BK-8899",
      guest: "Marcus Miller",
      email: "marcus.miller@example.com",
      phone: "+1 (206) 555-0177",
      space: "Sleek Driveway Area",
      location: "810 5th Ave, Seattle",
      spaceSize: "180 sq ft",
      dates: "Jun 01, 2026 - Jun 30, 2026",
      duration: "1 Month",
      amount: 120.00,
      monthlyPrice: 120.00,
      paymentStatus: "Refunded",
      paymentMethod: "Card ending in 5543",
      bookingStatus: "Cancelled",
      avatar: "MM",
      avatarColor: "bg-slate-100 text-slate-600",
      createdDate: "2026-05-25"
    },
    {
      id: "BK-8898",
      guest: "Emily Watson",
      email: "emily.w@example.com",
      phone: "+1 (206) 555-0155",
      space: "Walk-in Storage Closet",
      location: "Capitol Hill, Seattle",
      spaceSize: "30 sq ft",
      dates: "Aug 01, 2026 - Oct 01, 2026",
      duration: "2 Months",
      amount: 120.00,
      monthlyPrice: 60.00,
      paymentStatus: "Unpaid",
      paymentMethod: "Pending Method Verification",
      bookingStatus: "Pending",
      avatar: "EW",
      avatarColor: "bg-rose-100 text-rose-600",
      createdDate: "2026-07-08"
    },
    {
      id: "BK-8897",
      guest: "Jacob Davis",
      email: "jacob.davis@example.com",
      phone: "+1 (206) 555-0133",
      space: "Suburban Attic Space",
      location: "810 5th Ave, Seattle",
      spaceSize: "80 sq ft",
      dates: "Sep 01, 2026 - Mar 01, 2027",
      duration: "6 Months",
      amount: 720.00,
      monthlyPrice: 120.00,
      paymentStatus: "Paid",
      paymentMethod: "Direct Deposit (Wells Fargo)",
      bookingStatus: "Confirmed",
      avatar: "JD",
      avatarColor: "bg-emerald-100 text-emerald-600",
      createdDate: "2026-07-01"
    }
  ]);

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('Newest');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);

  // Dropdown visibility states
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  // Calculate statistics dynamically
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.bookingStatus === 'Confirmed').length;
  const pendingBookings = bookings.filter(b => b.bookingStatus === 'Pending').length;
  const cancelledBookings = bookings.filter(b => b.bookingStatus === 'Cancelled').length;

  // Custom Toast helper
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Confirm booking action
  const handleConfirmBooking = (id, guestName) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, bookingStatus: "Confirmed", paymentStatus: "Paid" } : b));
    
    // Update active details panel view if open
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking(prev => ({ ...prev, bookingStatus: "Confirmed", paymentStatus: "Paid" }));
    }

    triggerToast(`Booking ${id} confirmed for ${guestName}!`, 'success');
  };

  // Cancel booking action
  const handleCancelBooking = (id, guestName) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, bookingStatus: "Cancelled", paymentStatus: "Refunded" } : b));
    
    // Update active details panel view if open
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking(prev => ({ ...prev, bookingStatus: "Cancelled", paymentStatus: "Refunded" }));
    }

    triggerToast(`Cancelled booking reservation for ${guestName}`, 'info');
  };

  // Open Details Panel
  const handleOpenDetails = (booking) => {
    setSelectedBooking(booking);
    setIsDetailOpen(true);
  };

  // Apply filters and sort
  const filteredBookings = bookings
    .filter(booking => {
      const matchesSearch = booking.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.space.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesStatus = statusFilter === 'All' || booking.bookingStatus === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (dateFilter === 'Newest') {
        return new Date(b.createdDate) - new Date(a.createdDate);
      } else {
        return new Date(a.createdDate) - new Date(b.createdDate);
      }
    });

  // Animation configurations
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const headerVariants = {
    hidden: { y: -25, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const statCardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.15, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -8, 
      scale: 0.95,
      transition: { duration: 0.1, ease: "easeIn" }
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarHiddenStyle }} />

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="h-full overflow-y-auto bg-[#FBFDFE] text-slate-800 font-sans selection:bg-[#2B7FFF]/10 selection:text-[#2B7FFF]"
      >
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 relative">
          
          {/* Custom Notification Toasts */}
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

          {/* 1. HEADER SECTION */}
          <motion.header 
            variants={headerVariants}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-6"
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950">Bookings</h1>
              <p className="text-sm font-medium text-slate-500 mt-1">
                Manage reservations and guests.
              </p>
            </div>
          </motion.header>

          {/* 2. STATISTICS SECTION */}
          <motion.div 
            variants={statsContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {/* Total Bookings */}
            <motion.div 
              variants={statCardVariants}
              whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
              className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Bookings</span>
                <div className="p-2 bg-blue-50 rounded-xl text-[#2B7FFF]">
                  <FileText className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  <AnimatedCounter value={totalBookings} />
                </h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1">Combined booking files</p>
              </div>
            </motion.div>

            {/* Confirmed */}
            <motion.div 
              variants={statCardVariants}
              whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
              className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Confirmed</span>
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-500">
                  <Check className="w-4.5 h-4.5 stroke-[2.5]" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  <AnimatedCounter value={confirmedBookings} />
                </h3>
                <p className="text-[10px] font-bold text-emerald-500 mt-1">Active / reserved leases</p>
              </div>
            </motion.div>

            {/* Pending */}
            <motion.div 
              variants={statCardVariants}
              whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
              className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending</span>
                <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
                  <Clock className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  <AnimatedCounter value={pendingBookings} />
                </h3>
                <p className="text-[10px] font-bold text-amber-500 mt-1 flex items-center gap-1.5">
                  {pendingBookings > 0 && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                    </span>
                  )}
                  Awaiting host approval
                </p>
              </div>
            </motion.div>

            {/* Cancelled */}
            <motion.div 
              variants={statCardVariants}
              whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
              className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cancelled</span>
                <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                  <XCircle className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  <AnimatedCounter value={cancelledBookings} />
                </h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1">Refunded / declined files</p>
              </div>
            </motion.div>
          </motion.div>

          {/* 3. MANAGEMENT CONTROLS SECTION */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-4.5 rounded-[20px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
            
            {/* Search Input with Focus animation */}
            <motion.div 
              animate={{ scale: searchFocused ? 1.01 : 1 }}
              transition={{ duration: 0.2 }}
              className="relative flex-1 max-w-md"
            >
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search guest, space name, or booking ID..."
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2.5 w-full text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>

            {/* Filter Dropdowns & Actions */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Status Select Filter Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setIsStatusDropdownOpen(!isStatusDropdownOpen);
                    setIsDateDropdownOpen(false);
                  }}
                  className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition shadow-sm"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#2B7FFF]" />
                  <span>Status: {statusFilter === 'All' ? 'All Bookings' : statusFilter}</span>
                </button>

                <AnimatePresence>
                  {isStatusDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsStatusDropdownOpen(false)} />
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-1.5 text-xs font-semibold overflow-hidden"
                      >
                        {['All', 'Confirmed', 'Pending', 'Cancelled'].map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              setStatusFilter(status);
                              setIsStatusDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-slate-50 transition cursor-pointer flex items-center justify-between ${
                              statusFilter === status ? 'text-[#2B7FFF] bg-[#2B7FFF]/5 font-bold' : 'text-slate-600'
                            }`}
                          >
                            <span>{status === 'All' ? 'All Statuses' : status}</span>
                            {statusFilter === status && <Check className="w-3.5 h-3.5 text-[#2B7FFF] stroke-[2.5]" />}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Date Ordering Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setIsDateDropdownOpen(!isDateDropdownOpen);
                    setIsStatusDropdownOpen(false);
                  }}
                  className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#2B7FFF]" />
                  <span>Sort: {dateFilter === 'Newest' ? 'Newest First' : 'Oldest First'}</span>
                </button>

                <AnimatePresence>
                  {isDateDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsDateDropdownOpen(false)} />
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-2 w-44 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-1.5 text-xs font-semibold overflow-hidden"
                      >
                        {[
                          { key: 'Newest', label: 'Newest First' },
                          { key: 'Oldest', label: 'Oldest First' }
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => {
                              setDateFilter(item.key);
                              setIsDateDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-slate-50 transition cursor-pointer flex items-center justify-between ${
                              dateFilter === item.key ? 'text-[#2B7FFF] bg-[#2B7FFF]/5 font-bold' : 'text-slate-600'
                            }`}
                          >
                            <span>{item.label}</span>
                            {dateFilter === item.key && <Check className="w-3.5 h-3.5 text-[#2B7FFF] stroke-[2.5]" />}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Reset Filter Button */}
              {(statusFilter !== 'All' || searchQuery !== '') && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setStatusFilter('All');
                    setSearchQuery('');
                  }}
                  className="px-3.5 py-2.5 rounded-xl border border-[#2B7FFF]/20 text-xs font-bold text-[#2B7FFF] hover:bg-[#2B7FFF]/5 transition cursor-pointer"
                >
                  Clear Filters
                </motion.button>
              )}
            </div>
          </div>

          {/* 4. BOOKINGS TABLE (Sticky Header, Scrollable, Hidden Scrollbar) */}
          <div className="bg-white border border-slate-100 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
            <div className="overflow-x-auto no-scrollbar max-h-[calc(100vh-320px)]">
              {filteredBookings.length > 0 ? (
                <table className="w-full text-left border-collapse min-w-[850px]">
                  
                  {/* Sticky Header */}
                  <thead className="sticky top-0 bg-white z-10 border-b border-slate-100">
                    <tr className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                      <th className="py-4 pl-6">Booking ID</th>
                      <th className="py-4">Guest</th>
                      <th className="py-4">Space</th>
                      <th className="py-4">Reservation Dates</th>
                      <th className="py-4">Duration</th>
                      <th className="py-4">Total Amount</th>
                      <th className="py-4">Payment</th>
                      <th className="py-4">Status</th>
                      <th className="py-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>

                  {/* Staggered Rows */}
                  <tbody className="divide-y divide-slate-50 text-xs font-semibold text-slate-600">
                    {filteredBookings.map((bk, index) => (
                      <motion.tr 
                        key={bk.id}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          visible: i => ({
                            opacity: 1, 
                            y: 0, 
                            transition: { delay: i * 0.04, type: "spring", stiffness: 120, damping: 17 }
                          })
                        }}
                        className="hover:bg-slate-50/40 transition-colors duration-150 group cursor-pointer"
                      >
                        {/* Booking ID */}
                        <td className="py-4.5 pl-6 font-extrabold text-slate-800" onClick={() => handleOpenDetails(bk)}>
                          {bk.id}
                        </td>
                        
                        {/* Guest avatar & name */}
                        <td className="py-4.5 flex items-center gap-2.5" onClick={() => handleOpenDetails(bk)}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 shadow-inner ${bk.avatarColor}`}>
                            {bk.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{bk.guest}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{bk.email}</p>
                          </div>
                        </td>

                        {/* Space */}
                        <td className="py-4.5 text-slate-700 font-medium" onClick={() => handleOpenDetails(bk)}>
                          {bk.space}
                        </td>

                        {/* Dates */}
                        <td className="py-4.5 text-slate-500 font-medium" onClick={() => handleOpenDetails(bk)}>
                          {bk.dates}
                        </td>

                        {/* Duration */}
                        <td className="py-4.5 text-slate-500 font-medium" onClick={() => handleOpenDetails(bk)}>
                          {bk.duration}
                        </td>

                        {/* Amount */}
                        <td className="py-4.5 text-slate-800 font-extrabold" onClick={() => handleOpenDetails(bk)}>
                          ${bk.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>

                        {/* Payment Status Badge */}
                        <td className="py-4.5" onClick={() => handleOpenDetails(bk)}>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            bk.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-600' :
                            bk.paymentStatus === 'Pending' ? 'bg-amber-50 text-amber-600' :
                            bk.paymentStatus === 'Refunded' ? 'bg-blue-50 text-[#2B7FFF]' : 'bg-rose-50 text-rose-600'
                          }`}>
                            {bk.paymentStatus}
                          </span>
                        </td>

                        {/* Booking Status Badge */}
                        <td className="py-4.5" onClick={() => handleOpenDetails(bk)}>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                            bk.bookingStatus === 'Confirmed' ? 'bg-emerald-500 text-white' :
                            bk.bookingStatus === 'Pending' ? 'bg-amber-500 text-white' :
                            'bg-slate-300 text-slate-700'
                          }`}>
                            {bk.bookingStatus}
                          </span>
                        </td>

                        {/* Actions buttons */}
                        <td className="py-4.5 pr-6 text-right relative">
                          <div className="flex items-center justify-end gap-1.5">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleOpenDetails(bk)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 cursor-pointer transition"
                              title="View details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </motion.button>
                            {bk.bookingStatus === 'Pending' && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleConfirmBooking(bk.id, bk.guest)}
                                className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 cursor-pointer transition border border-emerald-200/50"
                                title="Approve booking"
                              >
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              </motion.button>
                            )}
                            {bk.bookingStatus !== 'Cancelled' && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCancelBooking(bk.id, bk.guest)}
                                className="p-1.5 rounded-lg hover:border-red-200 hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-200 cursor-pointer transition"
                                title="Cancel booking"
                              >
                                <X className="w-3.5 h-3.5" />
                              </motion.button>
                            )}
                          </div>
                        </td>

                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-24 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">No bookings found</h3>
                  <p className="text-xs text-slate-400 font-semibold max-w-sm px-6">No reservations match your current search queries or filters. Try adjusting your parameters.</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* 5. BOOKING DETAIL PANEL (Slide-in Right Drawer overlay) */}
        <AnimatePresence>
          {isDetailOpen && selectedBooking && (
            <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDetailOpen(false)}
                className="fixed inset-0 bg-black backdrop-blur-xs cursor-pointer"
              />

              {/* Panel Container */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-slate-100 z-10"
              >
                {/* Header details */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#2B7FFF] font-extrabold">Reservation File</span>
                    <h3 className="text-lg font-black text-slate-900 mt-0.5">{selectedBooking.id}</h3>
                  </div>
                  <button
                    onClick={() => setIsDetailOpen(false)}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Details Contents Scrollable */}
                <div className="p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar">
                  
                  {/* Guest Information Section */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Guest Profile</h4>
                    <div className="flex items-center gap-3 bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100/50">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-inner ${selectedBooking.avatarColor}`}>
                        {selectedBooking.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-slate-900">{selectedBooking.guest}</p>
                        <p className="text-xs text-slate-400 font-semibold">Registered Customer</p>
                      </div>
                    </div>

                    <div className="space-y-2.5 pl-1.5 text-xs text-slate-600 font-semibold pt-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span>{selectedBooking.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>{selectedBooking.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Space Information Section */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Leased Space Specs</h4>
                    <div className="space-y-2 pl-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        <Building className="w-4.5 h-4.5 text-[#2B7FFF]" />
                        <span>{selectedBooking.space}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pl-6.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{selectedBooking.location}</span>
                      </div>
                      <div className="text-[11px] font-bold text-slate-400 pl-6.5 mt-0.5 uppercase tracking-wide">
                        Dimensions: {selectedBooking.spaceSize}
                      </div>
                    </div>
                  </div>

                  {/* Booking Dates Details */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Reservation Details</h4>
                    <div className="space-y-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-400">Lease Dates:</span>
                        <span className="text-slate-900 font-bold">{selectedBooking.dates}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-400">Total Duration:</span>
                        <span className="text-slate-900 font-bold">{selectedBooking.duration}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-400">Monthly Billing Rate:</span>
                        <span className="text-[#2B7FFF] font-extrabold">${selectedBooking.monthlyPrice}/mo</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details Section */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Payment & Invoicing</h4>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-500">Invoice Status</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                          selectedBooking.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-600' :
                          selectedBooking.paymentStatus === 'Pending' ? 'bg-amber-100 text-amber-600' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {selectedBooking.paymentStatus}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs font-semibold border-b border-slate-100 pb-2.5">
                        <span className="text-slate-500">Method</span>
                        <span className="text-slate-700 font-bold">{selectedBooking.paymentMethod}</span>
                      </div>

                      <div className="flex justify-between items-center pt-0.5">
                        <span className="text-xs font-bold text-slate-800">Total Contract Value</span>
                        <span className="text-base font-black text-[#2B7FFF]">${selectedBooking.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Actions Row */}
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-2">
                  <div className="flex gap-3">
                    {/* If Pending: Approve booking button */}
                    {selectedBooking.bookingStatus === 'Pending' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleConfirmBooking(selectedBooking.id, selectedBooking.guest)}
                        className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-4.5 h-4.5 stroke-[2.5]" />
                        <span>Confirm Reservation</span>
                      </motion.button>
                    )}
                    
                    {/* If Cancelled: restore button */}
                    {selectedBooking.bookingStatus === 'Cancelled' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setBookings(prev => prev.map(b => b.id === selectedBooking.id ? { ...b, bookingStatus: "Confirmed", paymentStatus: "Paid" } : b));
                          setSelectedBooking(prev => ({ ...prev, bookingStatus: "Confirmed", paymentStatus: "Paid" }));
                          triggerToast(`Booking ${selectedBooking.id} restored`, 'success');
                        }}
                        className="flex-1 py-2.5 bg-[#2B7FFF] hover:bg-[#1A6EEF] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 cursor-pointer"
                      >
                        Restore Reservation
                      </motion.button>
                    )}

                    {/* Cancel button */}
                    {selectedBooking.bookingStatus !== 'Cancelled' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCancelBooking(selectedBooking.id, selectedBooking.guest)}
                        className="flex-1 py-2.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-xl text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel Booking</span>
                      </motion.button>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setIsDetailOpen(false)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer shadow-sm text-center"
                  >
                    Done
                  </motion.button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </motion.div>
    </>
  );
};

export default Booking;
