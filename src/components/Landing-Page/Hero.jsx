import React, { useLayoutEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import { gsap } from 'gsap';

const Hero = () => {
    const badgeRef = useRef(null);
    const headingRef = useRef(null);
    const paragraphRef = useRef(null);
    const buttonsRef = useRef(null);
    const statsRef = useRef(null);
    const imageRef = useRef(null);

    // References to specific elements for counting animation
    const stat1Ref = useRef(null);
    const stat2Ref = useRef(null);
    const stat3Ref = useRef(null);

    useLayoutEffect(() => {
        // Create GSAP context for proper cleanup of all animations on unmount
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // 1. Hero Badge animation (fades and moves up slightly)
            tl.from(badgeRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                delay: 0.2,
                ease: 'power2.out'
            });

            // 2. Hero Heading animation (animates each line span separately)
            if (headingRef.current) {
                tl.from(headingRef.current.children, {
                    opacity: 0,
                    y: 50,
                    stagger: 0.15,
                    duration: 1,
                    ease: 'power4.out'
                }, '-=0.4');
            }

            // 3. Hero Paragraph animation
            tl.from(paragraphRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.6');

            // 4. Find Storage / Become a Host buttons animation (staggered together)
            if (buttonsRef.current) {
                tl.from(buttonsRef.current.children, {
                    opacity: 0,
                    y: 30,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.6');
            }

            // 5. Statistics container stagger entrance animation
            if (statsRef.current) {
                tl.from(statsRef.current.children, {
                    opacity: 0,
                    y: 20,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.6');
            }

            // 6. Statistics values count-up animation running in parallel
            const countValues = { val1: 0, val2: 0, val3: 0 };
            
            gsap.to(countValues, {
                val1: 12,
                duration: 1.5,
                ease: 'power2.out',
                delay: 0.8,
                onUpdate: () => {
                    if (stat1Ref.current) {
                        stat1Ref.current.innerText = Math.floor(countValues.val1) + 'k+';
                    }
                }
            });

            gsap.to(countValues, {
                val2: 8,
                duration: 1.5,
                ease: 'power2.out',
                delay: 0.9,
                onUpdate: () => {
                    if (stat2Ref.current) {
                        stat2Ref.current.innerText = Math.floor(countValues.val2) + 'k+';
                    }
                }
            });

            gsap.to(countValues, {
                val3: 4.9,
                duration: 1.5,
                ease: 'power2.out',
                delay: 1.0,
                onUpdate: () => {
                    if (stat3Ref.current) {
                        stat3Ref.current.innerText = countValues.val3.toFixed(1);
                    }
                }
            });

            // 7. Hero Image animation (slide in from right and scale up slightly)
            tl.from(imageRef.current, {
                opacity: 0,
                x: 80,
                scale: 0.95,
                duration: 1.2,
                ease: 'power3.out'
            }, 0.4);
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div className='flex flex-row m-10 ml-20 h-[70vh] '>
                <div className='w-[50%]  flex flex-col gap-9 '>
                    {/* Badge */}
                    <div 
                        ref={badgeRef} 
                        className='bg-[#F4F4F5] w-70 text-center rounded-full text-[#2B7FFF] font-semibold'
                    >
                        Neighborhood Storage Marketplace
                    </div>

                    {/* Heading */}
                    <div 
                        ref={headingRef} 
                        className='font-bold text-6xl flex flex-col '
                    >
                        <span>
                            Turn Unused Space
                        </span>
                        <span>
                            Into Monthly Income
                        </span>
                    </div>

                    {/* Description Paragraph */}
                    <div 
                        ref={paragraphRef} 
                        className='text-[#71717B] text-lg flex flex-col'
                    >
                        <span>Rent out garages, sheds,rooms and storage areas to trust</span>
                        <span>people in your neighborhood</span>
                    </div>

                    {/* Action Buttons */}
                    <div ref={buttonsRef} className='flex gap-3 '>
                        <button 
                            id="hostBtn" 
                            className='cursor-pointer gap-1 flex flex-row items-center px-4 w-40 bg-[#2B7FFF] py-4 rounded-full text-white hover:scale-105 hover:shadow-xl transition-all duration-300'
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/wjyqkiew.json"
                                trigger="hover"
                                target="#hostBtn"
                                colors="primary:#ffffff,secondary:#ffffff"
                                style={{ width: "25px", height: "25px" }}
                            />
                            <span>
                                Find Storage
                            </span>
                        </button>
                        <button
                            id="hostBtn"
                            className="cursor-pointer flex items-center gap-1 rounded-full text-[#2B7FFF] hover:scale-105 hover:shadow-md transition-all duration-300"
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/jeuxydnh.json"
                                trigger="loop-on-hover"
                                target="#hostBtn"
                                colors="primary:#2b7fff,secondary:#2b7fff"
                                style={{ width: "25px", height: "25px" }}
                            />
                            <span>Become a Host</span>
                        </button>
                    </div>

                    {/* Stats */}
                    <div ref={statsRef} className='flex flex-row items-center gap-8'>
                        <div className='flex flex-col'>
                            <span ref={stat1Ref} className='text-3xl font-bold'>12k+</span>
                            <span className='text-[#71717B]'>Active Spaces</span>
                        </div>
                        <div className='flex flex-col'>
                            <span ref={stat2Ref} className='text-3xl font-bold'>8k+</span>
                            <span className='text-[#71717B]'>Happy Hosts</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-3xl font-bold flex flex-row items-center gap-1'>
                                <span ref={stat3Ref}>
                                    4.9
                                </span>
                                <span>
                                    <img className='w-4' src="./star.svg" alt="" />
                                </span>
                            </span>
                            <span className='text-[#71717B]'>Avg Rating</span>
                        </div>
                    </div>
                </div>
                
                {/* Hero Image */}
                <div className='w-[50%]  flex items-center justify-center '>
                    <img 
                        ref={imageRef} 
                        className='h-123 rounded-4xl shadow-2xl' 
                        src="./garage.jpg" 
                        alt="an garage img" 
                    />
                </div>
            </div>
            <SearchBar/>
        </>
    ); 
}

export default Hero;
