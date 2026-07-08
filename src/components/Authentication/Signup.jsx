import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import SignIn from './SignIn'
import { useNavigate } from 'react-router-dom';
import { ThreeDot } from 'react-loading-indicators';

const Signup = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [Form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [state, setState] = useState(0);

  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value })
  }
  const submitForm = async () => {
    setIsLoading(true)
    try {

      if (!Form.username.trim()) {
        toast.error('Username is required', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return
      }
      if (!Form.email.trim()) {
        toast.error('Email is required !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return
      }
      if (!Form.password.trim()) {
        toast.error('Password is required !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return
      }
      if (Form.password !== Form.confirmPassword) {
        toast.error('Passwords do not match !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return
      }

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
      if (res.ok) {
        localStorage.setItem("verifyToken", data.verifyToken)
        const verifyToken = localStorage.getItem("verifyToken")
        console.log(verifyToken)
        toast.success('Account Created Successfully !', {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/Verify")
        }, 1500);
      } else {
        toast.error(data.Message || 'Registration failed!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred during registration. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }finally{
      setIsLoading(false)
    }
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
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
              <span className='px-2 text-black text-sm font-semibold'>Username</span><input onChange={handleChange} className='relative placeholder:text-[#71717B]  bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="text" name='username' id='' placeholder='Enter your username' value={Form.username} />
            </div>
            <div>
              <span className='px-2 text-black text-sm font-semibold'>Email</span>
              <input onChange={handleChange} className='relative placeholder:text-[#71717B]  bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="email" name='email' id='' placeholder='Enter your Email' value={Form.email} />
            </div>
            <div>
              <span className='px-2 text-black text-sm font-semibold'>Password</span>
              <input onChange={handleChange} className='relative placeholder:text-[#71717B] bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="password" name='password' id='' placeholder='Enter your Password' value={Form.password} />
            </div>
            <div>
              <span className='px-2 text-black text-sm font-semibold'>Confirm password</span>
              <input onChange={handleChange} className='relative placeholder:text-[#71717B] bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="password" name='confirmPassword' id='' placeholder='Confirm password' value={Form.confirmPassword} />
            </div>
            <div className=' flex justify-evenly items-center  w-80 pt-4'>
              <button onClick={() => submitForm()} className='flex items-center justify-center w-80 bg-[#2B7FFF] px-4 py-2  rounded-sm cursor-pointer text-white hover:scale-105 transition-transform'>{isLoading ? (<ThreeDot color="#ffff" size="small" text="" textColor="" />) : ("Sign Up")}</button>
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


