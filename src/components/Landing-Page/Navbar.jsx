import React, { useLayoutEffect, useRef } from 'react';
import CardNav from './CardNav';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navbarRef = useRef(null);

    useLayoutEffect(() => {
        // Create GSAP context for proper scoping and cleanup on unmount
        const ctx = gsap.context(() => {
            gsap.from(navbarRef.current, {
                opacity: 0,
                y: -40,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
        return () => ctx.revert();
    }, []);

    const items = [
        {
            label: "Browse Spaces",
            bgColor: "#2B7FFF",
            textColor: "#fff",
            links: [
                { label: "Nearby Storage", href: "#", ariaLabel: "Browse Nearby Storage" },
                { label: "Garages", href: "#", ariaLabel: "Browse Garages" },
                { label: "Warehouses", href: "#", ariaLabel: "Browse Warehouses" },
                { label: "Parking Spaces", href: "#", ariaLabel: "Browse Parking Spaces" }
            ]
        },
        {
            label: "Become a Host",
            bgColor: "#F4F4F5",
            textColor: "#111827",
            links: [
                { label: "List Your Space", href: "#", ariaLabel: "List Your Space" },
                { label: "Host Guide", href: "#", ariaLabel: "Host Guide" },
                { label: "Estimated Earnings", href: "#", ariaLabel: "Estimated Earnings" }
            ]
        },
        {
            label: "Support",
            bgColor: "#111827",
            textColor: "#fff",
            links: [
                { label: "FAQ", href: "#", ariaLabel: "FAQ" },
                { label: "Contact Us", href: "#", ariaLabel: "Contact Us" },
                { label: "Help Center", href: "#", ariaLabel: "Help Center" }
            ]
        }
    ];

    return (
        <>
            <nav 
                ref={navbarRef}
                className='sticky top-0 z-50 backdrop-blur-3xl h-16 w-full border-b border-[#EAEAED] flex flex-row justify-evenly items-center'
            >
                {/* ─── Logo */}
                <div className='flex flex-row items-center gap-3 text-lg font-bold'>
                    <img src="/box-stroke-rounded.svg" alt="" className='w-10 rounded-xl px-2 py-2 bg-[#2B7FFF]' />
                    <span className='text-[#2B7FFF]'>SpareSpace</span>
                </div>

                {/* ─── Nav links */}
                <div className='hidden md:flex flex-row items-center gap-6 text-[#71717B]'>
                    <CardNav
                        items={items}
                        ease="power3.out"
                    />
                </div>

                {/* ─── CTA buttons */}
                <div className='flex flex-row gap-4 font-semibold'>
                    {/* <button  className='cursor-pointer hover:text-[#2B7FFF] transition-colors duration-200'>
                        Sign In
                        </button> */}
                        <Link to='/SignIn-Up'>
                    <button className='cursor-pointer w-30 bg-[#2B7FFF] py-2 rounded-full text-white hover:scale-105 transition-transform'>Get Started</button>
                        </Link>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
