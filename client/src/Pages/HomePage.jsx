import HomeLayout from '@/Layouts/HomeLayout'
import React from 'react'
import { Link } from 'react-router-dom'
import homePageMainImage from "../assets/Images/homePageMainImage.png";

const HomePage = () => {
  return (
    <HomeLayout>
        <div className='pt-10 text-white flex justify-center items-center gap-10  min-h-[90vh] bg-[#1b263b] ' >
            <div className="w-1/2 space-y-6 my-6 px-10 ">
                <h1 className='text-5xl font-semibold' >
                     Find Out Best { }
                     <span className='text-yellow-500 font-bold' >
                        Online Courses
                    </span> 
                </h1> 
                <p className='text-xl text-gray-200' >
                    We Have a large library of courses taught by highly skilled and qualified faculties at affordable cost
                </p>
                <div className="space-x-6">
                    <Link to="/courses" >
                        <button className='rounded-md bg-yellow-500 px-5 py-3 font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-100' > Explore Courses </button>
                    </Link>
                    <Link to="/contact" >
                        <button className=' border border-yellow-500 rounded-md  px-5 py-3 font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-100' > Contact Us </button>
                    </Link>
                </div>
            </div>
            <div className='w-1/2 flex items-center justify-center' > 
                <img src={homePageMainImage} alt="" />
            </div>
        </div>

    </HomeLayout>
  )
}

export default HomePage