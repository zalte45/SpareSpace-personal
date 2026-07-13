import React, { useState,useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { updateBookingPref } from '../../../redux/features/Form/formSlice';
import {
  ArrowLeft,
  Check,
  MapPin,
  Calendar,
  Zap,
  UserCheck,
  CalendarDays,
  Clock,
  History,
  RotateCw,
  Info,
  DollarSign,
  AlertTriangle,
  Sliders,
  ShieldAlert
} from 'lucide-react';

const Page4 = ({ ActivePage, setActivePage, progress, setProgress, formData, handleChangeForm, checkListItems, setCheckListItems, handleSaveDraft }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(formData.availableFrom)
    console.log(formData.availableUntil)
  }, [])
  
  const handleTogglePref = (prefKey) => {
    dispatch(updateBookingPref({
      name: prefKey,
      value: !formData.bookingPrefs[prefKey]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChangeForm(name, value);
  };

  const handlePolicySelect = (policy) => {
    handleChangeForm("cancellationPolicy", policy);
  };

  // Steps definition for the Stepper
  const steps = [
    { id: 1, label: 'Basic Info', completed: true },
    { id: 2, label: 'Images', completed: true },
    { id: 3, label: 'Details', completed: true },
    { id: 4, label: 'Availability', active: true },
    { id: 5, label: 'Review' }
  ];

  // Booking Preferences Configuration
  const bookingPrefsList = [
    { id: 'instantBooking', label: 'Instant Booking', desc: 'Renters can book instantly without waiting for approval', icon: Zap },
    { id: 'manualApproval', label: 'Manual Approval', desc: 'Review renter profile before confirming bookings', icon: UserCheck },
    { id: 'weekendBookings', label: 'Weekend Bookings', desc: 'Allow renters to move items in/out on weekends', icon: CalendarDays },
    { id: 'longTermOnly', label: 'Long-Term Only', desc: 'Prioritize rentals longer than 3 months', icon: History },
    { id: 'recurringRentals', label: 'Recurring Rentals', desc: 'Allow monthly automatic payments and renewals', icon: RotateCw },
    { id: 'autoRenewal', label: 'Auto Renewal', desc: 'Leases renew automatically unless cancelled', icon: Clock }
  ];

  // Cancellation Policies Configuration
  const cancellationPolicies = [
    { id: 'flexible', label: 'Flexible', desc: 'Full refund up to 24 hours before rental start date. 10% host fee applies.' },
    { id: 'moderate', label: 'Moderate', desc: 'Full refund up to 7 days before start date. 50% refund thereafter.' },
    { id: 'strict', label: 'Strict', desc: 'No refunds once a booking is confirmed. Ideal for guaranteed income.' }
  ];
  // Booking Preference Active Summary String
  const activePrefs = Object.keys(formData.bookingPrefs)
    .filter(key => formData.bookingPrefs[key])
    .map(key => bookingPrefsList.find(p => p.id === key)?.label || key);

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
    hidden: { opacity: 0, y: 20 },
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

  const prefContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const prefItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 12 } }
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
            onClick={() => setActivePage(3)}
            className="group flex items-center gap-2 text-slate-500 hover:text-[#2B7FFF] transition-colors text-sm font-semibold cursor-pointer"
          >
            <motion.span whileHover={{ x: -3 }} className="inline-block">
              <ArrowLeft className="w-4 h-4" />
            </motion.span>
            Back to Space Details
          </button>

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 flex items-center gap-2">
              List Your Space
              <Calendar className="w-5 h-5 text-[#2B7FFF]" />
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Choose when your storage space is available and configure rental options.
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
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${isActive
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
                    className={`mt-2.5 text-xs font-semibold tracking-wide uppercase hidden sm:block ${isActive ? 'text-slate-900 font-bold' : 'text-slate-400'
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

          {/* LEFT FORM SECTION (70%) */}
          <motion.div variants={cardVariants} className="lg:col-span-7">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-8">

              {/* Heading */}
              <div className="border-b border-slate-100 pb-5">
                <h2 className="text-xl font-bold text-slate-900">Availability & Pricing</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Configure booking availability and rental duration.
                </p>
              </div>

              {/* Sections Container */}
              <div className="space-y-8">

                {/* SECTION 1: Availability Toggle */}
                <div className="flex items-center justify-between p-4.5 rounded-xl border border-slate-100 bg-[#FBFDFE]">
                  <div className="space-y-0.5">
                    <span className="block text-sm font-bold text-slate-800">Available Immediately</span>
                    <span className="block text-xs text-slate-400 font-medium leading-snug">
                      Make your listing public and start accepting rentals right away
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <AnimatePresence mode="wait">
                      {formData.availableImmediately && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold tracking-wider uppercase border border-emerald-100/60"
                        >
                          Available
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Toggle Switch */}
                    <button
                      type="button"
                      onClick={() => handleChangeForm("availableImmediately", !formData.availableImmediately)}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none shrink-0 cursor-pointer ${formData.availableImmediately ? 'bg-[#2B7FFF]' : 'bg-slate-200'
                        }`}
                    >
                      <motion.div
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="w-5 h-5 rounded-full bg-white shadow-md"
                        animate={{ x: formData.availableImmediately ? 20 : 0 }}
                      />
                    </button>
                  </div>
                </div>

                {/* SECTION 2 & 3: Date Picker Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Available From */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className=" p-4.5 rounded-xl border border-slate-200 bg-[#FBFDFE] flex items-center justify-between cursor-pointer group hover:border-[#2B7FFF] transition-all"
                  >
                    <div className="space-y-1">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available From</span>
                    </div>
                    <input
                      type="date"
                      value={formData.availableFrom}
                      onChange={(e) => handleChangeForm("availableFrom", e.target.value)}
                      className=" inset-0  cursor-pointer"
                    />
                  </motion.div>

                  {/* Available Until */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className=" p-4.5 rounded-xl border border-slate-200 bg-[#FBFDFE] flex items-center justify-between cursor-pointer group hover:border-[#2B7FFF] transition-all"
                  >
                    <div className="space-y-1">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available Until</span>
                      
                    </div>
                    <input
                      type="date"
                      value={formData.availableUntil}
                      onChange={(e) => handleChangeForm("availableUntil", e.target.value)}
                      className=" inset-0  cursor-pointer"
                    />
                  </motion.div>

                </div>

                {/* SECTION 4 & 5: Rental Durations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Minimum Rental Duration */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Minimum Rental Duration
                    </label>
                    <select
                      name="minDuration"
                      value={formData.minDuration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-[#FBFDFE] focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all font-semibold hover:border-slate-300 cursor-pointer"
                    >
                      <option value="1 Week">1 Week</option>
                      <option value="2 Weeks">2 Weeks</option>
                      <option value="1 Month">1 Month</option>
                      <option value="3 Months">3 Months</option>
                      <option value="6 Months">6 Months</option>
                    </select>
                  </div>

                  {/* Maximum Rental Duration */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Maximum Rental Duration
                    </label>
                    <select
                      name="maxDuration"
                      value={formData.maxDuration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-[#FBFDFE] focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all font-semibold hover:border-slate-300 cursor-pointer"
                    >
                      <option value="1 Month">1 Month</option>
                      <option value="3 Months">3 Months</option>
                      <option value="6 Months">6 Months</option>
                      <option value="12 Months">12 Months</option>
                      <option value="Unlimited">Unlimited</option>
                    </select>
                  </div>

                </div>

                {/* SECTION 6: Rental Pricing */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800">Fee Configuration</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Monthly Price */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Monthly Price *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-xs">
                          ₹
                        </div>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full pl-7.5 pr-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all bg-[#FBFDFE] hover:border-slate-300 font-bold text-sm"
                        />
                      </div>
                    </div>

                    {/* Security Deposit */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Security Deposit
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-xs">
                          ₹
                        </div>
                        <input
                          type="number"
                          name="securityDeposit"
                          value={formData.securityDeposit}
                          onChange={handleInputChange}
                          className="w-full pl-7.5 pr-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all bg-[#FBFDFE] hover:border-slate-300 font-bold text-sm"
                        />
                      </div>
                    </div>

                    {/* Late Fee */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Late Fee (per day)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-xs">
                          ₹
                        </div>
                        <input
                          type="number"
                          name="lateFee"
                          value={formData.lateFee}
                          onChange={handleInputChange}
                          className="w-full pl-7.5 pr-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all bg-[#FBFDFE] hover:border-slate-300 font-bold text-sm"
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* SECTION 7: Booking Preferences (Toggles) */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Booking Preferences</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Define rules for accepting storage reservation requests.</p>
                  </div>

                  <motion.div
                    variants={prefContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {bookingPrefsList.map((pref) => {
                      const IconComponent = pref.icon;
                      const isChecked = formData.bookingPrefs[pref.id];

                      return (
                        <motion.div
                          key={pref.id}
                          variants={prefItemVariants}
                          className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-[#FBFDFE] hover:border-slate-200 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-lg shrink-0 ${isChecked ? 'bg-[#2B7FFF]/10 text-[#2B7FFF]' : 'bg-slate-100 text-slate-500'
                              }`}>
                              <IconComponent className="w-4.5 h-4.5" />
                            </div>
                            <div className="space-y-0.5">
                              <span className="block text-xs font-bold text-slate-800">{pref.label}</span>
                              <span className="block text-[10px] text-slate-400 font-medium leading-snug">{pref.desc}</span>
                            </div>
                          </div>

                          {/* Animated Toggle Switch */}
                          <button
                            type="button"
                            onClick={() => handleTogglePref(pref.id)}
                            className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-300 focus:outline-none shrink-0 cursor-pointer ${isChecked ? 'bg-[#2B7FFF]' : 'bg-slate-200'
                              }`}
                          >
                            <motion.div
                              layout
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              className="w-4.5 h-4.5 rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                              animate={{ x: isChecked ? 18 : 0 }}
                            />
                          </button>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>

                {/* SECTION 8: Cancellation Policy (Radio Cards) */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Cancellation Policy</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Specify conditions for renter lease cancellations.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cancellationPolicies.map((policy) => {
                      const isSelected = formData.cancellationPolicy === policy.id;

                      return (
                        <motion.div
                          key={policy.id}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePolicySelect(policy.id)}
                          className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all duration-300 cursor-pointer ${isSelected
                              ? 'border-[#2B7FFF] bg-blue-50/20 shadow-[0_0_15px_rgba(43,127,255,0.1)]'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-[#2B7FFF]' : 'text-slate-800'}`}>
                              {policy.label}
                            </span>

                            {/* Inner Circle Check */}
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-[#2B7FFF] bg-[#2B7FFF] text-white' : 'border-slate-300 bg-white'
                              }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-3" />}
                            </div>
                          </div>

                          <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                            {policy.desc}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <motion.button
                  type="button"
                  onClick={() => setActivePage(3)}
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
                    className="px-6 py-3 text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                  >
                    Save Draft
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => setActivePage(5)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 text-sm font-semibold text-white bg-[#2B7FFF] hover:bg-[#1A6EEE] rounded-xl flex items-center gap-2 shadow-[0_4px_15px_rgba(43,127,255,0.18)] transition-colors cursor-pointer"
                  >
                    Next <span>→</span>
                  </motion.button>
                </div>
              </div>

            </div>
          </motion.div>

          {/* RIGHT PREVIEW & LISTING PROGRESS (30%) */}
          <motion.div
            variants={sidebarVariants}
            className="lg:col-span-3 lg:sticky lg:top-8 space-y-6"
          >


            {/* Listing Progress Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Listing Progress</span>
                  <span className="font-extrabold text-[#2B7FFF]">{progress}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="h-full bg-[#2B7FFF] rounded-full"
                  />
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-3 pt-1">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Required Checklist
                </h5>
                <div className="space-y-2.5">
                  {checkListItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      
                      {item.completed ? (
                        
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3.5]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-200 bg-white shrink-0" />
                      )}
                      <span
                        className={`font-semibold transition-colors ${item.completed
                            ? 'text-slate-400 line-through decoration-slate-300'
                            : 'text-slate-600'
                          }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </motion.div>
  );
};

export default Page4;
