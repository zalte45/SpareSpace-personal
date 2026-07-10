import React from 'react';

const Menu = () => {
    return (
        <div className='text-[#71717B] font-semibold'>
            <div className='p-3'>
                <div className="logo flex flex-row items-center gap-2">
                    <img src="/box-stroke-rounded.svg" alt="" className='w-10 rounded-xl px-2 py-2 bg-[#2B7FFF] flex-shrink-0' />
                    <span className='logo-text text-lg font-bold text-black whitespace-nowrap overflow-hidden block'>
                        SpareSpace
                    </span>
                </div>
            </div>
            <div

                className='flex flex-col justify-center p-4 gap-1 relative'

            >
                {/* Hover Pill Background */}
                <div

                    className="absolute bg-[#E9F2FF] rounded-xl pointer-events-none opacity-0"

                />

                {/* Dashboard Item */}
                <div
                    className='menu-item hostBtn-1 flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate'

                >
                    <lord-icon
                        src="https://cdn.lordicon.com/vvkusrbh.json"
                        trigger="loop-on-hover"
                        colors="primary:#000000,secondary:#000000"
                        target=".hostBtn-1"
                        style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                    </lord-icon>
                    <div className='menu-text whitespace-nowrap overflow-hidden'>
                        DashBoard
                    </div>
                </div>

                {/* My Spaces Item */}
                <div
                    className='menu-item flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate'
                    id='hostBtn-2'

                >
                    <lord-icon
                        src="https://cdn.lordicon.com/jeuxydnh.json"
                        colors="primary:#000000,secondary:#000000"
                        target="#hostBtn-2"
                        trigger="loop-on-hover"
                        style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                    </lord-icon>
                    <div className='menu-text whitespace-nowrap overflow-hidden'>
                        My Spaces
                    </div>
                </div>

                {/* Booking Item */}
                <div
                    className='menu-item flex flex-row gap-2 p-2 cursor-pointer hostBtn-3 rounded-xl items-center relative isolate'

                >
                    <lord-icon
                        src="https://cdn.lordicon.com/uphbloed.json"
                        trigger="hover"
                        target=".hostBtn-3"
                        colors="primary:#000000,secondary:#000000"
                        style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                    </lord-icon>
                    <div className='menu-text whitespace-nowrap overflow-hidden'>
                        Booking
                    </div>
                </div>

                {/* Earning Item */}
                <div
                    className='menu-item hostBtn-4 flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate'

                >
                    <lord-icon
                        src="https://cdn.lordicon.com/bsdkzyjd.json"
                        trigger="hover"
                        target=".hostBtn-4"
                        colors="primary:#000000,secondary:#000000"
                        style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                    </lord-icon>
                    <div className='menu-text whitespace-nowrap overflow-hidden'>
                        Earning
                    </div>
                </div>

                {/* Messages Item */}
                <div
                    className='menu-item hostBtn-5 flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate'

                >
                    <lord-icon
                        src="https://cdn.lordicon.com/hcvnitxv.json"
                        trigger="hover"
                        target=".hostBtn-5"
                        colors="primary:#000000,secondary:#000000"
                        style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                    </lord-icon>
                    <div className='menu-text whitespace-nowrap overflow-hidden'>
                        Messages
                    </div>
                </div>

                {/* Analytics Item */}
                <div
                    className='menu-item hostBtn-6 flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate'

                >
                    <lord-icon
                        src="https://cdn.lordicon.com/lbcxnxti.json"
                        trigger="hover"
                        target=".hostBtn-6"
                        colors="primary:#000000,secondary:#000000"
                        style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                    </lord-icon>
                    <div className='menu-text whitespace-nowrap overflow-hidden'>
                        Analytics
                    </div>
                </div>

                {/* Profile Item */}
                <div
                    className='menu-item hostBtn-7 flex flex-row gap-2 p-2 cursor-pointer rounded-xl items-center relative isolate'

                >
                    <lord-icon
                        src="https://cdn.lordicon.com/kdduutaw.json"
                        trigger="hover"
                        target=".hostBtn-7"
                        colors="primary:#000000,secondary:#000000"
                        style={{ width: "25px", height: "25px", flexShrink: 0 }}>
                    </lord-icon>
                    <div className='menu-text whitespace-nowrap overflow-hidden'>
                        Profile
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Menu;
