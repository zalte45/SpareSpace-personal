import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  MapPin, 
  Ruler, 
  Star, 
  Eye, 
  Trash2, 
  X, 
  Check, 
  AlertCircle, 
  SlidersHorizontal,
  Calendar,
  User,
  Building,
  CheckCircle2,
  TrendingUp,
  Tag,
  Pencil
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

const MySpace = () => {
  // Mock initial spaces data
  const [spaces, setSpaces] = useState([
    {
      id: 1,
      title: "Climate-Controlled Garage",
      location: "1420 Pine St, Seattle",
      price: 185,
      size: 150,
      category: "Garage",
      rating: 4.9,
      status: "Occupied",
      customer: "Ava Cooper",
      duration: "Jul 2026 - Jan 2027",
      image: "/garage.jpg"
    },
    {
      id: 2,
      title: "Climate-Controlled Vault",
      location: "405 Pike St, Seattle",
      price: 150,
      size: 100,
      category: "Basement",
      rating: 4.8,
      status: "Occupied",
      customer: "Liam Patterson",
      duration: "Jun 2026 - Dec 2026",
      image: "/download.jpg"
    },
    {
      id: 3,
      title: "Suburban Attic Space",
      location: "810 5th Ave, Seattle",
      price: 120,
      size: 80,
      category: "Attic",
      rating: 4.5,
      status: "Available",
      customer: "None",
      duration: "N/A",
      image: "/garage.jpg"
    },
    {
      id: 4,
      title: "Secure Basement Locker",
      location: "1201 3rd Ave, Seattle",
      price: 95,
      size: 50,
      category: "Basement",
      rating: 4.7,
      status: "Available",
      customer: "None",
      duration: "N/A",
      image: "/download.jpg"
    },
    {
      id: 5,
      title: "Clean Driveway Parking Spot",
      location: "2101 N 34th St, Seattle",
      price: 75,
      size: 200,
      category: "Garage",
      rating: 4.6,
      status: "Occupied",
      customer: "Sophia Martinez",
      duration: "May 2026 - Oct 2026",
      image: "/garage.jpg"
    },
    {
      id: 6,
      title: "Walk-in Storage Closet",
      location: "Capitol Hill, Seattle",
      price: 60,
      size: 30,
      category: "Closet",
      rating: 4.4,
      status: "Available",
      customer: "None",
      duration: "N/A",
      image: "/download.jpg"
    }
  ]);

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toasts, setToasts] = useState([]);
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  // Modal forms data state
  const [currentSpace, setCurrentSpace] = useState(null);
  const [newSpace, setNewSpace] = useState({
    title: '',
    location: '',
    price: '',
    size: '',
    category: 'Garage',
    status: 'Available',
    customer: 'None',
    duration: 'N/A'
  });

  // Calculate statistics dynamically
  const totalSpaces = spaces.length;
  const occupiedSpaces = spaces.filter(s => s.status === 'Occupied').length;
  const availableSpaces = spaces.filter(s => s.status === 'Available').length;
  const avgRating = spaces.reduce((acc, curr) => acc + curr.rating, 0) / (totalSpaces || 1);

  // Helper to trigger custom toasts
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Create Space Form Submit handler
  const handleAddSpace = (e) => {
    e.preventDefault();
    const id = Date.now();
    const parsedPrice = parseFloat(newSpace.price) || 0;
    const parsedSize = parseFloat(newSpace.size) || 0;
    
    // Choose image based on index or category
    const image = parsedSize > 100 ? "/garage.jpg" : "/download.jpg";

    const spaceToAdd = {
      ...newSpace,
      id,
      price: parsedPrice,
      size: parsedSize,
      rating: 5.0, // Initial rating for new space listings
      image
    };

    setSpaces(prev => [spaceToAdd, ...prev]);
    setIsAddModalOpen(false);
    triggerToast(`"${spaceToAdd.title}" listed successfully!`, 'success');

    // Reset Form
    setNewSpace({
      title: '',
      location: '',
      price: '',
      size: '',
      category: 'Garage',
      status: 'Available',
      customer: 'None',
      duration: 'N/A'
    });
  };

  // Edit Button click handler
  const handleOpenEdit = (space) => {
    setCurrentSpace({ ...space });
    setIsEditModalOpen(true);
  };

  // Edit Form Submit handler
  const handleEditSpace = (e) => {
    e.preventDefault();
    setSpaces(prev => prev.map(s => s.id === currentSpace.id ? currentSpace : s));
    setIsEditModalOpen(false);
    triggerToast(`Updated "${currentSpace.title}" details`, 'success');
  };

  // View Button click handler
  const handleOpenView = (space) => {
    setCurrentSpace(space);
    setIsViewModalOpen(true);
  };

  // Delete Space click handler (with AnimatePresence exit animation)
  const handleDeleteSpace = (id, title) => {
    setSpaces(prev => prev.filter(s => s.id !== id));
    triggerToast(`Deleted listing: "${title}"`, 'info');
  };

  // Filters spaces based on search and status
  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.customer.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || space.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Animation variants
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

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 16 } 
    }
  };

  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <>
      {/* Inject custom style for hiding scrollbars */}
      <style dangerouslySetInnerHTML={{ __html: scrollbarHiddenStyle }} />

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="h-full overflow-y-auto bg-[#FBFDFE] text-slate-800 font-sans selection:bg-[#2B7FFF]/10 selection:text-[#2B7FFF]"
      >
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          
          {/* Custom Toast Messages */}
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
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950">My Spaces</h1>
              <p className="text-sm font-medium text-slate-500 mt-1">
                Manage your storage listings.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search listings, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-44 md:w-56 text-xs rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Status Filter Slider */}
              <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-100 items-center">
                {['All', 'Available', 'Occupied'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                      statusFilter === f 
                        ? 'bg-white text-[#2B7FFF] shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Add New Space Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsAddModalOpen(true)}
                className="px-4.5 py-2.5 bg-[#2B7FFF] hover:bg-[#1A6EEF] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/10 transition duration-150 cursor-pointer"
              >
                <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
                <span>Add New Space</span>
              </motion.button>
            </div>
          </motion.header>

          {/* 2. STATISTICS SECTION */}
          <motion.div 
            variants={statsContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {/* Total Spaces */}
            <motion.div 
              variants={statCardVariants}
              whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
              className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Spaces</span>
                <div className="p-2 bg-blue-50 rounded-xl text-[#2B7FFF]">
                  <Building className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  <AnimatedCounter value={totalSpaces} />
                </h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1">Listed listings capacity</p>
              </div>
            </motion.div>

            {/* Available */}
            <motion.div 
              variants={statCardVariants}
              whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
              className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Available</span>
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-500">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  <AnimatedCounter value={availableSpaces} />
                </h3>
                <p className="text-[10px] font-bold text-emerald-500 mt-1 flex items-center gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Ready to rent immediately
                </p>
              </div>
            </motion.div>

            {/* Occupied */}
            <motion.div 
              variants={statCardVariants}
              whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
              className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Occupied</span>
                <div className="p-2 bg-purple-50 rounded-xl text-purple-500">
                  <User className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  <AnimatedCounter value={occupiedSpaces} />
                </h3>
                <p className="text-[10px] font-bold text-purple-500 mt-1">
                  Active subscription leases
                </p>
              </div>
            </motion.div>

            {/* Average Rating */}
            <motion.div 
              variants={statCardVariants}
              whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)" }}
              className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Rating</span>
                <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
                  <Star className="w-4.5 h-4.5 fill-amber-400" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  <AnimatedCounter value={avgRating} decimalPlaces={1} />
                </h3>
                <p className="text-[10px] font-bold text-amber-500 mt-1 flex items-center gap-0.5">
                  Based on recent host ratings
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* 3. MAIN SECTION - SCROLLABLE CARD GRID (Hidden scrollbar) */}
          <div className="overflow-y-auto no-scrollbar max-h-[calc(100vh-270px)] pr-1">
            <AnimatePresence mode="popLayout">
              {filteredSpaces.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredSpaces.map((space) => (
                    <motion.div
                      layout
                      key={space.id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-30px" }}
                      variants={cardVariants}
                      whileHover={{ y: -6, boxShadow: "0px 20px 45px rgba(0, 0, 0, 0.04)" }}
                      className="bg-white border border-slate-100 rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all flex flex-col justify-between"
                    >
                      {/* Image container & overlay badge */}
                      <div className="relative h-48 overflow-hidden group cursor-pointer">
                        <motion.img 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          src={space.image} 
                          alt={space.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        
                        {/* Status Badge */}
                        <motion.div 
                          variants={badgeVariants}
                          initial="hidden"
                          animate="visible"
                          className="absolute top-4 left-4"
                        >
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md border ${
                            space.status === 'Occupied' 
                              ? 'bg-blue-500/80 text-white border-blue-400/40' 
                              : 'bg-emerald-500/80 text-white border-emerald-400/40'
                          }`}>
                            {space.status}
                          </span>
                        </motion.div>

                        {/* Category tag */}
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-md flex items-center gap-1">
                          <Tag className="w-3 h-3 text-[#2B7FFF]" />
                          <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">{space.category}</span>
                        </div>

                        {/* Rating overlay */}
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-[10px] font-bold text-slate-800">{space.rating}</span>
                        </div>
                      </div>

                      {/* Info body */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#2B7FFF] transition-colors">{space.title}</h3>
                            <span className="text-base font-extrabold text-[#2B7FFF] shrink-0">${space.price}<span className="text-[10px] font-bold text-slate-400">/mo</span></span>
                          </div>
                          <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {space.location}
                          </p>
                        </div>

                        {/* Size specs details */}
                        <div className="flex items-center gap-4 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/50">
                          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold">
                            <Ruler className="w-3.5 h-3.5 text-[#2B7FFF]" />
                            <span>{space.size} sq ft</span>
                          </div>
                        </div>

                        {/* Lease details section */}
                        <div className="border-t border-slate-100 pt-4 space-y-3">
                          {/* Occupancy Progress */}
                          <div>
                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                              <span>Occupancy Rate</span>
                              <span className="text-[#2B7FFF]">{space.status === 'Occupied' ? '100%' : '0%'}</span>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: space.status === 'Occupied' ? '100%' : '0%' }}
                                transition={{ duration: 1.2, delay: 0.1 }}
                                className="bg-[#2B7FFF] h-full rounded-full"
                              />
                            </div>
                          </div>

                          {/* Customer and duration stats */}
                          <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-500 pt-1">
                            <div>
                              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Customer</span>
                              <span className="text-slate-800 flex items-center gap-1 mt-0.5 font-bold">
                                <User className="w-3 h-3 text-slate-400 shrink-0" />
                                {space.customer}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Lease Duration</span>
                              <span className="text-slate-800 flex items-center gap-1 mt-0.5 font-bold truncate">
                                <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                                {space.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom actions bar */}
                      <div className="px-5 pb-5 pt-1.5 flex items-center gap-2 border-t border-slate-50">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleOpenView(space)}
                          className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 flex items-center justify-center gap-1 cursor-pointer transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleOpenEdit(space)}
                          className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 flex items-center justify-center gap-1 cursor-pointer transition"
                        >
                          <Pencil className="w-3.5 h-3.5 text-slate-500" />
                          <span>Edit</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleDeleteSpace(space.id, space.title)}
                          className="p-2 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center cursor-pointer transition"
                          title="Delete space"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="py-24 bg-white border border-slate-100 rounded-[20px] flex flex-col items-center justify-center text-center space-y-3 shadow-[0_8px_30px_rgb(0,0,0,0.01)]"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center">
                    <Building className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">No spaces found</h3>
                  <p className="text-xs text-slate-400 font-semibold max-w-sm px-6">We couldn't find any listings matching your search filter terms. Try resetting filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* 4. ADD NEW SPACE MODAL */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 15 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className="relative bg-white rounded-[24px] shadow-2xl p-6 w-full max-w-md border border-slate-100 z-10"
              >
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="absolute top-4.5 right-4.5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>

                <h3 className="text-lg font-bold text-slate-900">List a New Space</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1 mb-6">List a new vacant storage space on SpareSpace.</p>

                <form onSubmit={handleAddSpace} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Space Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Premium Driveway Parking Spot"
                      value={newSpace.title}
                      onChange={(e) => setNewSpace({...newSpace, title: e.target.value})}
                      className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Location</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Seattle, WA"
                        value={newSpace.location}
                        onChange={(e) => setNewSpace({...newSpace, location: e.target.value})}
                        className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Space Type</label>
                      <select
                        value={newSpace.category}
                        onChange={(e) => setNewSpace({...newSpace, category: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent bg-white transition-all text-slate-700 font-semibold"
                      >
                        <option value="Garage">Garage</option>
                        <option value="Basement">Basement</option>
                        <option value="Attic">Attic</option>
                        <option value="Closet">Closet</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Price ($)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 150"
                        value={newSpace.price}
                        onChange={(e) => setNewSpace({...newSpace, price: e.target.value})}
                        className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Size (sq ft)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 120"
                        value={newSpace.size}
                        onChange={(e) => setNewSpace({...newSpace, size: e.target.value})}
                        className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</label>
                      <select
                        value={newSpace.status}
                        onChange={(e) => setNewSpace({...newSpace, status: e.target.value, customer: e.target.value === 'Available' ? 'None' : newSpace.customer})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent bg-white transition-all text-slate-700 font-semibold"
                      >
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                      </select>
                    </div>
                    {newSpace.status === 'Occupied' && (
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Customer</label>
                        <input
                          type="text"
                          required
                          placeholder="Customer name"
                          value={newSpace.customer === 'None' ? '' : newSpace.customer}
                          onChange={(e) => setNewSpace({...newSpace, customer: e.target.value, duration: newSpace.duration === 'N/A' ? 'Jul 2026 - Jan 2027' : newSpace.duration})}
                          className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#2B7FFF] hover:bg-[#1A6EEF] text-white text-xs font-bold shadow-md shadow-blue-500/10 transition cursor-pointer"
                    >
                      Add Space
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 5. EDIT SPACE MODAL */}
        <AnimatePresence>
          {isEditModalOpen && currentSpace && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsEditModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 15 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className="relative bg-white rounded-[24px] shadow-2xl p-6 w-full max-w-md border border-slate-100 z-10"
              >
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="absolute top-4.5 right-4.5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>

                <h3 className="text-lg font-bold text-slate-900">Edit Space Details</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1 mb-6">Modify details for your storage space listing.</p>

                <form onSubmit={handleEditSpace} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Space Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Space Title"
                      value={currentSpace.title}
                      onChange={(e) => setCurrentSpace({...currentSpace, title: e.target.value})}
                      className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Location</label>
                      <input
                        type="text"
                        required
                        placeholder="Location"
                        value={currentSpace.location}
                        onChange={(e) => setCurrentSpace({...currentSpace, location: e.target.value})}
                        className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Space Type</label>
                      <select
                        value={currentSpace.category}
                        onChange={(e) => setCurrentSpace({...currentSpace, category: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent bg-white transition-all text-slate-700 font-semibold"
                      >
                        <option value="Garage">Garage</option>
                        <option value="Basement">Basement</option>
                        <option value="Attic">Attic</option>
                        <option value="Closet">Closet</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Price ($)</label>
                      <input
                        type="number"
                        required
                        value={currentSpace.price}
                        onChange={(e) => setCurrentSpace({...currentSpace, price: parseFloat(e.target.value) || 0})}
                        className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Size (sq ft)</label>
                      <input
                        type="number"
                        required
                        value={currentSpace.size}
                        onChange={(e) => setCurrentSpace({...currentSpace, size: parseFloat(e.target.value) || 0})}
                        className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</label>
                      <select
                        value={currentSpace.status}
                        onChange={(e) => setCurrentSpace({
                          ...currentSpace, 
                          status: e.target.value, 
                          customer: e.target.value === 'Available' ? 'None' : (currentSpace.customer === 'None' ? 'New Customer' : currentSpace.customer),
                          duration: e.target.value === 'Available' ? 'N/A' : (currentSpace.duration === 'N/A' ? 'Jul 2026 - Jan 2027' : currentSpace.duration)
                        })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent bg-white transition-all text-slate-700 font-semibold"
                      >
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                      </select>
                    </div>
                    {currentSpace.status === 'Occupied' && (
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Customer</label>
                        <input
                          type="text"
                          required
                          value={currentSpace.customer}
                          onChange={(e) => setCurrentSpace({...currentSpace, customer: e.target.value})}
                          className="w-full px-4.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#2B7FFF] hover:bg-[#1A6EEF] text-white text-xs font-bold shadow-md shadow-blue-500/10 transition cursor-pointer"
                    >
                      Save Changes
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 6. VIEW SPACE MODAL */}
        <AnimatePresence>
          {isViewModalOpen && currentSpace && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsViewModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 15 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className="relative bg-white rounded-[24px] shadow-2xl p-6 w-full max-w-md border border-slate-100 z-10 overflow-hidden"
              >
                {/* Image panel */}
                <div className="h-44 -mx-6 -mt-6 relative overflow-hidden">
                  <img 
                    src={currentSpace.image} 
                    alt={currentSpace.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Status Overlay */}
                  <span className={`absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md border ${
                    currentSpace.status === 'Occupied' 
                      ? 'bg-blue-500/80 text-white border-blue-400/40' 
                      : 'bg-emerald-500/80 text-white border-emerald-400/40'
                  }`}>
                    {currentSpace.status}
                  </span>

                  <button
                    onClick={() => setIsViewModalOpen(false)}
                    className="absolute top-4 right-4 text-white hover:text-slate-200 p-1.5 rounded-full bg-black/25 hover:bg-black/40 backdrop-blur-sm transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-4 left-6 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-[#2B7FFF] rounded-md">{currentSpace.category}</span>
                    <h3 className="text-base font-bold mt-1.5">{currentSpace.title}</h3>
                  </div>
                </div>

                {/* Details Body */}
                <div className="py-5 space-y-5">
                  <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Pricing</span>
                      <p className="text-lg font-black text-slate-800 mt-0.5">${currentSpace.price} <span className="text-[11px] font-bold text-slate-400">/ mo</span></p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Space Size</span>
                      <p className="text-lg font-black text-slate-800 mt-0.5">{currentSpace.size} <span className="text-[11px] font-bold text-slate-400">sq ft</span></p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location Details
                      </span>
                      <p className="text-xs font-semibold text-slate-700 mt-1 pl-4.5">{currentSpace.location}</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Listing Rating
                      </span>
                      <p className="text-xs font-bold text-slate-700 mt-1 pl-4.5">{currentSpace.rating} / 5.0 Rating Score</p>
                    </div>
                  </div>

                  {/* Lease Details Box */}
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Current Tenant Lease</h4>
                    
                    {currentSpace.status === 'Occupied' ? (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                          <span className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-400" /> Tenant Name:
                          </span>
                          <span className="text-slate-900 font-bold">{currentSpace.customer}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" /> Booking Range:
                          </span>
                          <span className="text-slate-900 font-bold">{currentSpace.duration}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="py-2 flex flex-col items-center justify-center text-center space-y-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <p className="text-xs font-bold text-emerald-600">Listing Available & Vacant</p>
                        <p className="text-[10px] text-slate-400 font-medium">Ready for immediate client reservations.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setIsViewModalOpen(false)}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-md"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </motion.div>
    </>
  );
};

export default MySpace;
