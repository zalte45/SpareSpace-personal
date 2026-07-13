import React, { useState,useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { updateAmenity } from '../../../redux/features/Form/formSlice';
import {
  ArrowLeft,
  Check,
  MapPin,
  Sparkles,
  Thermometer,
  Video,
  Lock,
  Lightbulb,
  Zap,
  Flame,
  Shield,
  Truck,
  DollarSign,
  Maximize,
  Weight,
  Clock,
  FileText,
  Sliders
} from 'lucide-react';

const Page3 = ({ ActivePage, setActivePage, progress, setProgress, formData, handleChangeForm, checkListItems, setCheckListItems, handleSaveDraft }) => {
  const dispatch = useDispatch();

  const handleToggle = (amenityKey) => {
    dispatch(updateAmenity({
      name: amenityKey,
      value: !formData.amenities[amenityKey]
    }));
  };
  useEffect(() => {
    console.log(progress)
  }, [])
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChangeForm(name, value);
  };

  // Steps definition for the Stepper
  const steps = [
    { id: 1, label: 'Basic Info', completed: true },
    { id: 2, label: 'Images', completed: true },
    { id: 3, label: 'Details', active: true },
    { id: 4, label: 'Availability' },
    { id: 5, label: 'Review' }
  ];

  // List of amenities with icons, titles, and descriptions
  const amenitiesList = [
    { id: 'climateControlled', label: 'Climate Controlled', desc: 'Maintains consistent temperature/humidity', icon: Thermometer },
    { id: 'cctvSurveillance', label: 'CCTV Surveillance', desc: '24/7 security camera monitoring', icon: Video },
    { id: 'lockAvailable', label: 'Lock Available', desc: 'Dedicated padlock or key code lock', icon: Lock },
    { id: 'lighting', label: 'Lighting', desc: 'Bright overhead light fixtures', icon: Lightbulb },
    { id: 'electricity', label: 'Electricity', desc: 'Power outlets available for renters', icon: Zap },
    { id: 'fireSafety', label: 'Fire Safety', desc: 'Smoke alarms and fire extinguishers', icon: Flame },
    { id: 'insurance', label: 'Insurance', desc: 'Goods protected up to certain limit', icon: Shield },
    { id: 'loadingAssistance', label: 'Loading Assistance', desc: 'Host helper or trolley access available', icon: Truck }
  ];

  

  // Get active amenities names for the preview summary
  const activeAmenities = Object.keys(formData.amenities)
    .filter(key => formData.amenities[key])
    .map(key => amenitiesList.find(a => a.id === key)?.label || key);

  // Framer Motion Animation Variants
  const pageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.06 }
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

  const amenityContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const amenityItemVariants = {
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
            onClick={() => setActivePage(2)}
            className="group flex items-center gap-2 text-slate-500 hover:text-[#2B7FFF] transition-colors text-sm font-semibold cursor-pointer"
          >
            <motion.span whileHover={{ x: -3 }} className="inline-block">
              <ArrowLeft className="w-4 h-4" />
            </motion.span>
            Back to Upload Images
          </button>

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 flex items-center gap-2">
              List Your Space
              <Sliders className="w-5 h-5 text-[#2B7FFF]" />
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Tell renters everything about your storage space.
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
                <h2 className="text-xl font-bold text-slate-900">Space Details</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Provide detailed information about your storage space.
                </p>
              </div>

              {/* Sections Container */}
              <div className="space-y-8">

                {/* SECTION 1: Pricing */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#2B7FFF]" /> Pricing
                  </h3>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Price per Month *
                    </label>
                    <div className="relative max-w-xs">
                      <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                        ₹ 
                      </div>
                      <input
                        type="number"
                        name="price"
                        placeholder="2500"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all bg-[#FBFDFE] hover:border-slate-300 font-semibold"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Recommended market range: <span className="text-emerald-500 font-bold">₹2,000 - ₹3,000/month</span>
                    </p>
                  </div>
                </div>

                {/* SECTION 2: Space Size */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Maximize className="w-4 h-4 text-[#2B7FFF]" /> Space Size
                  </h3>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Area *
                    </label>
                    <div className="flex gap-2 max-w-xs">
                      <input
                        type="number"
                        name="area"
                        placeholder="150"
                        value={formData.area}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all bg-[#FBFDFE] hover:border-slate-300 font-semibold"
                      />
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        className="w-28 px-3 py-3 rounded-xl border border-slate-200 text-slate-700 bg-[#FBFDFE] focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all font-semibold hover:border-slate-300 cursor-pointer"
                      >
                        <option value="sq ft">sq ft</option>
                        <option value="sq m">sq m</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* SECTION 4: Access Hours */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#2B7FFF]" /> Access Hours
                  </h3>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Select Access Time Window *
                    </label>
                    <select
                      name="accessHours"
                      value={formData.accessHours}
                      onChange={handleInputChange}
                      className="w-full max-w-xs px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-[#FBFDFE] focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all font-semibold hover:border-slate-300 cursor-pointer"
                    >
                      <option value="24 Hours">24 Hours (Full Access)</option>
                      <option value="6 AM - 10 PM">6 AM - 10 PM</option>
                      <option value="8 AM - 8 PM">8 AM - 8 PM</option>
                      <option value="Custom Time">Custom Time</option>
                    </select>
                  </div>
                </div>

                {/* SECTION 5: Amenities (Modern Toggle Grid) */}
                <div className="space-y-4">
                  <div className="border-t border-slate-100 pt-6">
                    <h3 className="text-sm font-bold text-slate-800">Amenities & Features</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Toggle all key features offered by your storage space.</p>
                  </div>

                  <motion.div
                    variants={amenityContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1"
                  >
                    {amenitiesList.map((amenity) => {
                      const IconComponent = amenity.icon;
                      const isChecked = formData.amenities[amenity.id];

                      return (
                        <motion.div
                          key={amenity.id}
                          variants={amenityItemVariants}
                          className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-[#FBFDFE] hover:border-slate-200 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-lg shrink-0 ${isChecked ? 'bg-[#2B7FFF]/10 text-[#2B7FFF]' : 'bg-slate-100 text-slate-500'
                              }`}>
                              <IconComponent className="w-4.5 h-4.5" />
                            </div>
                            <div className="space-y-0.5">
                              <span className="block text-xs font-bold text-slate-800">{amenity.label}</span>
                              <span className="block text-[10px] text-slate-400 font-medium leading-snug">{amenity.desc}</span>
                            </div>
                          </div>

                          {/* Animated Toggle Switch */}
                          <button
                            type="button"
                            onClick={() => handleToggle(amenity.id)}
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

                {/* SECTION 6: Storage Rules */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#2B7FFF]" /> Storage Rules
                  </h3>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Host Guidelines for Renters
                    </label>
                    <textarea
                      name="rules"
                      rows={4}
                      placeholder={`Example:\nNo hazardous materials.\nNo flammable items.\nNo illegal goods.\nMaximum storage duration 12 months.`}
                      value={formData.rules}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all bg-[#FBFDFE] hover:border-slate-300 resize-none whitespace-pre-line font-medium text-sm"
                    />
                  </div>
                </div>

              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <motion.button
                  type="button"
                  onClick={() => setActivePage(2)}
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
                    onClick={() => setActivePage(4)}
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

          {/*RIGHT PREVIEW & LISTING PROGRESS*/}
          <motion.div
            variants={sidebarVariants}
            className="lg:col-span-3 lg:sticky lg:top-8 space-y-6"
          >





            {/* Listing Progress Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Listing Progress</span>
                  <span className="font-extrabold text-[#2B7FFF]">{`${progress}%`}</span>
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

export default Page3;
