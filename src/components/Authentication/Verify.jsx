import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { ThreeDot } from 'react-loading-indicators';
import { useDispatch } from 'react-redux';
import { verifyRegistrationOtp } from '../../redux/features/Login/loginSlice';

const Verify = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const verifyToken = localStorage.getItem("verifyToken");
    const [newOtp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const submit = async () => {
        setIsLoading(true);
        try {
            const action = await dispatch(
                verifyRegistrationOtp({
                    otp: newOtp,
                    verifyToken,
                })
            );

            if (verifyRegistrationOtp.fulfilled.match(action)) {
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
                    navigate("/SignIn-Up");
                }, 1500);
            } else {
                toast.error(action.payload || 'Verification failed. Please check the OTP.', {
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
        } catch (err) {
            console.error(err);
            toast.error('An unexpected error occurred.', {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex h-screen items-center justify-center text-black'>
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
            <div className="flex flex-col items-center justify-between py-6 px-4 h-90 w-90 rounded-3xl bg-white/40 backdrop-blur-md border border-white/10 shadow-2xl">
                <div className='flex flex-col items-center gap-2'>
                    <span><img className='pt-2 w-10 invert' src="/box-stroke-rounded.svg" alt="" /></span>
                    <span className='text-2xl font-bold text-black'>Verify Email</span>
                    <span className='text-sm text-[#71717B] text-center'>Enter the 4-digit code sent to your email</span>
                </div>

                <div className='flex justify-center w-full py-4'>
                    <input
                        className='bg-[#F6F6F7] text-center text-2xl tracking-widest font-bold rounded-lg w-64 py-3 outline-none focus:ring-2 focus:ring-[#2B7FFF] border border-gray-200'
                        type="text"
                        maxLength="6"
                        placeholder="••••"
                        value={newOtp}
                        onChange={handleChange}
                    />
                </div>

                <button
                    onClick={submit}
                    className='flex items-center justify-center w-80 bg-[#2B7FFF] py-2.5 rounded-lg cursor-pointer text-white font-medium hover:bg-blue-600 transition-colors shadow-sm'
                >
                    {isLoading ? <ThreeDot color="#ffff" size="small" text="" textColor="" /> : "Verify & Continue"}
                </button>
            </div>
        </div>
    );
};

export default Verify;
