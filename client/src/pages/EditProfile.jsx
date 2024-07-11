import { enqueueSnackbar } from "notistack"
import { useState } from "react"
import { BsPersonBoundingBox } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import { editProfile, getProfile } from "../Redux/Slices/authSlice";

function EditProfile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=>state?.auth?.data);
    
    const [userData, setUserData] = useState({
        name: user.name,
        avatar: user.avatar
    })

    const [previewImage, setPreviewImage] = useState(user.avatar.secure_url);

    function handleUserInput(e){
        console.log();
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]:value
        })
    }

    function getImage(e) {
        e.preventDefault();
    
        const uploadedImage = e.target.files[0];
        if (!uploadedImage) return;
          const fileReader = new FileReader();
          fileReader.readAsDataURL(uploadedImage);
          fileReader.addEventListener("load", function () {
            setUserData({
                ...userData,
                avatar: uploadedImage,
              });
              setPreviewImage(this.result);
          })
      }
    
    const editUser = async(e)=>{
        e.preventDefault();

        if(!userData.name ||  !userData.avatar){
            enqueueSnackbar('All the fields are required', {variant:'error'});
            return;
        }

        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("avatar", userData.avatar);


    //Dispatch create account action
    await dispatch(editProfile(formData));
    await dispatch(getProfile());
    navigate('/user/profile');
}

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center w-screen bg-gray-800 h-screen">
        <form onSubmit={editUser} noValidate className="flex flex-col text-center justify-center gap-3 rounded-lg px-5 py-8 text-white w-96">
          <h1 className="text-4xl font-extrabold mb-4">Edit profile</h1>
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
                  value={userData.name}
                />
              </label>
            </div>

          </div>
          <div className="my-5 flex justify-evenly">
            <button type="button" className="btn btn-outline rounded-3xl text-white px-8 text-md" onClick={() => navigate(-1)}>
                Go Back
            </button>
            <button type="submit" className="btn bg-sky-600 rounded-3xl text-white px-8 hover:bg-sky-700 text-md">
                Edit User
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default EditProfile