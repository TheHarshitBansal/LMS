import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout"
import { changePassword, logout } from "../Redux/Slices/authSlice";

function ChangePassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: ''
    })

    const handleUserInput = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setPasswords({
            ...passwords,
            [name]:value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            'oldPassword': passwords.oldPassword,
            'newPassword': passwords.newPassword,
        }

        const response = dispatch(changePassword(data));
        response
        .unwrap()
        .then(async () => {
            await dispatch(logout())
            navigate('/user/login');
            setPasswords({
            oldPassword: "",
            newPassword: "",
            });
        })
        .catch(() => {
            enqueueSnackbar('Failed to change password', {variant: 'error'})
        });
    }

  return (
    <HomeLayout>
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Change Password</h1>
          <form onSubmit={handleSubmit}> 
            <div className="mb-4 relative">
              <label className="block text-gray-400 mb-2" htmlFor="oldPassword">
                Old Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={handleUserInput}
                className="w-full px-3 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring"
                required
              />
              <div
                className="absolute right-3 top-11 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-400 mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleUserInput}
                className="w-full px-3 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring"
                required
              />
              <div
                className="absolute right-3 top-11 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  )
}

export default ChangePassword