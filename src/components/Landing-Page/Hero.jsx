import React from 'react';
import SearchBar from './SearchBar';
const Hero = () => {
    return (
        <>
            <div className='flex flex-row m-10 ml-20 h-[70vh] '>
                <div className='w-[50%]  flex flex-col gap-9 '>
                    <div className='bg-[#F4F4F5] w-70 text-center rounded-full text-[#2B7FFF] font-semibold'>Neighborhood Storage Marketplace</div>
                    <div className='font-bold text-6xl flex flex-col '>
                        <span>
                            Turn Unused Space
                        </span>
                        <span>
                            Into Monthly Income
                        </span>
                    </div>
                    <div className='text-[#71717B] text-lg flex flex-col' >
                        <span>Rent out garages, sheds,rooms and storage areas to trust</span>
                        <span>people in your neighborhood</span>
                    </div>
                    <div className='flex gap-3 '>
                        <button id="hostBtn" className='cursor-pointer gap-1 flex flex-row items-center px-4 w-40 bg-[#2B7FFF] py-4  rounded-full text-white hover:scale-105 transition-transform'>
                            <lord-icon
                                src="https://cdn.lordicon.com/wjyqkiew.json"
                                trigger="hover"
                                target="#hostBtn"
                                colors="primary:#ffffff,secondary:#ffffff"
                                style={{ width: "25px", height: "25px" }}>
                            </lord-icon>
                            <span>
                                Find Storage
                            </span>
                        </button>
                        <button
                            id="hostBtn"
                            className="cursor-pointer flex items-center rounded-full text-[#2B7FFF] hover:scale-105 transition-transform"
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/jeuxydnh.json"
                                trigger="loop-on-hover"
                                target="#hostBtn"
                                colors="primary:#2b7fff,secondary:#2b7fff"
                                style={{ width: "25px", height: "25px" }}
                            ></lord-icon>

                            <span>Become a Host</span>
                        </button>
                    </div>
                    <div className='flex flex-row items-center gap-8'>
                        <div className='flex flex-col'>
                            <span className='text-3xl font-bold'>12k+</span>
                            <span className='text-[#71717B]'>Active Spaces</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-3xl font-bold'>8k+</span>
                            <span className='text-[#71717B]'>Happy Hosts</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-3xl font-bold flex flex-row items-center gap-1'>
                                <span>
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
                <div className='w-[50%]  flex items-center justify-center '>
                    <img className='h-123 rounded-4xl shadow-2xl' src="./garage.jpg" alt="an garage img" />
                </div>
            </div>
            <SearchBar/>
        </>
    ); 
}

export default Hero;
