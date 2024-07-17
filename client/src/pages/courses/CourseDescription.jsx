import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom"

import HomeLayout from "../../layouts/HomeLayout";
import { getProfile } from "../../Redux/Slices/authSlice";

function CourseDescription() {
    const {state} = useLocation();
    const dispatch = useDispatch();
    const [user, setUser] = useState({});


    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await dispatch(getProfile()).unwrap();
          console.log(res.user);
          setUser(res.user);
        } catch (error) {
          enqueueSnackbar("Failed to fetch profile", { variant: "error" });
        }
      };
      fetchProfile();
    }, [dispatch]);

  return (
    <HomeLayout>
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4 border-b-2 border-blue-500 pb-2">{state.title}</h1>
          <p className="text-lg">{state.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <img
              className="w-full h-60 object-cover rounded-lg hover:opacity-80 transition-opacity shadow-lg"
              src={state.thumbnail.secure_url}
              alt="Course Thumbnail"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Course Details</h2>
            <p className="mb-2"><strong>Category:</strong> {state.category}</p>
            <p className="mb-2"><strong>Number of Lectures:</strong> {state.numberOfLectures}</p>
            <p className="mb-2"><strong>Created By:</strong> {state.createdBy}</p>
            <p className="mb-2"><strong>Created At:</strong> {new Date(state.createdAt).toLocaleDateString()}</p>
            <p className="mb-2"><strong>Updated At:</strong> {new Date(state.updatedAt).toLocaleDateString()}</p>
            {new Date(state.createdAt).getTime() > (Date.now() - 10 * 24 * 60 * 60 * 1000) &&
              (<div className="badge badge-secondary">NEW</div>)
            }
          </div>
        </div>
        {user.role ==='ADMIN' || user?.subscription?.status === 'ACTIVE' ?
        (<button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-6 transition-transform transform hover:scale-105">
          View All Lectures
        </button>) 
        : (<Link to={'/checkout'}><button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-6 transition-transform transform hover:scale-105">
          Get Subscription
        </button></Link>)
}
      </div>
    </div>
    </HomeLayout>
  )
}

export default CourseDescription