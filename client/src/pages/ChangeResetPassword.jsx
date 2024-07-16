import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import { setResetPassword } from "../Redux/Slices/authSlice";

function ChangeResetPassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const {resetId} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            password : newPassword,
            id : resetId
        }
        const res = await dispatch(setResetPassword(data));
        if(res.meta.requestStatus === 'fulfilled'){
            navigate('/user/login');
            setNewPassword("");
        }else{
            enqueueSnackbar('Failed to set password', {variant: 'error'})
        }
    }

  return (
    <HomeLayout>
      <div className="bg-gray-900 text-white h-[90vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Set New Password</h1>
          <form onSubmit={handleSubmit}> 
            <div className="mb-4 relative">
              <label className="block text-gray-400 mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
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
                Set Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  )
}

export default ChangeResetPassword