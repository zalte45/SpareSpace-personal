import React from 'react';
import { useState, useEffect } from 'react';

const Signup = (props) => {
  const [Form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [state, setState] = useState(0);
  // useEffect(() => {
  //   const getMe = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3000/api/getMe", {
  //         method: "GET",
  //         credentials: "include"
  //       })
  //       const data = await res.json()
  //       console.log(data)
  //       if (!res.ok) {
  //         return;
  //       }

  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   getMe()
  // },[])

  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value })
  }
  const submitForm = async () => {
    console.log(Form)
    let res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: Form.username,
        email: Form.email,
        password: Form.password
      }),
      credentials: "include"
    })
    let data = await res.json()
    await setState(res.status)
    console.log(data)
    console.log(document.cookie);
    props.setIsClicked(false)
    console.log(props.IsClicked)
  }

  return (
    <>
      <div className='flex h-screen items-center justify-center text-black'>
        <div className="h-120 w-90 rounded-3xl bg-white/40 backdrop-blur-md border border-white/10 shadow-2xl hover:transition-all duration-300F">
          <div className='py-2 flex flex-col items-center gap-2'>
            <span className='text-2xl font-bold text-black'>
              Create Account
            </span>
            <span className='text-[#71717B] text-sm '>
              Join us today and start tracking your expenses.
            </span>
          </div>
          <div className=' px-4 flex flex-col gap-2 items-center'>
            <div>
              <span className='px-2 text-black text-sm font-semibold'>Username</span><input onChange={handleChange} className='relative placeholder:text-[#71717B]  bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="text" name='username' id='' placeholder='Enter your username' />
            </div>
            <div>
              <span className='px-2 text-black text-sm font-semibold'>Email</span>
              <input onChange={handleChange} className='relative placeholder:text-[#71717B]  bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="text" name='email' id='' placeholder='Enter your Email' />
            </div>
            <div>
              <span className='px-2 text-black text-sm font-semibold'>Password</span>
              <input className='relative placeholder:text-[#71717B] placeholder: bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="text" name='' id='' placeholder='Enter your Password' />
            </div>
            <div>
              <span className='px-2 text-black text-sm font-semibold'>Confirm password</span>
              <input onChange={handleChange} className='relative placeholder:text-[#71717B] bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="text" name='password' id='' placeholder='Confirm password' />
            </div><div className="flex items-center gap-2">
              <input
                type="checkbox" className="cursor-pointer w-4 h-4 " />
              <label className="text-sm text-[#71717B]">
                I agree to the{" "}
                <span className="text-sky-400 hover:text-sky-300 cursor-pointer">
                  Terms & Conditions
                </span>
              </label>
            </div>
            <div className=' flex justify-evenly items-center  w-80'>
              <button onClick={() => submitForm()} className='w-80 bg-[#2B7FFF] px-4 py-2  rounded-sm cursor-pointer text-white hover:scale-105 transition-transform'>Sign Up</button>
            </div>
            <div className='flex flex-row items-center justify-evenly gap-0.5 text-[#71717B] '>
              <span>Already have one ! <span className='text-sky-400 hover:text-sky-300 cursor-pointer' onClick={() => {
                props.setIsClicked(false)
                console.log(props.IsClicked)
              }}>Sign In</span></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;


