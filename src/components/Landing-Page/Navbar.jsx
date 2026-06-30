import React from 'react';
import CardNav from './CardNav'

const Navbar = () => {
    const items = [
        {
            label: "About",
            bgColor: "#1B1722",
            textColor: "#fff",
            links: [
                { label: "Company", ariaLabel: "About Company" },
                { label: "Careers", ariaLabel: "About Careers" }
            ]
        },
        {
            label: "Projects",
            bgColor: "#2F293A",
            textColor: "#fff",
            links: [
                { label: "Featured", ariaLabel: "Featured Projects" },
                { label: "Case Studies", ariaLabel: "Project Case Studies" }
            ]
        },
        {
            label: "Contact",
            bgColor: "#2F293A",
            textColor: "#fff",
            links: [
                { label: "Email", ariaLabel: "Email us" },
                { label: "Twitter", ariaLabel: "Twitter" },
                { label: "LinkedIn", ariaLabel: "LinkedIn" }
            ]
        }
    ];
    return (
        <>
            <nav className='sticky top-0 z-50 backdrop-blur-3xl h-16 w-full border-b-3 border-[#EAEAED] flex flex-row justify-evenly items-center'>
                <div className='flex flex-row items-center gap-3 text-lg font-bold'>
                    <img src="/box-stroke-rounded.svg" alt="" className='w-10 rounded-xl px-2 py-2   bg-[#2B7FFF]' />
                    <span className='text-[#2B7FFF]'>SpareSpace</span>
                </div>
                <div className='flex flex-row gap-4 text-[#71717B]'>
                    <span className='cursor-pointer'>Browse Space</span>
                    <span className='cursor-pointer'>Become a Host</span>
                    <span className='cursor-pointer'>How it Works</span>
                    <span className='cursor-pointer'>Pricing</span>
                </div>
                {/* <CardNav
                    
                    logoAlt="Company Logo"
                    items={items}
                    baseColor="#fff"
                    menuColor="#000"
                    buttonBgColor="#111"
                    buttonTextColor="#fff"
                    ease="power3.out"
                    
                /> */}
                <div className='flex flex-row gap-4 font-semibold'>
                    <button className='cursor-pointer '>Sign In</button>
                    <button className='cursor-pointer w-30 bg-[#2B7FFF] py-2  rounded-full text-white hover:scale-105 transition-transform'>Get Started</button>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
