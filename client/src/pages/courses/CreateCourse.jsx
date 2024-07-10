import { enqueueSnackbar } from "notistack";
import { useState } from "react"
import { FaRegImage } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"

import { createCourse } from "../../Redux/Slices/courseSlice";


function CreateCourse() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userInput, setUserInput] = useState({
        title:"",
        description:"",
        category:"",
        createdBy:"",
        thumbnail:null
    })

    const [previewImage, setPreviewImage] = useState("");

    function getImage(e) {
        e.preventDefault();
    
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
          setUserInput({
            ...userInput,
            thumbnail: uploadedImage,
          });
          const fileReader = new FileReader();
          fileReader.readAsDataURL(uploadedImage);
          fileReader.addEventListener("load", function () {
            setPreviewImage(this.result);
          });
        }
    }

    function handleUserInput(e) {
        const { name, value } = e.target;
        setUserInput({
          ...userInput,
          [name]: value,
        });
    }

    const createNewCourse = async (event) => {
        event.preventDefault();
    
        //Form Validations
        if(!userInput.title || !userInput.description || !userInput.category || !userInput.createdBy){
            enqueueSnackbar('All the fields are required', {variant:'error'});
            return;
        }
        
        const formData = new FormData();
        formData.append("title", userInput.title);
        formData.append("description", userInput.description);
        formData.append("category", userInput.category);
        formData.append("createdBy", userInput.createdBy);
        formData.append("thumbnail", userInput.thumbnail);
       
        //Dispatch create account action
        const response = dispatch(createCourse(formData));
        response
        .unwrap()
        .then(() => {
            navigate('/');
            setUserInput({
                title:"",
                description:"",
                category:"",
                createdBy:"",
                thumbnail:null
            });
            setPreviewImage("");
        })
        .catch(() => {
            enqueueSnackbar('Failed to create course', {variant: 'error'})
        });
    }
    



  return (
        <div className="flex items-center justify-center">
        <div className="flex items-center justify-center w-screen bg-gray-800 h-screen">
        <form onSubmit={createNewCourse} noValidate className="flex flex-col justify-center gap-3 rounded-lg px-5 py-8 text-white w-96">
        <h1 className="text-4xl font-extrabold mb-4">Create new course</h1>
          <label
            htmlFor="imageUpload"
            className="cursor-pointer mx-auto my-6 w-96 hover:text-gray-500 transition-all ease-in-out duration-200"
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="thumbnail"
                className="w-24 h-24 m-auto"
              />
            ) : (
                <FaRegImage className="w-96 h-72"/>
            )}
          </label>
          <input
            type="file"
            className="hidden"
            id="imageUpload"
            accept=".jpg, .jpeg, .png"
            name="thumbnail"
            onChange={getImage}
          />

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="title"
                className="input input-bordered flex items-center gap-2 rounded-xl"
              >
                <input
                  type="text"
                  required
                  name="title"
                  id="title"
                  placeholder="Course title"
                  className="bg-gray-700 px-3 py-4 w-full"
                  onChange={handleUserInput}
                  value={userInput.title}
                />
              </label>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="description"
                className="input input-bordered flex items-center gap-2 rounded-xl"
              >
                <input
                  type="text"
                  required
                  name="description"
                  id="description"
                  placeholder="Course description"
                  className="bg-gray-700 px-3 py-4 w-full"
                  onChange={handleUserInput}
                  value={userInput.description}
                />
              </label>
            </div>

            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="category"
                className="input input-bordered flex items-center gap-2 rounded-xl"
              >
                <input
                  type='text'
                  required
                  name="category"
                  id="category"
                  placeholder="Course category"
                  className="bg-gray-700 px-3 py-4 w-full"
                  onChange={handleUserInput}
                  value={userInput.category}
                />
              </label>
            </div>

            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="createdBy"
                className="input input-bordered flex items-center gap-2 rounded-xl"
              >
                <input
                  type='text'
                  required
                  name="createdBy"
                  id="createdBy"
                  placeholder="Created By"
                  className="bg-gray-700 px-3 py-4 w-full"
                  onChange={handleUserInput}
                  value={userInput.createdBy}
                />
              </label>
            </div>
          </div>
          
          <div className="my-5 flex justify-evenly">
          <button type="button" className="btn btn-outline rounded-3xl text-white px-8 text-md" onClick={() => navigate(-1)}>
                Go Back
            </button>
            <button type="submit" className="btn bg-sky-600 rounded-3xl text-white px-8 hover:bg-sky-700 text-md">
                Create course
            </button>
          </div>
          
        </form>
      </div>
      </div>
  )
}

export default CreateCourse