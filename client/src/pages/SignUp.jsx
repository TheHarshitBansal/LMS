import {enqueueSnackbar} from "notistack"
import { useState } from "react";
import { BsPersonBoundingBox } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { createAccount } from "../Redux/Slices/authSlice";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const createNewAccount = async (event) => {
    event.preventDefault();

    //Form Validations
    if(!signupData.name || !signupData.email || !signupData.password || !signupData.avatar){
        enqueueSnackbar('All the fields are required', {variant:'error'});
        return;
    }

    //Name Validation
    if(signupData.name.length < 2 || signupData.name.length > 20){
        enqueueSnackbar('Name should be of 2-20 characters', {variant:'error'});
        return;
    }

    //Email validation
    if(!signupData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        enqueueSnackbar('Invalid Email Address', {variant:'error'});
        return;
    }

    //Password Validation
    if(!signupData.password.match(/^[a-zA-Z0-9!@#$%^&*]{8,20}$/)){
        enqueueSnackbar('Password should have 8-20 characters including atleast a number and a special character', {variant:'error'});
        return;
    }

    //Dispatch create account action
    const response = dispatch(createAccount(signupData));
    response
    .unwrap()
    .then(() => {
        navigate('/');
        setSignupData({
        name: "",
        email: "",
        password: "",
        avatar: "",
        });
        setPreviewImage("");
    })
    .catch((error) => {
        enqueueSnackbar('Failed to create account', {variant: 'error'})
    });
}

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  function getImage(e) {
    e.preventDefault();

    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }


  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center lg:w-1/2 max-lg:w-screen bg-gray-800 h-screen">
        <form onSubmit={createNewAccount} noValidate className="flex flex-col justify-center gap-3 rounded-lg px-5 py-8 text-white w-96">
          <p className="text-lg font-semibold text-gray-500">START FOR FREE</p>
          <h1 className="text-4xl font-extrabold mb-4">Create new account</h1>
          <p className=" text-lg text-gray-500">
            Already a member?{" "}
            <Link to="/user/login" className="text-info link cursor-pointer">
              Login
            </Link>
          </p>
          <label
            htmlFor="imageUpload"
            className="cursor-pointer mx-auto my-6 w-24 hover:text-gray-500 transition-all ease-in-out duration-200"
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Avatar"
                className="w-24 h-24 m-auto"
              />
            ) : (
              <BsPersonBoundingBox className="w-24 h-24 m-auto" />
            )}
          </label>
          <input
            type="file"
            className="hidden"
            id="imageUpload"
            accept=".jpg, .jpeg, .png"
            name="avatar"
            onChange={getImage}
          />

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="input input-bordered flex items-center gap-2 rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  required
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="bg-gray-700 px-3 py-4 w-full"
                  onChange={handleUserInput}
                  value={signupData.name}
                />
              </label>
            </div>

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
                  value={signupData.email}
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
                  value={signupData.password}
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
          </div>
          <div className="my-5 flex justify-evenly">
            <button type="button" className="btn btn-outline rounded-3xl text-white px-8 text-md" onClick={() => navigate(-1)}>
                Go Back
            </button>
            <button type="submit" className="btn bg-sky-600 rounded-3xl text-white px-8 hover:bg-sky-700 text-md">
                Create account
            </button>
          </div>
          
        </form>
      </div>
      <div className="flex flex-col items-start justify-center h-screen w-1/2 bg-blue-950 max-lg:hidden">
        <h1 className="text-7xl text-white font-bold font-sans left-24 relative me-auto">Join Our</h1>
        <h1 className='text-7xl text-white font-bold font-sans left-24 relative me-auto'>Community</h1>
        <p className="text-md text-white font-semibold mt-5 left-24 relative me-auto">Be inspired & learn by the best developers around the globe</p>
      </div>
    </div>
  );
}

export default SignUp;