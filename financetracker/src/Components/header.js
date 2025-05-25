import React from 'react'
import logo from '../assets/logo.png'

function Header() {
  return (
    <div className='flex justify-between font-inter p-4 sticky top-0 left-0 items-center bg-white shadow-md'>
        <div className='flex items-center space-x-2 p-1 pl-2'>
            <img src={logo} className='w-auto h-8' alt='logo'/>
            <h2 className='font-bold tracking-wide text-black'>MoneyMate</h2>
        </div>
        <div className='text-black- p-1'>
            <button className='font-bold'>Logout</button>
        </div>
    </div>
  )
}

export default Header