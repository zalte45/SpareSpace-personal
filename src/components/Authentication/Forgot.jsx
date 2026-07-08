import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { ThreeDot } from 'react-loading-indicators';


const Forgot = () => {
    const navigate = useNavigate()
    const [IsRight, setIsRight] = useState(true)
    const [timer, setTimer] = useState(30)
    const [isTimer, setIsTimer] = useState(false)
    const [token, setToken] = useState("")
    const [isOtpLoading, setIsOtpLoading] = useState(false)
    const [isVerifyLoading, setIsVerifyLoading] = useState(false)
    const [isResetLoading, setIsResetLoading] = useState(false)
    useEffect(() => {
        if (!isTimer) return;

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsTimer(false);
                    return 30; // Reset for the next OTP request
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isTimer]);
    const [Form, setForm] = useState({
        email: "",
        otp: "",
        password: "",
        confirmPassword: ""
    })
    const handleChange = (e) => {
        setForm({ ...Form, [e.target.name]: e.target.value })
        console.log(Form.confirmPassword)

    }
    const sentOtp = async () => {
        if (!Form.email.trim()) {
            toast('Email is required', {
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
            return;
        }
        setIsOtpLoading(true)
        try {
            let res = await fetch("http://localhost:3000/api/forgotOtp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: Form.email
                })
            })
            const data = await res.json()
            console.log(res.status)
            console.log(data)
            if (res.ok) {
                console.log("otp sent")
                setTimer(30);     // Reset timer
                setIsTimer(true); // Start countdown
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsOtpLoading(false)
        }
    }

    const verifyOtp = async () => {
        setIsVerifyLoading(true)
        try {
            let res = await fetch("http://localhost:3000/api/forgotOtpVerify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: Form.email,
                    otp: Form.otp
                })
            })
            if (res.ok) {
                setIsRight(false)
                console.log("otp verified !")
            }
            const data = await res.json()
            localStorage.setItem("token", data.resetToken)
            setToken(localStorage.getItem("token"))
            console.log(localStorage.getItem("token"))
        } catch (error) {
            console.error(error)
        } finally {
            setIsVerifyLoading(false)
        }
    }

    // const Verify = async () => {
    //     try {
    //         let res = fetch("http://localhost:3000/api/forgotOtpVerify", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 opt: Form.otp,
    //                 email: Form.email
    //             })
    //         })
    //         if (res.ok) {
    //             console.log("Otp verified")
    //             setTimeout(() => {
    //                 navigate("/SignIn-Up")
    //             }, 1000)
    //         }

    //         const data = await res.json()
    //         console.log(data)

    //     } catch (error) {
    //         console.error(error)
    //     } finally {
    //         setIsVerifyLoading(false)
    //     }
    // }

    const handleReset = async () => {
        setIsResetLoading(true)
        try {

            if (!Form.password.trim() || Form.password !== Form.confirmPassword) {
                toast(Form.password !== Form.confirmPassword ? 'Passwords do not match!' : 'Password is required!', {
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
                return;
            }
            console.log(
                Form.confirmPassword,
                token)
            let res = await fetch("http://localhost:3000/api/newPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: Form.confirmPassword,
                    resetToken: token
                })
            })
            if (res.ok) {
                toast('Password reset successful!', {
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
            if (!res.ok) {
                const data = await res.json()

                toast(data.Message, {
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
            setTimeout(() => {
                // navigate("/SignIn-Up")
            }, 1200);
        } catch (error) {
            console.error(error);
        } finally {
            setIsResetLoading(false)
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
            {IsRight ? (
                <div className='flex items-center justify-center w-screen h-screen'>
                    <div className='flex-col  h-120 w-100 rounded-2xl shadow-2xl flex items-center justify-center gap-3'>
                        <div className='flex items-center justify-center bg-[#EFF6FF] rounded-full w-12 py-3'><img src="/public/lock.svg" alt="" /></div>
                        <div className='text-2xl font-semibold'>Forgot your Password ?</div>
                        <div className='text-sm text-[#71717B]'>Enter your email address and we'll send you OTP</div>
                        <div className='flex flex-col font'>
                            <span className='font-semibold'>Email Address</span>
                            <input className=' placeholder:text-[#71717B]  bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="text" name='email' id='' placeholder='Enter your email' value={Form.email} onChange={handleChange} />
                        </div>
                        <div className='flex justify-center w-80'>
                            <button
                                onClick={sentOtp}
                                disabled={isTimer || isOtpLoading}
                                className={`flex items-center justify-center w-80 px-4 py-2 rounded-sm text-white
                                        ${isTimer || isOtpLoading
                                        ? "bg-blue-400 cursor-not-allowed"
                                        : "bg-[#2B7FFF] hover:scale-105"
                                    }`}
                            >
                                {isTimer
                                    ? `Send Again after ${timer}s`
                                    : isOtpLoading
                                        ? <ThreeDot color="#fff" size="small" />
                                        : "Send OTP"}
                            </button>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-semibold'>
                                Enter OTP
                            </span>
                            <input className=' placeholder:text-[#71717B]  bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="text" name='otp' id='' placeholder='Enter OTP' value={Form.otp} onChange={handleChange} />
                        </div>
                        <div className='flex items-center flex-col gap-2'>
                            <button onClick={() => verifyOtp()} className='flex items-center justify-center w-80 bg-[#2B7FFF] px-4 py-2  rounded-sm cursor-pointer text-white hover:scale-105 transition-transform'>
                                {isVerifyLoading ? <ThreeDot color="#ffff" size="small" text="" textColor="" /> : "Verify OTP"}
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
            )
                : (
                    <div className='flex items-center justify-center w-screen h-screen'>
                        <div className='flex-col  h-120 w-100 rounded-2xl shadow-2xl flex items-center justify-center gap-3'>
                            <div className='flex items-center justify-center bg-[#EFF6FF] rounded-full w-12 py-3'> <img src="/public/lock.svg" alt="" /></div>
                            <div className='text-2xl font-semibold'>Create new password</div>
                            <div className='flex flex-col font'>
                                <span className='font-semibold'>Enter new password</span>
                                <input className=' placeholder:text-[#71717B]  bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="password" name='password' id='' placeholder='Enter new password' value={Form.password} onChange={handleChange} />
                            </div>

                            <div className='flex flex-col'>
                                <span className='font-semibold'>
                                    Confirm password
                                </span>
                                <input className=' placeholder:text-[#71717B]  bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-white outline-1' type="password" name='confirmPassword' id='' placeholder='Re-enter your password' value={Form.confirmPassword} onChange={handleChange} />
                            </div>
                            <div className='flex items-center flex-col gap-2'>
                                <button onClick={() => handleReset()} className='flex items-center justify-center w-80 bg-[#2B7FFF] px-4 py-2  rounded-sm cursor-pointer text-white hover:scale-105 transition-transform'>
                                    {isResetLoading ? <ThreeDot color="#ffff" size="small" text="" textColor="" /> : "Setup new password"}
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
                )}
        </>
    );
}

export default Forgot;
