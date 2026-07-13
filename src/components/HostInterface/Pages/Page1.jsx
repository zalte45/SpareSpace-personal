import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  Warehouse,
  Home,
  Layers,
  Car,
  Package,
  Building,
  MapPin,
  Sparkles
} from 'lucide-react';

const Page1 = ({ setActivePage, ActivePage, progress, setProgress,formData,handleChangeForm,checkListItems,setCheckListItems,handleSaveDraft }) => {

  useEffect(() => {
    console.log(progress)
  }, [])
  


  // Steps definition for the Stepper
  const steps = [
    { id: 1, label: 'Basic Info' },
    { id: 2, label: 'Images' },
    { id: 3, label: 'Details' },
    { id: 4, label: 'Availability' },
    { id: 5, label: 'Review' }
  ];

  // Category cards definition with icons and short descriptions
  const categories = [
    { id: 'garage', label: 'Garage', icon: Warehouse, description: 'Secure enclosed garage space' },
    { id: 'attic', label: 'Attic', icon: Home, description: 'Dry, elevated loft or attic space' },
    { id: 'basement', label: 'Basement', icon: Layers, description: 'Cool, subterranean basement storage' },
    { id: 'parking', label: 'Parking', icon: Car, description: 'Open driveway or private parking slot' },
    { id: 'storage_unit', label: 'Storage Unit', icon: Package, description: 'Self-contained lockable container' },
    { id: 'warehouse', label: 'Warehouse', icon: Building, description: 'Large scale commercial warehouse' }
  ];



  // Framer Motion Animation Variants
  const pageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.1 }
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
          <button className="group flex items-center gap-2 text-slate-500 hover:text-[#2B7FFF] transition-colors text-sm font-semibold cursor-pointer">
            <motion.span whileHover={{ x: -3 }} className="inline-block">
              <ArrowLeft className="w-4 h-4" />
            </motion.span>
            Back to Dashboard
          </button>

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 flex items-center gap-2">
              List Your Space
              <Sparkles className="w-5 h-5 text-[#2B7FFF] animate-pulse" />
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Complete the details below to start earning.
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
              const isActive = step.id === 1;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${isActive
                      ? 'bg-[#2B7FFF] text-white ring-4 ring-blue-100'
                      : 'bg-white border-2 border-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                  >
                    {step.id}
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
                <h2 className="text-xl font-bold text-slate-900">Basic Information</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Let's start with the basic information about your storage space.
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">

                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Storage Space Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Example: Downtown Garage"
                    value={formData.title}
                    onChange={(e) => {
                      handleChangeForm("title",e.target.value)
                    }
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all bg-[#FBFDFE] hover:border-slate-300"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    placeholder="Describe your storage space..."
                    value={formData.description}
                    onChange={(e) => {
                      handleChangeForm("description",e.target.value)
                    }
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all bg-[#FBFDFE] hover:border-slate-300 resize-none"
                  />
                </div>

                {/* Category Selector */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((cat) => {
                      const IconComponent = cat.icon;
                      const isSelected = formData.category === cat.id;

                      return (
                        <motion.button
                          type="button"
                          key={cat.id}
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleChangeForm("category", cat.id)}
                          className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 cursor-pointer ${isSelected
                            ? 'border-[#2B7FFF] bg-blue-50/20 shadow-[0_0_15px_rgba(43,127,255,0.12)] text-[#2B7FFF]'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)]'
                            }`}
                        >
                          <div className={`p-2.5 rounded-xl transition-colors ${isSelected ? 'bg-[#2B7FFF]/10' : 'bg-slate-50 text-slate-500'
                            }`}>
                            <IconComponent className="w-5.5 h-5.5" />
                          </div>
                          <div>
                            <span className="block text-xs font-bold tracking-wide uppercase">
                              {cat.label}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5 leading-tight">
                              {cat.description}
                            </span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Address Group */}
                <div className="space-y-4 pt-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="street"
                      placeholder="Street Address"
                      value={formData.street}
                      onChange={(e) => {
                        handleChangeForm("street",e.target.value)
                      }
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all bg-[#FBFDFE] hover:border-slate-300"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e)=>handleChangeForm("city",e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all bg-[#FBFDFE] hover:border-slate-300"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={(e)=>handleChangeForm("state",e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all bg-[#FBFDFE] hover:border-slate-300"
                      />
                      <input
                        type="number"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={(e)=>handleChangeForm("pincode",e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF]/20 focus:border-[#2B7FFF] transition-all bg-[#FBFDFE] hover:border-slate-300"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Navigation Controls inside card */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  type="button"
                  disabled
                  className="px-6 py-3 text-sm font-semibold text-slate-400 bg-slate-50 border border-slate-100 rounded-xl cursor-not-allowed"
                >
                  Previous
                </button>

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
                    onClick={() => setActivePage(ActivePage + 1)}
                    type="button"
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
                  <span className="font-extrabold text-[#2B7FFF]">{progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}

                    transition={{ duration: 0.5, ease: 'easeOut' }}
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
                  {checkListItems.map((item, index) => {
                    const isFuture = index > 3;
                    return (
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
                            : isFuture
                              ? 'text-slate-400 font-medium'
                              : 'text-slate-600'
                            }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </motion.div>
  );
};

export default Page1;
