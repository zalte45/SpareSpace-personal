import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

const Menu = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);


    const [hoveredIndex, setHoveredIndex] = useState(null);




    return (
        <motion.div
            layout
            className='text-[#71717B] font-semibold h-full flex flex-col justify-between bg-white'
        >
            <div className='flex-1'>
                {/* Logo Section */}
                <div className={`p-3 transition-all duration-300 ${props.isCollapsed ? 'px-2 flex justify-center' : ''}`}>
                    <div className={`logo flex flex-row items-center gap-2 ${props.isCollapsed ? 'justify-center' : ''}`}>
                        <motion.img
                            layout
                            src="/box-stroke-rounded.svg"
                            alt=""
                            className='w-10 rounded-xl px-2 py-2 bg-[#2B7FFF] shrink-0'
                        />
                        <AnimatePresence mode="popLayout">
                            {!props.isCollapsed && (
                                <motion.span
                                    key="logo-text"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className='logo-text text-lg font-bold text-black whitespace-nowrap overflow-hidden block'
                                >
                                    SpareSpace
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Menu Items Container */}
                <motion.div
                    layout
                    className={`flex flex-col justify-center gap-1 relative ${props.isCollapsed ? 'p-2' : 'p-4'}`}
                >
                    {/* Dashboard Item */}
                    <motion.div
                        layout
                        whileHover={{ scale: 1.02 }}

                        onClick={() => { props.setActivePage("DashBoard"); setActiveIndex(0); console.log(props.ActivePage) }}
                        onMouseEnter={() => setHoveredIndex(0)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`menu-item hostBtn-1 flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate ${props.isCollapsed ? 'justify-center' : ''}`}
                    >
                        {activeIndex === 0 && (
                            <motion.div

                                layoutId="activeIndicator"
                                className="absolute inset-0 bg-[#E9F2FF] rounded-xl -z-10"
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30
                                }}
                            />
                        )}
                        <AnimatePresence>
                            {hoveredIndex === 0 && activeIndex !== 0 && (
                                <motion.div

                                    layoutId="hoverIndicator"
                                    className="absolute inset-0 bg-[#E9F2FF]/60 rounded-xl -z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                />
                            )}
                        </AnimatePresence>
                        <motion.div

                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="shrink-0 flex items-center justify-center"
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/vvkusrbh.json"
                                trigger="loop-on-hover"
                                colors="primary:#000000,secondary:#000000"
                                target=".hostBtn-1"
                                style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                            </lord-icon>
                        </motion.div>
                        <AnimatePresence mode="popLayout">
                            {!props.isCollapsed && (
                                <motion.div

                                    key="label-dashboard"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className='menu-text whitespace-nowrap overflow-hidden'
                                >
                                    DashBoard
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* My Spaces Item */}
                    <motion.div
                        onClick={() => { props.setActivePage("MySpace"); setActiveIndex(1) }}
                        layout
                        whileHover={{ scale: 1.02 }}
                        onMouseEnter={() => setHoveredIndex(1)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        id='hostBtn-2'
                        className={`menu-item flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate 
                            ${props.isCollapsed ? 'justify-center' : ''}`}
                    >
                        {activeIndex === 1 && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute inset-0 bg-[#E9F2FF] rounded-xl -z-10"
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30
                                }}
                            />
                        )}
                        <AnimatePresence>
                            {hoveredIndex === 1 && activeIndex !== 1 && (
                                <motion.div
                                    layoutId="hoverIndicator"
                                    className="absolute inset-0 bg-[#E9F2FF]/60 rounded-xl -z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                />
                            )}
                        </AnimatePresence>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="shrink-0 flex items-center justify-center"
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/jeuxydnh.json"
                                colors="primary:#000000,secondary:#000000"
                                target="#hostBtn-2"
                                trigger="loop-on-hover"
                                style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                            </lord-icon>
                        </motion.div>
                        <AnimatePresence mode="popLayout">
                            {!props.isCollapsed && (
                                <motion.div
                                    key="label-myspaces"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className='menu-text whitespace-nowrap overflow-hidden'
                                >
                                    My Spaces
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Booking Item */}
                    <motion.div
                        layout
                        whileHover={{ scale: 1.02 }}
                        onClick={() => { setActiveIndex(2); props.setActivePage("Booking"); }}
                        onMouseEnter={() => setHoveredIndex(2)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`menu-item flex flex-row gap-2 p-2 cursor-pointer hostBtn-3 rounded-xl items-center relative isolate ${props.isCollapsed ? 'justify-center' : ''}`}
                    >
                        {activeIndex === 2 && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute inset-0 bg-[#E9F2FF] rounded-xl -z-10"
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30
                                }}
                            />
                        )}
                        <AnimatePresence>
                            {hoveredIndex === 2 && activeIndex !== 2 && (
                                <motion.div
                                    layoutId="hoverIndicator"
                                    className="absolute inset-0 bg-[#E9F2FF]/60 rounded-xl -z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                />
                            )}
                        </AnimatePresence>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="shrink-0 flex items-center justify-center"
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/uphbloed.json"
                                trigger="hover"
                                target=".hostBtn-3"
                                colors="primary:#000000,secondary:#000000"
                                style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                            </lord-icon>
                        </motion.div>
                        <AnimatePresence mode="popLayout">
                            {!props.isCollapsed && (
                                <motion.div
                                    key="label-booking"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className='menu-text whitespace-nowrap overflow-hidden'
                                >
                                    Booking
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Earning Item */}
                    <motion.div
                        layout
                        whileHover={{ scale: 1.02 }}
                        onClick={() => { setActiveIndex(3); props.setActivePage("Earning"); }}
                        onMouseEnter={() => setHoveredIndex(3)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`menu-item hostBtn-4 flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate ${props.isCollapsed ? 'justify-center' : ''}`}
                    >
                        {activeIndex === 3 && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute inset-0 bg-[#E9F2FF] rounded-xl -z-10"
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30
                                }}
                            />
                        )}
                        <AnimatePresence>
                            {hoveredIndex === 3 && activeIndex !== 3 && (
                                <motion.div
                                    layoutId="hoverIndicator"
                                    className="absolute inset-0 bg-[#E9F2FF]/60 rounded-xl -z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                />
                            )}
                        </AnimatePresence>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="shrink-0 flex items-center justify-center"
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/bsdkzyjd.json"
                                trigger="hover"
                                target=".hostBtn-4"
                                colors="primary:#000000,secondary:#000000"
                                style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                            </lord-icon>
                        </motion.div>
                        <AnimatePresence mode="popLayout">
                            {!props.isCollapsed && (
                                <motion.div
                                    key="label-earning"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className='menu-text whitespace-nowrap overflow-hidden'
                                >
                                    Earning
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Messages Item */}
                    <motion.div
                        layout
                        whileHover={{ scale: 1.02 }}
                        onClick={() => { setActiveIndex(4); props.setActivePage("Message") }}
                        onMouseEnter={() => setHoveredIndex(4)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`menu-item hostBtn-5 flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate ${props.isCollapsed ? 'justify-center' : ''}`}
                    >
                        {activeIndex === 4 && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute inset-0 bg-[#E9F2FF] rounded-xl -z-10"
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30
                                }}
                            />
                        )}
                        <AnimatePresence>
                            {hoveredIndex === 4 && activeIndex !== 4 && (
                                <motion.div
                                    layoutId="hoverIndicator"
                                    className="absolute inset-0 bg-[#E9F2FF]/60 rounded-xl -z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                />
                            )}
                        </AnimatePresence>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="shrink-0 flex items-center justify-center"
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/hcvnitxv.json"
                                trigger="hover"
                                target=".hostBtn-5"
                                colors="primary:#000000,secondary:#000000"
                                style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                            </lord-icon>
                        </motion.div>
                        <AnimatePresence mode="popLayout">
                            {!props.isCollapsed && (
                                <motion.div
                                    key="label-messages"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className='menu-text whitespace-nowrap overflow-hidden'
                                >
                                    Messages
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Analytics Item */}
                    <motion.div
                        layout
                        whileHover={{ scale: 1.02 }}
                        onClick={() => { setActiveIndex(5); props.setActivePage("Analytics") }}
                        onMouseEnter={() => setHoveredIndex(5)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`menu-item hostBtn-6 flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate ${props.isCollapsed ? 'justify-center' : ''}`}
                    >
                        {activeIndex === 5 && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute inset-0 bg-[#E9F2FF] rounded-xl -z-10"
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30
                                }}
                            />
                        )}
                        <AnimatePresence>
                            {hoveredIndex === 5 && activeIndex !== 5 && (
                                <motion.div
                                    layoutId="hoverIndicator"
                                    className="absolute inset-0 bg-[#E9F2FF]/60 rounded-xl -z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                />
                            )}
                        </AnimatePresence>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="shrink-0 flex items-center justify-center"
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/lbcxnxti.json"
                                trigger="hover"
                                target=".hostBtn-6"
                                colors="primary:#000000,secondary:#000000"
                                style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                            </lord-icon>
                        </motion.div>
                        <AnimatePresence mode="popLayout">
                            {!props.isCollapsed && (
                                <motion.div
                                    key="label-analytics"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className='menu-text whitespace-nowrap overflow-hidden'
                                >
                                    Analytics
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Profile Item */}
                    <motion.div
                        layout
                        whileHover={{ scale: 1.02 }}
                        onClick={() => { setActiveIndex(6); props.setActivePage("Profile") }}
                        onMouseEnter={() => setHoveredIndex(6)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`menu-item hostBtn-7 flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate ${props.isCollapsed ? 'justify-center' : ''}`}
                    >
                        {activeIndex === 6 && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute inset-0 bg-[#E9F2FF] rounded-xl -z-10"
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30
                                }}
                            />
                        )}
                        <AnimatePresence>
                            {hoveredIndex === 6 && activeIndex !== 6 && (
                                <motion.div
                                    layoutId="hoverIndicator"
                                    className="absolute inset-0 bg-[#E9F2FF]/60 rounded-xl -z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                />
                            )}
                        </AnimatePresence>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="shrink-0 flex items-center justify-center"
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/kdduutaw.json"
                                trigger="hover"
                                target=".hostBtn-7"
                                colors="primary:#000000,secondary:#000000"
                                style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                            </lord-icon>
                        </motion.div>
                        <AnimatePresence mode="popLayout">
                            {!props.isCollapsed && (
                                <motion.div
                                    key="label-profile"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className='menu-text whitespace-nowrap overflow-hidden'
                                >
                                    Profile
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>

            {/* Collapse Toggle Button at the bottom */}
            <div className={`p-4 border-t border-gray-200 transition-all duration-300 ${props.isCollapsed ? 'px-2' : ''}`}>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => props.setIsCollapsed(!props.isCollapsed)}
                    className={`flex items-center justify-center p-2 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer w-full text-[#71717B] border border-gray-200 ${props.isCollapsed ? 'gap-0' : 'gap-2'}`}
                >
                    <motion.div
                        animate={{ rotate: props.isCollapsed ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className='flex items-center justify-center shrink-0 text-black'
                    >
                        <ChevronLeft size={20} />
                    </motion.div>
                    <AnimatePresence mode="popLayout">
                        {!props.isCollapsed && (
                            <motion.span
                                key="collapse-text"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className='text-sm font-semibold whitespace-nowrap overflow-hidden block'
                            >
                                Collapse
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Menu;
