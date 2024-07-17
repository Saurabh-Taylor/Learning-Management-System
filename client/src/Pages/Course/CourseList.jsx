import CourseCard from '@/components/CourseCard'
import HomeLayout from '@/Layouts/HomeLayout'
import { fetchCourses } from '@/store/features/CourseSlice'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const CourseList = () => {
    const dispatch = useDispatch();
    const courseData = useSelector((state) => state.courses.courses);
    const courseStatus = useSelector((state) => state.courses.status);

    useEffect(() => {
        if (courseStatus === 'idle') {
            dispatch(fetchCourses());
        }
    }, [courseStatus, dispatch]);

    return (
        <HomeLayout>
            <div className='pt-14 text-white flex flex-col pl-20 gap-10 min-h-[90vh] bg-[#1b263b]'>
                <h1 className='text-2xl text-center font-bold'>
                    Explore Our Courses <span className='font-bold text-yellow-500'>Industry Experts</span>
                </h1>

                <div className='mb-10 flex flex-wrap gap-14'>
                    {courseData.map((course) => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList
