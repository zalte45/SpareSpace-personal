import React from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Check, 
  MapPin, 
  Pencil, 
  Sparkles, 
  DollarSign, 
  Info,
  Layers,
  Clock,
  Eye,
  Send,
  Warehouse,
  Flame,
  Shield,
  Thermometer,
  Video,
  Lock,
  Lightbulb,
  Zap,
  Truck
} from 'lucide-react';


const Page5 = ({ ActivePage, setActivePage,progress, setProgress,formData,setFormData,checkListItems,setChecklistItems, handleSaveDraft, handlePublish }) => {
  // Steps definition for the Stepper
  const steps = [
    { id: 1, label: 'Basic Info', completed: false },
    { id: 2, label: 'Images', completed: false },
    { id: 3, label: 'Details', completed: false },
    { id: 4, label: 'Availability', completed: false },
    { id: 5, label: 'Review', active: false }
  ];

  // Dummy uploaded images for display
  const images = [
    { id: 1, url: '', label: '' },
    { id: 2, url: '', label: '' },
    { id: 3, url: '', label: '' },
    { id: 4, url: '', label: '' },
    { id: 5, url: '', label: '' },
    { id: 6, url: '', label: '' },
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  useEffect(() => {
  console.log(formData)
}, [])

  // Amenities checklist
  const amenities = [
    { label: 'Climate Controlled', icon: Thermometer, id: 'climateControlled' },
    { label: 'CCTV Surveillance', icon: Video, id: 'cctvSurveillance' },
    { label: 'Lock Available', icon: Lock, id: 'lockAvailable' },
    { label: 'Lighting', icon: Lightbulb, id: 'lighting' },
    { label: 'Electricity', icon: Zap, id: 'electricity' },
    { label: 'Fire Safety', icon: Flame, id: 'fireSafety' },
    { label: 'Insurance Included', icon: Shield, id: 'insurance' },
    { label: 'Loading Assistance', icon: Truck, id: 'loadingAssistance' }
  ];

  // Checklist for review step
  

  // Framer Motion Animation Variants
  const pageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.05 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 15 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 15 } 
    }
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: 'spring', stiffness: 80, damping: 14 } 
    }
  };

  const successCardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { delay: 0.3, type: 'spring', stiffness: 100, damping: 12 } 
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="h-full overflow-y-auto bg-[#FBFDFE] text-slate-800 font-sans selection:bg-[#2B7FFF]/10 selection:text-[#2B7FFF] scrollbar-thin"
    >
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* 1. PAGE HEADER */}
        <motion.header variants={headerVariants} className="space-y-4">
          <button 
            onClick={() => setActivePage(4)}
            className="group flex items-center gap-2 text-slate-500 hover:text-[#2B7FFF] transition-colors text-sm font-semibold cursor-pointer"
          >
            <motion.span whileHover={{ x: -3 }} className="inline-block">
              <ArrowLeft className="w-4 h-4" />
            </motion.span>
            Back to Availability
          </button>
          
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 flex items-center gap-2">
              Review & Publish
              <Sparkles className="w-5 h-5 text-[#2B7FFF]" />
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Review all your listing information before publishing.
            </p>
          </div>
        </motion.header>

        {/* 2. PROGRESS STEPPER */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] max-w-4xl mx-auto"
        >
          <div className="relative flex items-center justify-between w-full">
            {/* Background Connector Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
            
            {steps.map((step, idx) => {
              const isCompleted = step.completed;
              const isActive = step.active;
              
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center flex-1">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#2B7FFF] text-white ring-4 ring-blue-100' 
                        : isCompleted
                          ? 'bg-[#2B7FFF]/10 border-2 border-[#2B7FFF] text-[#2B7FFF]'
                          : 'bg-white border-2 border-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isCompleted && !isActive ? (
                      <Check className="w-4 h-4 stroke-3" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span 
                    className={`mt-2.5 text-xs font-semibold tracking-wide uppercase hidden sm:block ${
                      isActive ? 'text-slate-900 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 3. MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
          
          {/* LEFT SECTION (70%) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* CARD 1: Basic Information */}
            <motion.div variants={cardVariants} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Basic Information</h3>
                <button 
                  onClick={() => setActivePage(1)}
                  className="p-2 rounded-lg text-slate-400 hover:text-[#2B7FFF] hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
              </div>

              <div className="space-y-3.5 pt-1">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Space Title</span>
                  <span className="text-base font-bold text-slate-800">{formData.title || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Description</span>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {formData.description || 'N/A'}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Category</span>
                    <span className="inline-block mt-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#2B7FFF] text-[10px] font-extrabold uppercase tracking-wide">
                      {formData.category ? formData.category.replace('_', ' ') : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location</span>
                    <span className="text-xs text-slate-600 font-semibold block mt-1">
                      {formData.street ? `${formData.street}, ${formData.city}, ${formData.state} - ${formData.pincode}` : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: Photo Gallery */}
            <motion.div variants={cardVariants} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Photo Gallery</h3>
                <button 
                  onClick={() => setActivePage(2)}
                  className="p-2 rounded-lg text-slate-400 hover:text-[#2B7FFF] hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-1">
                {formData.images && formData.images.length > 0 ? (
                  formData.images.map((img, idx) => (
                    <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden shadow-sm border border-slate-100 group">
                      <img 
                        src={URL.createObjectURL(img.file)} 
                        alt={`Uploaded Preview ${idx + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {idx === 0 && (
                        <div className="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-[7px] font-bold py-0.5 rounded text-center uppercase tracking-wider select-none z-10">
                          Cover
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 font-medium col-span-full">No images uploaded.</p>
                )}
              </div>
            </motion.div>

            {/* CARD 3: Space Details */}
            <motion.div variants={cardVariants} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Space Details & Amenities</h3>
                <button 
                  onClick={() => setActivePage(3)}
                  className="p-2 rounded-lg text-slate-400 hover:text-[#2B7FFF] hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
              </div>

              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Price per Month</span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5 block">₹{formData.price || '0'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Area Size</span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5 block">{formData.area || '0'} {formData.unit}</span>
                  </div>
                
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Access Hours</span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5 block">{formData.accessHours || 'N/A'}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Enabled Amenities</span>
                  <div className="flex flex-wrap gap-1.5">
                    {amenities
                      .filter(item => formData.amenities?.[item.id])
                      .map((item, idx) => {
                        const IconComp = item.icon;
                        return (
                          <div key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-100 bg-[#FBFDFE] text-slate-600 text-xs font-semibold shadow-sm">
                            <IconComp className="w-3.5 h-3.5 text-[#2B7FFF]" />
                            <span>{item.label}</span>
                          </div>
                        );
                      })}
                    {(!formData.amenities || Object.values(formData.amenities).every(val => !val)) && (
                      <span className="text-xs text-slate-400 font-medium">None</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 4: Availability */}
            <motion.div variants={cardVariants} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Availability & Preferences</h3>
                <button 
                  onClick={() => setActivePage(4)}
                  className="p-2 rounded-lg text-slate-400 hover:text-[#2B7FFF] hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
              </div>

              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Available From</span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5 block">{formatDate(formData.availableFrom)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Available Until</span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5 block">{formatDate(formData.availableUntil)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Min Rental</span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5 block">{formData.minDuration || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Max Rental</span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5 block">{formData.maxDuration || 'N/A'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Cancellation Policy</span>
                    <span className="inline-block px-3 py-1 rounded-lg border border-orange-100 bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider">
                      {formData.cancellationPolicy ? `${formData.cancellationPolicy.charAt(0).toUpperCase() + formData.cancellationPolicy.slice(1)} Policy` : 'N/A'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Booking Settings</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'instantBooking', label: 'Instant Booking' },
                        { id: 'manualApproval', label: 'Manual Approval' },
                        { id: 'weekendBookings', label: 'Weekend Bookings' },
                        { id: 'longTermOnly', label: 'Long-Term Only' },
                        { id: 'recurringRentals', label: 'Recurring Rentals' },
                        { id: 'autoRenewal', label: 'Auto Renewal' }
                      ]
                        .filter(pref => formData.bookingPrefs?.[pref.id])
                        .map((pref) => (
                          <span key={pref.id} className="px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500">
                            {pref.label}
                          </span>
                        ))}
                      {(!formData.bookingPrefs || Object.values(formData.bookingPrefs).every(val => !val)) && (
                        <span className="text-xs text-slate-400 font-medium">None</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 5: Listing Summary */}
            <motion.div variants={cardVariants} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Earnings Summary</h3>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-500">Estimated Monthly Earnings</span>
                  <span className="font-bold text-slate-800">₹{formData.price || '0'}</span>
                </div>
                
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span className="font-semibold flex items-center gap-1.5">
                    SpareSpace Service Fee <span className="text-[10px] text-slate-400">(10%)</span>
                  </span>
                  <span className="font-bold text-rose-500">- ₹{(Number(formData.price || 0) * 0.1).toFixed(0)}</span>
                </div>
                
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-sm">
                  <span className="font-extrabold text-slate-800">Your Estimated Payout</span>
                  <span className="font-extrabold text-[#2B7FFF]">₹{(Number(formData.price || 0) * 0.9).toFixed(0)} / month</span>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="font-extrabold text-emerald-600 uppercase tracking-wider text-[10px]">
                    Status: Ready to Publish
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4">
              <motion.button
                type="button"
                onClick={() => setActivePage(4)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </motion.button>
              
              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  onClick={handleSaveDraft}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-3 text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                >
                  Save as Draft
                </motion.button>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-3 text-sm font-semibold text-[#2B7FFF] bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-100 transition-colors cursor-pointer"
                >
                  Preview Listing
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={handlePublish}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 text-sm font-semibold text-white bg-[#2B7FFF] hover:bg-[#1A6EEE] rounded-xl flex items-center gap-2 shadow-[0_4px_15px_rgba(43,127,255,0.2)] transition-colors cursor-pointer"
                >
                  Publish Space <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

          </div>

          {/* RIGHT PREVIEW & LISTING COMPLETION (30%) */}
          <motion.div 
            variants={sidebarVariants}
            className="lg:col-span-3 lg:sticky lg:top-8 space-y-6"
          >
            {/* Listing Completion Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Setup Completion</span>
                  <span className="font-extrabold text-emerald-500">100%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-3 pt-1">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Process Checklist
                </h5>
                <div className="space-y-2.5">
                  {checkListItems.map((item, idx) => (
                    <motion.div 
                      key={item.id} 
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx, duration: 0.3 }}
                      className="flex items-center gap-3 text-xs"
                    >
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3.5]" />
                      </div>
                      <span className="font-semibold text-slate-400 line-through decoration-slate-300">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Green Success Card */}
              <motion.div 
                variants={successCardVariants}
                className="p-4.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-center space-y-1.5"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-4 h-4 stroke-3" />
                </div>
                <div className="space-y-0.5">
                  <h6 className="text-xs font-bold">Listing Approved!</h6>
                  <p className="text-[10px] font-medium text-emerald-600 leading-snug">
                    Your listing is complete and ready to be published.
                  </p>
                </div>
              </motion.div>
            </div>

          </motion.div>

        </div>

      </div>
    </motion.div>
  );
};

export default Page5;
