import React from 'react';

const Working = () => {
  return (
    <div className='w-full flex flex-col items-center pt-14 gap-6 h-220'>
      <div className='text-[#2B7FFF] font-semibold '>How it Works</div>
      <div className='text-4xl font-bold'>Storage in three simple steps</div>
      <div className='flex flex-row gap-16'>
        <div className='host-container1 h-55 w-80 flex flex-col shadow-lg hover:scale-105 transition-transform rounded-2xl p-6 gap-4 '>
          <div className='flex flex-row justify-between pt-2 items-center'>
            <span className='bg-[#2B7FFF] text-white font-bold rounded-full px-4 py-2'>
              1
            </span>
            <span className='bg-[#F4F4F5] px-2 py-2 rounded-xl flex item'>
              <lord-icon
                src="https://cdn.lordicon.com/wjyqkiew.json"
                trigger="loop-on-hover"
                target=".host-container1"
                colors="primary:#2b7fff,secondary:#2b7fff"
                style={{ width: "25px", height: "25px" }}>
              </lord-icon>
            </span>
          </div>
          <div className='flex flex-col gap-4  pt-3'>
            <span className='text-xl font-semibold'>Find a Space</span>
            <span className='text-[#71717B]'>Browse hundreds of local storage options near you.</span>
          </div>
        </div>
        <div className='host-container2 h-55 w-80 flex flex-col shadow-lg rounded-2xl p-6 gap-4 hover:scale-105 transition-transform'>
          <div className='flex flex-row justify-between pt-2 items-center'>
            <span className='bg-[#2B7FFF] text-white font-bold rounded-full px-4 py-2'>
              2
            </span>
            <span className='bg-[#F4F4F5] px-2 py-2 rounded-xl flex item'>
              <lord-icon
                src="https://cdn.lordicon.com/apbwvyeg.json"
                trigger="loop-on-hover"
                target=".host-container2"
                colors="primary:#2b7fff,secondary:#2b7fff"
                style={{ width: "25px", height: "25px" }}>
              </lord-icon>
            </span>
          </div>
          <div className='flex flex-col gap-4  pt-3'>
            <span className='text-xl font-semibold'>Book Securely</span>
            <span className='text-[#71717B]'>Reserve your space with secure payments and verified hosts.</span>
          </div>
        </div>
        <div className='host-container h-55 w-80 flex flex-col shadow-lg rounded-2xl p-6 gap-4 hover:scale-105 transition-transform' >
          <div className=' flex flex-row justify-between pt-2 items-center' >
            <span className='bg-[#2B7FFF] text-white font-bold rounded-full px-4 py-2'>
              3
            </span>
            <span className='bg-[#F4F4F5] px-2 py-2 rounded-xl flex item'>
              <lord-icon
                src="https://cdn.lordicon.com/byupthur.json"
                trigger="loop-on-hover"
                target=".host-container"
                colors="primary:#2b7fff,secondary:#2b7fff"
                style={{ width: "25px", height: "25px" }}>
              </lord-icon>
            </span>
          </div>
          <div className='flex flex-col gap-4  pt-3'>
            <span className='text-xl font-semibold'>Store Your Belongings</span>
            <span className='text-[#71717B]'>Move in on your chosen date and enjoy flexible storage.</span>
          </div>
        </div>
      </div>
      <div className='w-[90vw]'>
        <div className='text-4xl font-bold'>Popular Storage Types</div>
        <div className='flex flex-row items-center gap-6 pt-3' >
          <div className='host-container4 flex flex-row gap-2 justify-center  bg-[#F4F4F5] rounded-4xl py-1 px-6 items-center'>
            <span className='flex items-center'>
              <lord-icon
                src="https://cdn.lordicon.com/njpauqoc.json"
                trigger="loop-on-hover"
                target=".host-container4"
                colors="primary:#2b7fff,secondary:#2b7fff"
                style={{ width: "20px", height: "20px" }}>
              </lord-icon>
            </span>
            <span className='font-semibold text-[#2B7FFF]'>
              Garage
            </span>
          </div>
          <div className='host-container4 flex flex-row gap-2 justify-center  bg-[#F4F4F5] rounded-4xl py-1 px-6 items-center'>
            <span className='flex items-center'>
              <lord-icon
                src="https://cdn.lordicon.com/skpqewwt.json"
                trigger="loop-on-hover"
                target=".host-container4"
                colors="primary:#2b7fff,secondary:#2b7fff"
                style={{ width: "20px", height: "20px" }}>
              </lord-icon>
            </span>
            <span className='font-semibold text-[#2B7FFF]'>
              Spare Room
            </span>
          </div>
          <div className='host-container4 flex flex-row gap-2 justify-center  bg-[#F4F4F5] rounded-4xl py-1 px-6 items-center'>
            <span className='flex items-center'>
              <lord-icon
                src="https://cdn.lordicon.com/jeuxydnh.json"
                trigger="loop-on-hover"
                target=".host-container4"
                colors="primary:#2b7fff,secondary:#2b7fff"
                style={{ width: "20px", height: "20px" }}>
              </lord-icon>
            </span>
            <span className='font-semibold text-[#2B7FFF]'>
              Basement
            </span>
          </div>
          <div className='host-container4 flex flex-row gap-2 justify-center  bg-[#F4F4F5] rounded-4xl py-1 px-6 items-center'>
            <span className='flex items-center'>
              <lord-icon
                src="https://cdn.lordicon.com/rezibkiy.json"
                trigger="loop-on-hover"
                target=".host-container4"
                colors="primary:#2b7fff,secondary:#2b7fff"
                style={{ width: "20px", height: "20px" }}>
              </lord-icon>
            </span>
            <span className='font-semibold text-[#2B7FFF]'>
              Attic
            </span>
          </div>
          <div className='host-container4 flex flex-row gap-2 justify-center  bg-[#F4F4F5] rounded-4xl py-1 px-6 items-center'>
            <span className='flex items-center'>
              <img src="./parking.svg" alt="" />
            </span>
            <span className='font-semibold text-[#2B7FFF]'>
              Attic
            </span>
          </div>

        </div>
      </div>
      <div className='flex flex-row justify-evenly w-[90vw]'>
        <div className='h-[40vh] w-[30vw] shadow-xl rounded-xl flex flex-col justify-evenly p-4 hover:scale-105 transition-transform'>
          <div className='flex flex-row items-center gap-2'>
            <div className='flex items-center bg-[#F4F4F5] rounded-lg px-1 py-1'>
              <lord-icon
                src="https://cdn.lordicon.com/spzqjmbt.json"
                trigger="hover"
                colors="primary:#2b7fff"
                style={{ width: "35px", height: "35px" }}>
              </lord-icon>
            </div>
            <div className='font-bold text-2xl'>For Renters</div>
          </div>

          <div className='flex flex-row items-center gap-2 pl-5'>
            <span>
              <img src="./checkmark.svg" alt="" />
            </span>
            <span className='flex flex-col'>
              <span className='font-semibold'>
                Affordable
              </span>
              <span className='text-[#71717B]'>
                Pay a fraction of traditional storage unit prices.
              </span>
            </span>
          </div>

          <div className='flex flex-row items-center gap-2 pl-5'>
            <span>
              <img src="./checkmark.svg" alt="" />
            </span>
            <span className='flex flex-col'>
              <span className='font-semibold'>
                Local
              </span>
              <span className='text-[#71717B]'>
                Find storage just minutes from your front door.
              </span>
            </span>
          </div>

          <div className='flex flex-row items-center gap-2 pl-5'>
            <span>
              <img src="./checkmark.svg" alt="" />
            </span>
            <span className='flex flex-col'>
              <span className='font-semibold'>
                Secure
              </span>
              <span className='text-[#71717B]'>
                Verified hosts and protected payments on every booking.
              </span>
            </span>
          </div>
        </div>
        <div className='h-[40vh] w-[30vw] shadow-xl rounded-xl flex flex-col justify-evenly p-4 hover:scale-105 transition-transform'>
          <div className='flex flex-row items-center gap-2'>
            <div className='flex items-center bg-[#F4F4F5] rounded-lg px-1 py-1'>
              <lord-icon
                src="https://cdn.lordicon.com/ewtxwele.json"
                trigger="hover"
                colors="primary:#2b7fff"
                style={{ width: "35px", height: "35px" }}>
              </lord-icon>
            </div>
            <div className='font-bold text-2xl'>For Hosts</div>
          </div>

          <div className='flex flex-row items-center gap-2 pl-5'>
            <span>
              <img src="./checkmark.svg" alt="" />
            </span>
            <span className='flex flex-col'>
              <span className='font-semibold'>
                Earn Extra Income
              </span>
              <span className='text-[#71717B]'>
                Make money from space you already have.
              </span>
            </span>
          </div>

          <div className='flex flex-row items-center gap-2 pl-5'>
            <span>
              <img src="./checkmark.svg" alt="" />
            </span>
            <span className='flex flex-col'>
              <span className='font-semibold'>
                Flexible Availability
              </span>
              <span className='text-[#71717B]'>
                List your space on your own schedule and terms.
              </span>
            </span>
          </div>

          <div className='flex flex-row items-center gap-2 pl-5'>
            <span>
              <img src="./checkmark.svg" alt="" />
            </span>
            <span className='flex flex-col'>
              <span className='font-semibold'>
                Easy Management
              </span>
              <span className='text-[#71717B]'>
                Manage bookings and payouts from one dashboard.
              </span>
            </span>
          </div>
        </div>
      </div>




    </div>
  );
}

export default Working;
