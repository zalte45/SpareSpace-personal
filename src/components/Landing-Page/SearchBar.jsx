import React from 'react';

const SearchBar = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className='w-[90%] h-30  flex flex-row items-center justify-center gap-2 shadow-2xl rounded-2xl px-4 '>
                <div className='w-[50%]  text-sm  '>
                    <div className='font-semibold'>City or Zip Code</div>
                    <input className='w-full h-12 rounded-lg border border-[#EAEAED] placeholder:px-3 mt-2 outline-none' type="text" name="" id="" placeholder='e.g. 425127, Jalgoan' />
                </div>
                <div className='w-[30%]  text-sm  '>
                    <div className='font-semibold'>Storage Type</div>
                    <input className='w-full h-12 border border-[#EAEAED] rounded-lg placeholder:px-3 mt-2 outline-none' type="text" name="" id="" placeholder='Any Type' />
                </div>
                <div className='w-[20%]  text-sm pt-6 '>
                    <button id="hostBtn" className='cursor-pointer gap-1 flex flex-row items-center justify-center  w-full bg-[#2B7FFF] py-3  rounded-2xl text-white hover:scale-105 transition-transform'>
                        <lord-icon
                            src="https://cdn.lordicon.com/wjyqkiew.json"
                            trigger="hover"
                            target="#hostBtn"
                            colors="primary:#ffffff,secondary:#ffffff"
                            style={{ width: "25px", height: "25px" }}>
                        </lord-icon>
                        <span>
                            Search
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
