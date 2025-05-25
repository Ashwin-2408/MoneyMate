import React from 'react'
import Header from '../Components/Header.js'
import Signup from '../Components/Signup.js'
import home from "../assets/home.png"
function Login() {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header/>
        <div className='flex flex-col p-10 flex-1 bg-primary w-full '>
            <div className='flex   w-full space-x-1 flex-1'>
                <div className=' w-1/2 flex-grow rounded-3xl mr-8'>
                {/* This div contains information about the website(logo and details) */}
                {/* <img src={home}/> */}
                </div>
                <div className="w-px bg-gray-400 flex-grow ml-4"></div>

                <div className=' w-1/2 flex-grow rounded-3xl p-5'>
                {/* This div contains the login signup form */}
                <Signup/>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Login