import AuthForm from '@/components/Form'
import HomeLayout from '@/Layouts/HomeLayout'
import React from 'react'

const SignInPage = () => {
  return (
    <HomeLayout>
        <div className='pt-10 text-white flex  justify-center gap-3 items-center  h-[90vh] bg-[#1b263b] ' >
           <div className='w-96' >
            <AuthForm type='login' />
           </div>
        </div>
    </HomeLayout>
  )
}

export default SignInPage