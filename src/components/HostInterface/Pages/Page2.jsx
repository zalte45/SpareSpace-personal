import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  UploadCloud,
  Trash2,
  GripVertical,
  Sun,
  Sparkles,
  Camera,
  DoorOpen,
  Maximize2,
  MapPin,
  Image as ImageIcon
} from 'lucide-react';

const Page2 = ({ ActivePage, setActivePage, progress, setProgress, formData, handleChangeForm, checkListItems, setCheckListItems, handleFileChange,handleDeleteImage, handleSaveDraft }) => {



  

  // Steps definition for the Stepper
  const steps = [
    { id: 1, label: 'Basic Info', completed: true },
    { id: 2, label: 'Images', active: true },
    { id: 3, label: 'Details' },
    { id: 4, label: 'Availability' },
    { id: 5, label: 'Review' }
  ];

  // Guidelines tips with customized premium Lucide icons
  const guidelines = [
    { icon: Sun, text: 'Bright lighting', desc: 'Take photos during the day with all lights on.', color: 'text-amber-500 bg-amber-50' },
    { icon: Sparkles, text: 'Clean storage', desc: 'Ensure the space is clean and swept before shooting.', color: 'text-emerald-500 bg-emerald-50' },
    { icon: Camera, text: 'Multiple angles', desc: 'Upload photos showing the entire space from corners.', color: 'text-blue-500 bg-blue-50' },
    { icon: DoorOpen, text: 'Show entrance', desc: 'Include photos showing access doors and pathways.', color: 'text-purple-500 bg-purple-50' },
    { icon: Maximize2, text: 'High resolution', desc: 'Avoid blurry, pixelated or extremely dark photos.', color: 'text-indigo-500 bg-indigo-50' }
  ];






  // Framer Motion Animation Variants
  const pageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.08 }
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

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const imageCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };
  const [images, setImages] = useState([]);



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
            Back to Basic Info
          </button>

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 flex items-center gap-2">
              List Your Space
              <ImageIcon className="w-5 h-5 text-[#2B7FFF]" />
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Upload high-quality photos of your storage space.
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
          <motion.div variants={cardVariants} className="lg:col-span-7 space-y-6">

            {/* Upload Area Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-8">

              {/* Heading */}
              <div className="border-b border-slate-100 pb-5">
                <h2 className="text-xl font-bold text-slate-900">Upload Images</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Add high-quality images to attract more renters.
                </p>
              </div>

              {/* Large Dashed Upload Container */}
              <motion.div
                whileHover={{ scale: 1.005 }}
                className=" border-2 border-dashed border-slate-200 hover:border-[#2B7FFF] rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 cursor-pointer transition-all duration-300 bg-slate-50/50 hover:bg-blue-50/10 group"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-[#2B7FFF]"
                >
                  <UploadCloud className="w-7 h-7" />
                </motion.div>
                <input type="file" name="img-file" id="" className='cursor-pointer w-49 h-10' accept='image/*' onChange={handleFileChange} />




                <div className="pt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5 border-t border-slate-200/60 w-full max-w-sm mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>JPG, PNG, WEBP</span>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <span>Max 10 Images</span>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <span>Max 5MB</span>
                </div>
              </motion.div>

              {/* Image Preview Grid -placed in notepad*/}
               <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  Uploaded Photos
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-extrabold">
                    {formData.images.length} / 10
                  </span>
                </h3>

                {formData.images.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-12 text-center rounded-xl border border-slate-100 bg-[#FBFDFE] flex flex-col items-center justify-center gap-2"
                  >
                    <ImageIcon className="w-8 h-8 text-slate-300" />
                    <p className="text-sm text-slate-400 font-medium">No images uploaded yet.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={gridContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  >
                    <AnimatePresence mode="popLayout">
                      {formData.images.map((img, index) => {
                        const isCover = index === 0; // First image dynamically treated as cover image

                        return (
                          <motion.div
                            key={img.id}
                            layout
                            variants={imageCardVariants}
                            whileHover={{ scale: 1.05 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            className="relative aspect-square rounded-xl overflow-hidden shadow-sm border border-slate-100 group cursor-grab active:cursor-grabbing"
                          >
                            {/* Dummy Reorder Grip Icon (UI Only) */}
                            <div className="absolute top-2 left-2 p-1.5 rounded-lg bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab z-10">
                              <GripVertical className="w-3.5 h-3.5" />
                            </div>

                            {/* Cover Badge */}
                            {isCover && (
                              <div className="absolute top-2 right-2 bg-[#2B7FFF] text-white px-2.5 py-0.5 rounded-md text-[9px] font-bold tracking-wider uppercase shadow-sm z-10 flex items-center gap-1 select-none">
                                <Sparkles className="w-2.5 h-2.5" />
                                Cover Space
                              </div>
                            )}

                            {/* Image Container with Zoom effect */}
                            <div className="w-full h-full overflow-hidden">
                              <img
                                src={URL.createObjectURL(img.file)}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                              <div /> {/* spacing */}

                              <div className="flex items-center justify-between">
                                <span className="text-[10px] text-white/95 font-bold tracking-wide uppercase">
                                  {isCover ? 'Main Cover' : `Photo ${index + 1}`}
                                </span>

                                {/* Delete Button (Fades in on hover) */}
                                <motion.button
                                  type="button"
                                  onClick={() => handleDeleteImage(img.id)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-1.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors shadow-md cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div> 

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <motion.button
                  onClick={() => setActivePage(ActivePage - 1)}
                  type="button"
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
                    onClick={() => setActivePage(ActivePage + 1)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 text-sm font-semibold text-white bg-[#2B7FFF] hover:bg-[#1A6EEE] rounded-xl flex items-center gap-2 shadow-[0_4px_15px_rgba(43,127,255,0.18)] transition-colors cursor-pointer"
                  >
                    Next <span>→</span>
                  </motion.button>
                </div>
              </div>

            </div>

            {/* Photo Guidelines Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4">
              <div className="flex items-center gap-2 text-slate-900">
                <ImageIcon className="w-5 h-5 text-[#2B7FFF]" />
                <h3 className="text-sm font-bold">Photo Guidelines</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                High-quality photos increase booking conversions by up to 80%. Follow these tips to get approved faster:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {guidelines.map((tip, idx) => {
                  const IconComp = tip.icon;
                  return (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className={`p-2 rounded-lg shrink-0 ${tip.color}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-800">{tip.text}</h4>
                        <p className="text-[10px] font-medium text-slate-400 leading-snug">{tip.desc}</p>
                      </div>
                    </div>
                  );
                })}
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

export default Page2;
