import { useNavigate } from "react-router-dom";

function CourseCard({data}) {
    const navigate = useNavigate();
  return (
    <div className="card bg-gray-800 text-gray-100 w-96 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl mb-6">
  <figure className="overflow-hidden">
    <img
      className="w-full h-60 object-cover transition-transform transform hover:scale-105"
      src={data?.thumbnail?.secure_url}
      alt="Course Thumbnail"
    />
  </figure>
  <div className="card-body p-4">
    <h2 className="card-title text-2xl font-extrabold mb-2 flex items-center">
      {data.title}
      {new Date(data.createdAt).getTime() > (Date.now() - 10 * 24 * 60 * 60 * 1000) && (
        <div className="badge badge-secondary ml-2 bg-indigo-500 text-white px-2 py-1 rounded-full text-xs">
          NEW
        </div>
      )}
    </h2>
    <p className="text-gray-400 mb-4">{data.description}</p>
    <div className="card-actions justify-end mb-4">
      <div className="badge badge-outline border-gray-600 text-gray-400 px-2 py-1 rounded-full">
        Number of lectures: {data.numberOfLectures}
      </div>
      <div className="badge badge-outline border-gray-600 text-gray-400 px-2 py-1 rounded-full ml-2">
        {data.createdBy}
      </div>
    </div>
    <div className="flex justify-end">
      <button onClick={()=>navigate('/courses/details')} className="cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
        See Course Content & Details
      </button>
    </div>
  </div>
</div>
  )
}

export default CourseCard;