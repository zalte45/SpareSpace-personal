import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Forgot = () => {
    const [IsRight, setIsRight] = useState(true)
    const ChangeRight=() => {
      setIsRight(false)
    }
    
    return (
        <>
        {IsRight ?(
            <div className='flex items-center justify-center w-screen h-screen'>
                <div className='flex-col  h-120 w-100 rounded-2xl shadow-2xl flex items-center justify-center gap-3'>
                    <div className='flex items-center justify-center bg-[#EFF6FF] rounded-full w-12 py-3'><img src="/public/lock.svg" alt="" /></div>
                    <div className='text-2xl font-semibold'>Forgot your Password ?</div>
                    <div className='text-sm text-[#71717B]'>Enter your email address and we'll send you OTP</div>
                    <div className='flex flex-col font'>
                        <span className='font-semibold'>Email Address</span>
                        <input className=' placeholder:text-[#71717B]  bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="text" name='username' id='' placeholder='Enter your email' />
                    </div>
                    <div>
                        <button className='w-80 bg-[#2B7FFF] px-4 py-2  rounded-sm cursor-pointer text-white hover:scale-105 transition-transform'>Send OTP</button>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-semibold'>
                            Enter OTP
                        </span>
                        <input className=' placeholder:text-[#71717B]  bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="text" name='username' id='' placeholder='Enter OTP' />
                    </div>
                    <div className='flex items-center flex-col gap-2'>
                        <button onClick={()=>ChangeRight()} className='w-80 bg-[#2B7FFF] px-4 py-2  rounded-sm cursor-pointer text-white hover:scale-105 transition-transform'>
                            Verify OTP
                        </button>
                        <button className='w-80  px-4 py-2  cursor-pointer text-[#2B7FFF] flex flex-row items-center justify-center hover:scale-105 transition-transform'>
                                <img src="/public/arrow-left.svg" alt="" />
                                <Link to="/" >
                                Back to Login
                                </Link>
                            </button>
                    </div>

                </div>
            </div>
                )
                :(
                <div className='flex items-center justify-center w-screen h-screen'>
                    <div className='flex-col  h-120 w-100 rounded-2xl shadow-2xl flex items-center justify-center gap-3'>
                        <div className='flex items-center justify-center bg-[#EFF6FF] rounded-full w-12 py-3'> <img src="/public/lock.svg" alt="" /></div>
                        <div className='text-2xl font-semibold'>Create new password</div>
                        <div className='flex flex-col font'>
                            <span className='font-semibold'>Enter new password</span>
                            <input className=' placeholder:text-[#71717B]  bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="text" name='username' id='' placeholder='Enter new password' />
                        </div>
                        
                        <div className='flex flex-col'>
                            <span className='font-semibold'>
                                Confirm password
                            </span>
                            <input className=' placeholder:text-[#71717B]  bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="text" name='username' id='' placeholder='Re-enter your password' />
                        </div>
                        <div className='flex items-center flex-col gap-2'>
                            <button className='w-80 bg-[#2B7FFF] px-4 py-2  rounded-sm cursor-pointer text-white hover:scale-105 transition-transform'>
                                Setup new password
                            </button>
                            <button className='w-80  px-4 py-2  cursor-pointer text-[#2B7FFF] flex flex-row items-center justify-center hover:scale-105 transition-transform'>
                                <img src="/public/arrow-left.svg" alt="" />
                                <Link to="/" >
                                Back to Login
                                </Link>
                            </button>
                        </div>

                    </div>
                </div>
                )}
        </>
    );
}

export default Forgot;
