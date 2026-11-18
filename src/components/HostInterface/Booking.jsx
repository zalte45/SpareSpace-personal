import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchHostBookings,
  fetchHostBookingById,
  cancelBooking,
  completeBooking,
  clearSelectedHostBooking,
} from '../../redux/features/Booking/bookingSlice';
import {
  Search,
  Calendar,
  Building,
  Check,
  X,
  Eye,
  AlertCircle,
  SlidersHorizontal,
  FileText,
  Mail,
  Clock,
  XCircle,
  MapPin,
  Loader2,
  CheckCircle2,
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
    const start = 0;
    const end = parseFloat(value);
    if (isNaN(end) || end === 0) {
      const frame = requestAnimationFrame(() => setCount(isNaN(end) ? value : 0));
      return () => cancelAnimationFrame(frame);
    }

    const startTime = performance.now();
    let rafId;

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const easeProgress = progress * (2 - progress);
      const currentCount = start + easeProgress * (end - start);
      setCount(currentCount);

      if (progress < 1) {
        rafId = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    rafId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(rafId);
  }, [value, duration]);

  const formatted = Number(count || 0).toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return <span>{prefix}{formatted}{suffix}</span>;
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const AVATAR_COLORS = [
  'bg-blue-100 text-[#2B7FFF]',
  'bg-purple-100 text-purple-600',
  'bg-amber-100 text-amber-600',
  'bg-emerald-100 text-emerald-600',
  'bg-rose-100 text-rose-600',
];

const mapBookingForView = (b, index = 0) => {
  const renter = b.renter || {};
  const listing = b.listing || {};
  const guestName = renter.username || 'Guest User';
  const initials = guestName
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'GU';

  const statusRaw = (b.bookingStatus || 'confirmed').toLowerCase();
  const statusLabel = statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1);

  const payRaw = (b.paymentStatus || 'pending').toLowerCase();
  const payLabel =
    payRaw === 'successful'
      ? 'Paid'
      : payRaw.charAt(0).toUpperCase() + payRaw.slice(1);

  const locationParts = [listing.street, listing.city, listing.state].filter(Boolean);

  return {
    _id: b._id,
    shortId: b._id ? `BK-${b._id.slice(-6).toUpperCase()}` : 'N/A',
    guest: guestName,
    email: renter.email || 'No email provided',
    space: listing.title || 'Storage Space',
    location: locationParts.join(', ') || 'Location unavailable',
    spaceSize: listing.area ? `${listing.area} ${listing.unit || 'sq ft'}` : 'N/A',
    dates: `${formatDate(b.startDate)} - ${formatDate(b.endDate)}`,
    durationMonths: b.durationMonths || 1,
    duration: `${b.durationMonths || 1} ${(b.durationMonths || 1) === 1 ? 'Month' : 'Months'}`,
    amount: Number(b.totalAmount ?? 0),
    monthlyPrice: Number(b.monthlyPrice ?? 0),
    securityDeposit: Number(b.securityDeposit ?? 0),
    platformFee: Number(b.platformFee ?? 0),
    paymentStatus: payLabel,
    bookingStatus: statusLabel,
    bookingStatusRaw: statusRaw,
    endDate: b.endDate,
    avatar: initials,
    avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
    createdDate: b.createdAt || b.startDate,
  };
};

const Booking = () => {
  const dispatch = useDispatch();
  const {
    hostBookings,
    selectedHostBooking,
    hostLoading,
    hostError,
    hostDetailLoading,
    actionLoading,
  } = useSelector((state) => state.booking);

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('Newest');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeFallbackBooking, setActiveFallbackBooking] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);

  // Dropdown visibility states
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchHostBookings());
    return () => {
      dispatch(clearSelectedHostBooking());
    };
  }, [dispatch]);

  const bookings = hostBookings.map((b, idx) => mapBookingForView(b, idx));
  const detailView = selectedHostBooking
    ? mapBookingForView(selectedHostBooking)
    : activeFallbackBooking;

  // Calculate statistics dynamically
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.bookingStatusRaw === 'confirmed').length;
  const activeBookings = bookings.filter((b) => b.bookingStatusRaw === 'active').length;
  const cancelledBookings = bookings.filter((b) => b.bookingStatusRaw === 'cancelled').length;

  // Custom Toast helper
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Complete booking action (host only, active bookings past endDate)
  const handleCompleteBooking = async (bookingId, guestName, shortId) => {
    const action = await dispatch(completeBooking(bookingId));
    if (completeBooking.fulfilled.match(action)) {
      triggerToast(`Booking ${shortId} marked completed for ${guestName}!`, 'success');
    } else {
      triggerToast(action.payload || 'Could not complete booking', 'error');
    }
  };

  // Cancel booking action
  const handleCancelBooking = async (bookingId, guestName) => {
    if (!window.confirm(`Cancel booking for ${guestName}?`)) return;
    const action = await dispatch(cancelBooking(bookingId));
    if (cancelBooking.fulfilled.match(action)) {
      triggerToast(`Cancelled booking reservation for ${guestName}`, 'info');
    } else {
      triggerToast(action.payload || 'Failed to cancel booking', 'error');
    }
  };

  // Open Details Panel & fetch fresh host booking details via GET /api/booking/host/:bookingId
  const handleOpenDetails = (booking) => {
    setActiveFallbackBooking(booking);
    setIsDetailOpen(true);
    dispatch(fetchHostBookingById(booking._id));
  };

  const handleCloseDetails = () => {
    setIsDetailOpen(false);
    setActiveFallbackBooking(null);
    dispatch(clearSelectedHostBooking());
  };

  // Apply filters and sort
  const filteredBookings = bookings
    .filter((booking) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        booking.guest.toLowerCase().includes(q) ||
        booking.space.toLowerCase().includes(q) ||
        booking.shortId.toLowerCase().includes(q) ||
        booking._id.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'All' || booking.bookingStatus === statusFilter;

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
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const headerVariants = {
    hidden: { y: -25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const statCardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.15, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -8,
      scale: 0.95,
      transition: { duration: 0.1, ease: "easeIn" },
    },
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
              {toasts.map((toast) => (
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
                  ) : toast.type === 'error' ? (
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                      <AlertCircle className="w-3.5 h-3.5" />
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
                Manage reservations and guests across your spaces.
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
                <p className="text-[10px] font-bold text-emerald-500 mt-1">Upcoming reserved leases</p>
              </div>
            </motion.div>

            {/* Active */}
            <motion.div
              variants={statCardVariants}
              whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
              className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active</span>
                <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
                  <Clock className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  <AnimatedCounter value={activeBookings} />
                </h3>
                <p className="text-[10px] font-bold text-amber-500 mt-1 flex items-center gap-1.5">
                  {activeBookings > 0 && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                    </span>
                  )}
                  Ongoing rentals
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
                <p className="text-[10px] font-bold text-slate-400 mt-1">Cancelled / refunded</p>
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
                        {['All', 'Confirmed', 'Active', 'Completed', 'Cancelled', 'Expired'].map((status) => (
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

          {/* Error Banner */}
          {hostError && (
            <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{hostError}</span>
            </div>
          )}

          {/* 4. BOOKINGS TABLE */}
          <div className="bg-white border border-slate-100 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
            <div className="overflow-x-auto no-scrollbar max-h-[calc(100vh-320px)]">
              {hostLoading ? (
                <div className="py-24 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-[#2B7FFF]" />
                  <p className="text-xs font-semibold text-slate-400">Loading host bookings...</p>
                </div>
              ) : filteredBookings.length > 0 ? (
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
                        key={bk._id}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          visible: (i) => ({
                            opacity: 1,
                            y: 0,
                            transition: { delay: i * 0.04, type: "spring", stiffness: 120, damping: 17 },
                          }),
                        }}
                        className="hover:bg-slate-50/40 transition-colors duration-150 group cursor-pointer"
                      >
                        {/* Booking ID */}
                        <td className="py-4.5 pl-6 font-extrabold text-slate-800" onClick={() => handleOpenDetails(bk)}>
                          {bk.shortId}
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
                          ₹{bk.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
                            bk.bookingStatusRaw === 'confirmed' ? 'bg-emerald-500 text-white' :
                            bk.bookingStatusRaw === 'active' ? 'bg-[#2B7FFF] text-white' :
                            bk.bookingStatusRaw === 'completed' ? 'bg-purple-500 text-white' :
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
                            {bk.bookingStatusRaw === 'active' && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={actionLoading}
                                onClick={() => handleCompleteBooking(bk._id, bk.guest, bk.shortId)}
                                className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 cursor-pointer transition border border-emerald-200/50 disabled:opacity-50"
                                title="Mark completed"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                              </motion.button>
                            )}
                            {!['cancelled', 'completed', 'expired'].includes(bk.bookingStatusRaw) && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={actionLoading}
                                onClick={() => handleCancelBooking(bk._id, bk.guest)}
                                className="p-1.5 rounded-lg hover:border-red-200 hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-200 cursor-pointer transition disabled:opacity-50"
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
                  <p className="text-xs text-slate-400 font-semibold max-w-sm px-6">
                    {bookings.length === 0
                      ? 'You have no bookings on your spaces yet.'
                      : 'No reservations match your current search queries or filters.'}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* 5. BOOKING DETAIL PANEL (Slide-in Right Drawer overlay) */}
        <AnimatePresence>
          {isDetailOpen && detailView && (
            <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseDetails}
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
                    <h3 className="text-lg font-black text-slate-900 mt-0.5">{detailView.shortId}</h3>
                    <p className="text-[10px] text-slate-400 font-mono">{detailView._id}</p>
                  </div>
                  <button
                    onClick={handleCloseDetails}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Details Contents Scrollable */}
                <div className="p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar">
                  {hostDetailLoading && (
                    <div className="flex items-center gap-2 text-xs text-[#2B7FFF] font-semibold">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Refreshing latest details...</span>
                    </div>
                  )}

                  {/* Guest Information Section */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Guest Profile</h4>
                    <div className="flex items-center gap-3 bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100/50">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-inner ${detailView.avatarColor}`}>
                        {detailView.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-slate-900">{detailView.guest}</p>
                        <p className="text-xs text-slate-400 font-semibold">Registered Customer</p>
                      </div>
                    </div>

                    <div className="space-y-2.5 pl-1.5 text-xs text-slate-600 font-semibold pt-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span>{detailView.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Space Information Section */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Leased Space Specs</h4>
                    <div className="space-y-2 pl-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        <Building className="w-4.5 h-4.5 text-[#2B7FFF]" />
                        <span>{detailView.space}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pl-6.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{detailView.location}</span>
                      </div>
                      <div className="text-[11px] font-bold text-slate-400 pl-6.5 mt-0.5 uppercase tracking-wide">
                        Dimensions: {detailView.spaceSize}
                      </div>
                    </div>
                  </div>

                  {/* Booking Dates Details */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Reservation Details</h4>
                    <div className="space-y-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-400">Lease Dates:</span>
                        <span className="text-slate-900 font-bold">{detailView.dates}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-400">Total Duration:</span>
                        <span className="text-slate-900 font-bold">{detailView.duration}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-400">Booking Status:</span>
                        <span className="text-slate-900 font-bold">{detailView.bookingStatus}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-400">Monthly Billing Rate:</span>
                        <span className="text-[#2B7FFF] font-extrabold">₹{detailView.monthlyPrice}/mo</span>
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
                          detailView.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-600' :
                          detailView.paymentStatus === 'Pending' ? 'bg-amber-100 text-amber-600' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {detailView.paymentStatus}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-500">Security Deposit</span>
                        <span className="text-slate-700 font-bold">₹{detailView.securityDeposit}</span>
                      </div>

                      <div className="flex justify-between items-center text-xs font-semibold border-b border-slate-100 pb-2.5">
                        <span className="text-slate-500">Platform Fee</span>
                        <span className="text-slate-700 font-bold">₹{detailView.platformFee}</span>
                      </div>

                      <div className="flex justify-between items-center pt-0.5">
                        <span className="text-xs font-bold text-slate-800">Total Contract Value</span>
                        <span className="text-base font-black text-[#2B7FFF]">₹{detailView.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Actions Row */}
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-2">
                  <div className="flex gap-3">
                    {detailView.bookingStatusRaw === 'active' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={actionLoading}
                        onClick={() => handleCompleteBooking(detailView._id, detailView.guest, detailView.shortId)}
                        className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4.5 h-4.5 stroke-[2.5]" />
                        <span>Mark Completed</span>
                      </motion.button>
                    )}

                    {!['cancelled', 'completed', 'expired'].includes(detailView.bookingStatusRaw) && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={actionLoading}
                        onClick={() => handleCancelBooking(detailView._id, detailView.guest)}
                        className="flex-1 py-2.5 bg-white border border-rose-200 hover:bg-rose-50 disabled:opacity-50 text-rose-600 rounded-xl text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel Booking</span>
                      </motion.button>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleCloseDetails}
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
