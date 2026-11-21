import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { ThreeDot } from 'react-loading-indicators';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/features/Login/loginSlice';

const SignIn = (props) => {
  const loginData = useSelector((state) => state.loginInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, setSignIn] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignIn({ ...signIn, [name]: value });

    // Clear inline error as soon as the user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitForm();
    }
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!signIn.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signIn.email.trim())) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!signIn.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitForm = async () => {
    if (isLoading) return;
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const action = await dispatch(
        loginUser({
          email: signIn.email,
          password: signIn.password,
        })
      );

      if (loginUser.fulfilled.match(action)) {
        const data = action.payload;
        const user = data?.user || data;

        toast.success('Login Successful !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });

        setTimeout(() => {
          const role = (user?.Role || user?.role || "").toLowerCase();

          if (role === "host") {
            navigate("/DashBoard");
          } else {
            navigate("/spaces");
          }
        }, 1000);

      } else {
        toast.error(action.payload || 'Invalid email or password', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
      }

    } catch (error) {
      console.error(error);

      toast.error('An error occurred during sign in. Please try again.', {
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

      <div className="px-2 py-5 min-h-110 w-90 rounded-3xl bg-white/40 backdrop-blur-md border border-white/10 shadow-2xl hover:transition-all duration-300">

        <div className='flex flex-col items-center gap-2'>
          <span>
            <img className='w-10 invert' src="/box-stroke-rounded.svg" alt="" />
          </span>

          <span className='text-2xl font-bold text-black'>Welcome Back</span>
          <span className='text-[#71717B]'>Sign in to your SpareSpace account</span>
        </div>

        {/* FORM START */}
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <div className='flex flex-col items-start px-3 w-full py-2 gap-2'>

            {/* EMAIL FIELD */}
            <div className='flex flex-col items-start gap-1 text-black'>
              <span className='px-2 text-black text-sm font-semibold'>Email</span>

              <input
                className={`relative placeholder:text-[#71717B] bg-[#F6F6F7] rounded-sm w-80 px-4 py-2 outline-1 ${
                  errors.email ? 'outline-red-500 border border-red-500' : 'outline-white'
                }`}
                type="email"
                name='email'
                placeholder='Enter your Email'
                value={signIn.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              {errors.email && (
                <span className='px-2 text-xs text-red-500 font-medium'>
                  {errors.email}
                </span>
              )}
            </div>

            {/* PASSWORD FIELD */}
            <div className='flex flex-col items-start gap-1 text-black'>
              <span className='px-2 text-black text-sm font-semibold'>
                Password
              </span>

              <div className='relative w-80'>
                <input
                  className={`placeholder:text-[#71717B] bg-[#F6F6F7] rounded-sm w-full pl-4 pr-10 py-2 outline-1 ${
                    errors.password ? 'outline-red-500 border border-red-500' : 'outline-white'
                  }`}
                  type={showPassword ? "text" : "password"}
                  name='password'
                  placeholder='Enter your Password'
                  value={signIn.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717B] hover:text-black cursor-pointer"
                >
                  {showPassword ? (
                    /* Eye Off SVG */
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    /* Eye On SVG */
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {errors.password && (
                <span className='px-2 text-xs text-red-500 font-medium'>
                  {errors.password}
                </span>
              )}
            </div>

          </div>

          {/* SUBMIT BUTTON */}
          <div className='flex justify-evenly w-80 mt-3 items-center ml-3'>
            <button
              type="submit"
              disabled={isLoading}
              onKeyDown={handleKeyDown}
              className="flex items-center justify-center w-80 bg-[#2B7FFF] py-2 rounded-sm cursor-pointer text-white hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <ThreeDot color="#ffff" size="small" text="" textColor="" />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
        {/* FORM END */}

        <div className='text-center text-[#71717B] mt-4'>
          <span>
            Don't have account ?{" "}
            <span
              className='text-[#2B7FFF] hover:cursor-pointer'
              onClick={() => props.setIsClicked(true)}
            >
              Sign up
            </span>
          </span>
        </div>

        <div className='text-center mt-1'>
          <span className='text-[#2B7FFF] hover:cursor-pointer'>
            <Link to="/Forgot">Forgot Password</Link>
          </span>
        </div>

      </div>
    </div>
  );
};

export default SignIn;