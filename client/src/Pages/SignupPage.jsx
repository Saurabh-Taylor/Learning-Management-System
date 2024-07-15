import AuthForm from '@/components/Form'
import HomeLayout from '@/Layouts/HomeLayout'
import React from 'react'

const SignupPage = () => {
  return (
    <HomeLayout>
      <div className='min-h-screen bg-[#1b263b] text-white flex flex-col justify-center items-center px-4 py-8 md:py-16'>
        <div className='w-full max-w-md'>
          <AuthForm type='signup' />
        </div>
      </div>
    </HomeLayout>
  )
}

export default SignupPage