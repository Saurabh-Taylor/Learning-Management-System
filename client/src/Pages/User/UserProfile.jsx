import HomeLayout from '@/Layouts/HomeLayout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserProfile = () => {
    const dispatch = useDispatch()
    const userData = useSelector(store=> store?.auth?.data)

  return (
    <HomeLayout>
     <div className='  flex justify-center items-center   min-h-[90vh] bg-[#1b263b] ' >
        <div className='my-10 flex flex-col gap-4 p-4 rounded-lg w-96 text-white shadow-[0_0_10px_black]' >
          <img src={userData?.avatar?.secure_url} className='w-40 m-auto rounded-full border border-black' alt="" srcset="" />
          <h3 className='text-xl font-semibold text-center capitalize' >
            {userData?.name}
          </h3>
          <div className="grid ">
            <p>Email: {userData?.email} </p> <br />
            <p>Role: {userData?.role} </p> <br />
            <p>Subscription: {userData?.subscription?.status === "active"? "Active" : "Inactive" } </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Link className='w-1/2 text-center bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-75 p-2 rounded-sm font-semibold cursor-pointer ' to={"/changepassword"} >
            <button>Change Password</button>
            </Link>
            <Link className='w-1/2 text-center bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-75 p-2 rounded-sm font-semibold cursor-pointer ' to={"/user/editprofile"} >
            <button>Edit Profile</button>
            </Link>
          </div>
          {userData?.subscription?.active === "active" && (
            <button className='w-full bg-red-500 hover:bg-red-600 p-2 transition-all ease-in-out duration-75 ' > cancel subscription </button>
          )}
        </div>
     </div>
    </HomeLayout>
  )
}

export default UserProfile