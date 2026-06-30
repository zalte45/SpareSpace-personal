import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
  const [signIn, setSignIn] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value })
  }
  const submitForm = async () => {
    let res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signIn.email,
        password: signIn.password,
      }),
      credentials: "include"
    })
    let data = await res.json()
    console.log(data)
  }
  return (
    <div className='flex  h-screen items-center justify-center text-black'>
      <div className="px-2 h-110 w-90 rounded-3xl bg-white/40 backdrop-blur-md border border-white/10 shadow-2xl hover:transition-all duration-300F">

        <div className='flex flex-col items-center gap-2'>
          <span><img className='pt-4 w-10 invert' src="/box-stroke-rounded.svg" alt="" /></span>
          <span className='text-2xl font-bold text-black'>Welcome Back</span>
          <span className='text-[#71717B]'>Sign in to your SpareSpace account</span>
        </div>

        <div className='flex flex-col items-start px-3 w-full py-2 gap-2'>

          <div className='flex flex-col items-start gap-2 text-black'>
            <span className='px-2 font-bold '>
              <span className='text-black text-sm font-semibold '>Email</span>
            </span>
            <input className='relative placeholder:text-[#71717B] placeholder: bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="text" name='' id='' placeholder='Enter you Email' />
          </div>

          <div className='flex flex-col items-start gap-2 text-black'>
            <span className='px-2 text-black text-sm font-semibold'>
              Password
            </span>
            <input className='placeholder:text-[#71717B] bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1 ' type="text" name='' id='' placeholder='Enter you Password' />
          </div>

        </div>
        <div className='flex justify-evenly w-80  mt-3 items-center ml-3'>
          <button onClick={() => submitForm()} className='w-80 bg-[#2B7FFF]  py-2  rounded-sm cursor-pointer text-white hover:scale-105 transition-transform'>Sign In</button>
        </div>
        <div className='text-center text-[#71717B] mt-4 ' >
          <span>Don't have account ? {" "}
            <span className='text-[#2B7FFF] hover:cursor-pointer' onClick={() => {
              props.setIsClicked(true)
            }
            }>Sign up</span>
          </span>

        </div>
        <span className='text-[#2B7FFF] hover:cursor-pointer px-25'><Link to="/Forgot">Forgot Password</Link></span>
      </div>
    </div>
  );
}

export default Card;
