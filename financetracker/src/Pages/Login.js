import React from 'react'
import Header from '../components/Header'  // Updated import path
import Signup from '../components/Signup'  // Updated import path
import Signin from '../components/Signin'  // Updated import path
import WelcomePanel from '../components/WelcomePanel.js'  // Updated import path


function Login() {
  const [signup,setsignup]=useState(true);
  const toggle_signup = (toggle) =>{
    setsignup(toggle);
  }

  
  return (
    <div className='flex flex-col min-h-screen'>
        <Header/>
        <div className='flex flex-col p-10 flex-1 bg-primary w-full  '>
            <div className='flex flex-col md:flex-row    w-full space-x-1 flex-1 '>
                <div className='hidden ml-[50px] md:block w-full md:w-1/2 flex-grow rounded-3xl mr-8'>
                {/* This div contains information about the website(logo and details) */}
                <WelcomePanel></WelcomePanel>
                {/* <img src={home}/> */}
                </div>
                {/* <div className="hidden md:block w-px bg-black flex-grow ml-4 "></div> */}

                <div className='w-full md:w-1/2 flex-grow rounded-3xl p-5  '>
                {/* This div contains the login signup form */}
                {signup ? <Signup togglesSignUp={toggle_signup}/> :<Signin togglesignin={toggle_signup}/>}
                
                </div>

            </div>
        </div>
    </div>
  )
}

export default Login