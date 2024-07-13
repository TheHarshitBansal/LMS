import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import { getProfile } from "../Redux/Slices/authSlice";

function Profiles() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await dispatch(getProfile()).unwrap();
        setUser(res.user);
      } catch (error) {
        enqueueSnackbar("Failed to fetch profile", { variant: "error" });
      }
    };
    fetchProfile();
  }, [dispatch]);

  if (!user) {
    return (
      <HomeLayout>
        <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-4">
            <img
              className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 mb-4"
              src={user.avatar.secure_url}
              alt={`${user.name}'s Avatar`}
            />
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-lg text-gray-400">{user.email}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Profile Details</h2>
            <p className="mb-2">
              <strong>Joined At:</strong> {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <strong>Subscription:</strong> {user.subscription.status}
            </p>
            <p className="mb-2">
              <strong>Role:</strong> {user.role}
            </p>
          </div>
          <div className="flex justify-between items-center mt-6">
            <Link to="/user/edit">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                Edit Profile
              </button>
            </Link>
            <button className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profiles;