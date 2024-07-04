import { useNavigate } from "react-router-dom"

function NotFound() {

    const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-white text-[250px] font-extrabold tracking-widest">
            404
        </h1>
        <div className="bg-black text-white px-24 py-2 text-4xl rounded rotate-12 absolute font-serif tracking-widest">
            Page not found
        </div>
        <button className="my-5 relative border-red-500 border px-5 py-3 rounded-sm text-xl text-red-500 hover:bg-red-500 hover:text-gray-900" onClick={() => navigate(-1)}>
            Go Back
        </button>
    </div>
  )
}

export default NotFound