import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { ThreeDot } from 'react-loading-indicators';
import { Link } from 'react-router-dom';


const Verify = () => {
    const navigate = useNavigate()
    const verifyToken = localStorage.getItem("verifyToken");
    const [newOtp, setOtp] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (e) => {
        setOtp(e.target.value)
    }

    const submit = async () => {
        setIsLoading(true)
        try {
            const res = await fetch("http://localhost:3000/api/verifyOtp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otp: newOtp,
                    verifyToken,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.Message || 'Verification failed. Please check the OTP.', {
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
                console.log(data.Message);
            }
            if (res.ok) {
                toast('Account Created SuccessFull !', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                setTimeout(() => {
                    navigate("/SignIn-Up")
                }, 1500);
            }

            console.log("OTP verified");
        } catch (err) {
            console.error(err);
        } finally {
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
            <div className='flex items-center justify-center w-screen h-screen'>
                <div className='flex-col  h-120 w-100 rounded-2xl shadow-2xl flex items-center justify-center gap-3'>
                    <div className='flex items-center justify-center bg-[#EFF6FF] rounded-full w-12 py-3'><img src="/public/lock.svg" alt="" /></div>
                    <div className='text-2xl font-semibold'>Verify Your Account ?</div>
                    <div className='flex flex-col'>
                        <span className='font-semibold'>
                            Enter OTP
                        </span>
                        <input onChange={handleChange} className=' placeholder:text-[#71717B]  bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="text" name='username' id='' placeholder='Enter OTP' />
                    </div>
                    <div className='flex items-center flex-col gap-2'>
                        <button onClick={() => submit()} className='flex items-center justify-center w-80 bg-[#2B7FFF] px-4 py-2  rounded-sm cursor-pointer text-white hover:scale-105 transition-transform'>
                            {isLoading ? <ThreeDot color="#ffff" size="small" text="" textColor="" /> : "Verify OTP"}
                        </button>
                        <button className='w-80  px-4 py-2  cursor-pointer text-[#2B7FFF] flex flex-row items-center justify-center hover:scale-105 transition-transform'>
                                <img src="/public/arrow-left.svg" alt="" />
                                <Link to="/SignIn-Up" >
                                    Back to Login
                                </Link>
                            </button>
                    </div>

                </div>
            </div>

        </>
    );
}

export default Verify;
