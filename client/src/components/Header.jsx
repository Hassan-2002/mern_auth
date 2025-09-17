import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContextProvider.jsx'

const Header = () => {
   const {userData} = useContext(AppContext)
    return (
    <div className='flex flex-col items-center mt-20 px-4 text-center gap-4'>
      <img src={assets.header_img} alt=""
      className='h-36 w-36 rounded-full mb-6'
      />
      <h1 className='flex items-center gap-x-2 text-xl sm:text-3xl font-medium mb-0'>Hey {userData ? userData.name : 'Developer'}  
            <img src={assets.hand_wave} className='aspect-square w-10' alt="" />
      </h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>
        Welcome to our app
      </h2>
      <p>Lets start with a quick product tour</p>
      <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 '>Get started</button>
    </div>
  )
}

export default Header
