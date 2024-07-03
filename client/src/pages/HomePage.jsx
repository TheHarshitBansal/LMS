import { Link } from "react-router-dom"

import homePageImage from '../assets/images/homePageImage.webp'
import HomeLayout from "../layouts/HomeLayout"

function HomePage() {
  return (
    <HomeLayout>
        <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
            <div className="w-1/2 space-y-6">
                <h1 className="text-5xl font-semibold">
                    Find out the best
                    <span className="text-yellow-500 font-bold"> Online Courses</span>
                </h1>
                <p className="text-xl text-gray-200">
                    Explore a large library of courses taught by top faculties at a very affordable cost.
                </p>
                <div className="space-x-6">
                    <Link to={'/courses'}>
                        <button className="bg-yellow-500 py-3 px-5 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-all ease-in-out duration-200">Explore Courses</button>
                    </Link>

                    <Link to={'/contact'}>
                        <button className="border border-yellow-500 py-3 px-5 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-all ease-in-out duration-200">Contact Us</button>
                    </Link>
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-center">
                <img src={homePageImage} alt="HomePageImage" />
            </div>
        </div>
    </HomeLayout>
  )
}

export default HomePage