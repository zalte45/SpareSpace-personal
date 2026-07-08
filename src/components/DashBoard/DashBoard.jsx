import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const DashBoard = () => {
    const [open, setOpen] = useState(true);
    // State to track which menu item is currently hovered
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <>
            <div className='flex flex-row w-full min-h-screen'>
                <motion.div
                    animate={{ width: open ? "15%" : "72px" }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                    className='h-screen  flex flex-col justify-between overflow-hidden relative flex-shrink-0 bg-white'
                >
                    <div className='text-[#71717B] font-semibold'>
                        <div className='p-3'>
                            <div className="logo flex flex-row items-center gap-2">
                                <img src="/box-stroke-rounded.svg" alt="" className='w-10 rounded-xl px-2 py-2 bg-[#2B7FFF] flex-shrink-0' />
                                <motion.span
                                    animate={{
                                        opacity: open ? 1 : 0,
                                        width: open ? "auto" : 0,
                                        x: open ? 0 : -10
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className='text-lg font-bold text-black whitespace-nowrap overflow-hidden block'
                                >
                                    SpareSpace
                                </motion.span>
                            </div>
                        </div>
                        {/* 
                            Parent container of the menu list.
                            onMouseLeave resets the hoveredIndex to null so the hover indicator fades/slides out.
                        */}
                        <div 
                            className='flex flex-col justify-center p-4 gap-1'
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Dashboard Item */}
                            <div 
                                className='hostBtn-1 flex flex-row gap-2 p-2 .icon-1 cursor-pointer rounded-xl items-center relative isolate'
                                onMouseEnter={() => setHoveredIndex(0)}
                            >
                                {hoveredIndex === 0 && (
                                    <motion.div
                                        layoutId="sidebar-hover"
                                        className="absolute inset-0 bg-[#E9F2FF] rounded-xl -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <lord-icon
                                    src="https://cdn.lordicon.com/vvkusrbh.json"
                                    trigger="loop-on-hover"
                                    colors="primary:#000000,secondary:#000000"
                                    target=".hostBtn-1"
                                    style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                                </lord-icon>
                                <motion.div
                                    animate={{
                                        opacity: open ? 1 : 0,
                                        width: open ? "auto" : 0,
                                        x: open ? 0 : -10
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className='whitespace-nowrap overflow-hidden'
                                >
                                    DashBoard
                                </motion.div>
                            </div>

                            {/* My Spaces Item */}
                            <div 
                                className='flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate' 
                                id='hostBtn-2'
                                onMouseEnter={() => setHoveredIndex(1)}
                            >
                                {hoveredIndex === 1 && (
                                    <motion.div
                                        layoutId="sidebar-hover"
                                        className="absolute inset-0 bg-[#E9F2FF] rounded-xl -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <lord-icon
                                    src="https://cdn.lordicon.com/jeuxydnh.json"
                                    colors="primary:#000000,secondary:#000000"
                                    target="#hostBtn-2"
                                    trigger="loop-on-hover"
                                    style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                                </lord-icon>
                                <motion.div
                                    animate={{
                                        opacity: open ? 1 : 0,
                                        width: open ? "auto" : 0,
                                        x: open ? 0 : -10
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className='whitespace-nowrap overflow-hidden'
                                >
                                    My Spaces
                                </motion.div>
                            </div>

                            {/* Booking Item */}
                            <div 
                                className='flex flex-row gap-2 p-2 cursor-pointer hostBtn-3 rounded-xl items-center relative isolate'
                                onMouseEnter={() => setHoveredIndex(2)}
                            >
                                {hoveredIndex === 2 && (
                                    <motion.div
                                        layoutId="sidebar-hover"
                                        className="absolute inset-0 bg-[#E9F2FF] rounded-xl -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <lord-icon
                                    src="https://cdn.lordicon.com/uphbloed.json"
                                    trigger="hover"
                                    target=".hostBtn-3"
                                    colors="primary:#000000,secondary:#000000"
                                    style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                                </lord-icon>
                                <motion.div
                                    animate={{
                                        opacity: open ? 1 : 0,
                                        width: open ? "auto" : 0,
                                        x: open ? 0 : -10
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className='whitespace-nowrap overflow-hidden'
                                >
                                    Booking
                                </motion.div>
                            </div>

                            {/* Earning Item */}
                            <div 
                                className='hostBtn-4 flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate'
                                onMouseEnter={() => setHoveredIndex(3)}
                            >
                                {hoveredIndex === 3 && (
                                    <motion.div
                                        layoutId="sidebar-hover"
                                        className="absolute inset-0 bg-[#E9F2FF] rounded-xl -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <lord-icon
                                    src="https://cdn.lordicon.com/bsdkzyjd.json"
                                    trigger="hover"
                                    target=".hostBtn-4"
                                    colors="primary:#000000,secondary:#000000"
                                    style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                                </lord-icon>
                                <motion.div
                                    animate={{
                                        opacity: open ? 1 : 0,
                                        width: open ? "auto" : 0,
                                        x: open ? 0 : -10
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className='whitespace-nowrap overflow-hidden'
                                >
                                    Earning
                                </motion.div>
                            </div>

                            {/* Messages Item */}
                            <div 
                                className='hostBtn-5 flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate'
                                onMouseEnter={() => setHoveredIndex(4)}
                            >
                                {hoveredIndex === 4 && (
                                    <motion.div
                                        layoutId="sidebar-hover"
                                        className="absolute inset-0 bg-[#E9F2FF] rounded-xl -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <lord-icon
                                    src="https://cdn.lordicon.com/hcvnitxv.json"
                                    trigger="hover"
                                    target=".hostBtn-5"
                                    colors="primary:#000000,secondary:#000000"
                                    style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                                </lord-icon>
                                <motion.div
                                    animate={{
                                        opacity: open ? 1 : 0,
                                        width: open ? "auto" : 0,
                                        x: open ? 0 : -10
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className='whitespace-nowrap overflow-hidden'
                                >
                                    Messages
                                </motion.div>
                            </div>

                            {/* Analytics Item */}
                            <div 
                                className='hostBtn-6 flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate'
                                onMouseEnter={() => setHoveredIndex(5)}
                            >
                                {hoveredIndex === 5 && (
                                    <motion.div
                                        layoutId="sidebar-hover"
                                        className="absolute inset-0 bg-[#E9F2FF] rounded-xl -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <lord-icon
                                    src="https://cdn.lordicon.com/lbcxnxti.json"
                                    trigger="hover"
                                    target=".hostBtn-6"
                                    colors="primary:#000000,secondary:#000000"
                                    style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                                </lord-icon>
                                <motion.div
                                    animate={{
                                        opacity: open ? 1 : 0,
                                        width: open ? "auto" : 0,
                                        x: open ? 0 : -10
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className='whitespace-nowrap overflow-hidden'
                                >
                                    Analytics
                                </motion.div>
                            </div>

                            {/* Profile Item */}
                            <div 
                                className='hostBtn-7 flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate'
                                onMouseEnter={() => setHoveredIndex(6)}
                            >
                                {hoveredIndex === 6 && (
                                    <motion.div
                                        layoutId="sidebar-hover"
                                        className="absolute inset-0 bg-[#E9F2FF] rounded-xl -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <lord-icon
                                    src="https://cdn.lordicon.com/kdduutaw.json"
                                    trigger="hover"
                                    target=".hostBtn-7"
                                    colors="primary:#000000,secondary:#000000"
                                    style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                                </lord-icon>
                                <motion.div
                                    animate={{
                                        opacity: open ? 1 : 0,
                                        width: open ? "auto" : 0,
                                        x: open ? 0 : -10
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className='whitespace-nowrap overflow-hidden'
                                >
                                    Profile
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    {/* Toggle button section at the bottom (remains unaffected) */}
                    <div className='flex flex-col items-center justify-center gap-2 mb-4 w-full'>

                        <motion.button
                            onClick={() => setOpen(!open)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='flex items-center justify-center p-2 rounded-xl bg-gray-50 border border-gray-200 hover:bg-[#E9F2FF] hover:border-[#2B7FFF] cursor-pointer text-gray-700 transition-colors'
                            style={{ width: "40px", height: "40px" }}
                        >
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                animate={{ rotate: open ? 0 : 180 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <polyline points="15 18 9 12 15 6" />
                            </motion.svg>
                        </motion.button>
                    </div>
                </motion.div>
                <div className='flex-1 h-screen border-2'>
                    <div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default DashBoard;
