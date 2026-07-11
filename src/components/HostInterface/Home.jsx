import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import Menu from './Menu';
import DashBoard from './DashBoard';
import Booking from './Booking';
import Profile from './Profile';
import Earning from './Earning';
import Message from './Message';
import Analytics from './Analytics';
import MySpace from './MySpace'


const Home = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [ActivePage, setActivePage] = useState("DashBoard");
    
    
    
    return (
        <>
            <div className='flex flex-row w-full min-h-screen bg-gray-50'>
                <motion.div
                    layout
                    animate={{ width: isCollapsed ? '72px' : '200px' }}
                    transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30
                    }}
                    className='border border-gray-200 shrink-0 h-screen overflow-hidden bg-white'
                >
                    <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} ActivePage={ActivePage} setActivePage={setActivePage} />
                </motion.div>
                <div className='flex-1 h-screen '>
                    {ActivePage === "DashBoard" && <DashBoard />}
                    {ActivePage === "Booking" && <Booking />}
                    {ActivePage === "Profile" && <Profile />}
                    {ActivePage === "Earning" && <Earning />}
                    {ActivePage === "Message" && <Message />}
                    {ActivePage === "Analytics" && <Analytics />}
                    {ActivePage === "MySpace" && <MySpace />}
                </div>
            </div>
        </>
    );
}

export default Home;
