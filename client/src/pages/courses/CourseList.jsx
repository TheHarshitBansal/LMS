/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'

import CourseCard from '../../components/CourseCard.jsx';
import HomeLayout from '../../layouts/HomeLayout.jsx'
import { getAllCourses } from '../../Redux/Slices/courseSlice.js';

function CourseList() {
    const dispatch = useDispatch();
    const {courseData} = useSelector((state)=> state.course);

    function loadCourses(){
        dispatch(getAllCourses());
    }

    useEffect(()=>{
        loadCourses();
    }, [])

  return (
    <HomeLayout>
        <div className='min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white text-center'>
            <span className="text-yellow-500 font-bold text-5xl">Courses</span> 
            <div className='flex flex-wrap justify-evenly'>
              {courseData.map((course)=>{
                return <CourseCard key={course._id} data={course}/>
              })}
            </div>
        </div>
    </HomeLayout>
  )
}

export default CourseList