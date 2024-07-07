import {enqueueSnackbar} from "notistack"
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'

import lms from '../assets/images/lms.png'
import { login } from "../Redux/Slices/authSlice.js";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
      });

    const [showPassword, setShowPassword] = useState(false);

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLoginData({
          ...loginData,
          [name]: value,
        });
    }

    const loginUser = async (event) => {
        event.preventDefault();
    
        //Form Validations
        if(!loginData.email || !loginData.password){
            enqueueSnackbar('All the fields are required', {variant:'error'});
            return;
        }

        //Dispatch create account action
        const response = dispatch(login(loginData));
        response
        .unwrap()
        .then(() => {
            navigate('/');
            setLoginData({
            email: "",
            password: "",
            });
        })
        .catch(() => {
            enqueueSnackbar('Login failed', {variant: 'error'})
        });
    }

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center lg:w-1/2 max-lg:w-screen bg-gray-800 h-screen">
        <form onSubmit={loginUser} className="flex flex-col justify-center gap-3 rounded-lg px-5 py-8 text-white w-96">
              <img
                src={lms}
                alt="Avatar"
                className="w-24 h-24 m-auto"
              />
               <h1 className="text-2xl font-semibold mb-4 text-center font-serif">Sign in to dashboard</h1>
          <div className="flex flex-col gap-5">

            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="input input-bordered flex items-center gap-2 rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  required
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="bg-gray-700 px-3 py-4 w-full"
                  onChange={handleUserInput}
                  value={loginData.email}
                />
              </label>
            </div>

            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="password"
                className="input input-bordered flex items-center gap-2 rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="bg-gray-700 px-3 py-4 w-full"
                  onChange={handleUserInput}
                  value={loginData.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:bg-gray-600 p-2  rounded-full"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </label>
            </div>
            <Link to="/user/signup" className="text-info link cursor-pointer text-right">
              Forgot password ?
            </Link>
          </div>
          <div className="my-5 flex flex-col gap-3 justify-evenly">
          <button type="submit" className="btn bg-sky-600 rounded-xl text-white px-16 hover:bg-sky-700 text-md">
                Login
            </button>
            <button type="button" className="btn btn-outline rounded-xl text-white px-8 text-md" onClick={() => navigate(-1)}>
                Go Back
            </button>
            
          </div>
          <p className=" text-md text-gray-500 absolute bottom-5 font-light text-center">
            Don&#39;t have an account ?{" "}
            <Link to="/user/signup" className="text-primary link cursor-pointer">
              Create Account
            </Link>
          </p>
          
        </form>
      </div>
      <div className="flex flex-col items-start justify-center h-screen w-1/2 bg-blue-950 max-lg:hidden">
        <h1 className="text-7xl text-white font-bold font-sans left-24 relative me-auto">Join Our</h1>
        <h1 className='text-7xl text-white font-bold font-sans left-24 relative me-auto'>Community</h1>
        <p className="text-md text-white font-semibold mt-5 left-24 relative me-auto">Be inspired & learn by the best developers around the globe</p>
      </div>
    </div>
  )
}

export default Login