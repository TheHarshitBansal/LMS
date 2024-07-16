import Alert from '@mui/material/Alert';
import { enqueueSnackbar } from 'notistack';
import {  useState } from "react"
import { useDispatch } from 'react-redux';

import HomeLayout from "../layouts/HomeLayout"
import { resetPassword } from '../Redux/Slices/authSlice';

function ResetPassword() {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [click, setClick] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(resetPassword({'email': email}));
        if(res.meta.requestStatus === 'fulfilled'){
            setClick(true);
        }else{
            enqueueSnackbar('Failed to send reset link', {variant: 'error'})
        }
    }

  return (
    <HomeLayout>
        <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
          <form onSubmit={handleSubmit}> 
            <div className="mb-4 relative">
              <label className="block text-gray-400 mb-2" htmlFor="newPassword">
               Email
              </label>
              <input
                type='email'
                id="email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring"
                required
              />
            </div>
            <div className="flex justify-start">
              {click?(<Alert severity="success">Reset link successfully sent.</Alert>):(<button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Send Reset Link
              </button>)}
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  )
}

export default ResetPassword