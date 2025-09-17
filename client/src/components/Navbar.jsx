import React, { useContext } from 'react'
import {assets} from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContextProvider.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'

const Navbar = () => {
    const navigate = useNavigate()
    const {userData , isLoggedin , backendUrl , setUserData, setIsLoggedin , isVerified} = useContext(AppContext)
    return (
    <div className='w-full flex justify-between items-center absolute top-0 p-4 sm:p-6 sm:px-24'>
        <img src={assets.logo} alt="logo" className='w-28 sm:w-32' />
        {    isLoggedin
            ? 
            <div className='w-8 h-8 flex justify-center items-center rounded-full  bg-black text-white  relative group'>
                {userData.name[0].toUpperCase()}
                <div className='hidden absolute group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                   <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                    {!isVerified && 
                    <li 
                    onClick={()=>navigate('/email-verify')}
                    className='py-1  px-2 hover-bg-gray-200 cursor-pointer whitespace-nowrap'>
                        Verify Email 
                    </li>}
                    <li 
                    onClick={async ()=>{
                        const response =    await axios.post(`${backendUrl}/api/auth/logout`, { withCredentials: true });
                        console.log(response)
                        if (response.data.success){
                              setIsLoggedin(false);
                        setUserData(false);
                        toast('Logged out successfully')
                        navigate('/')
                        }
                        

                    }}
                    className='py-1 px-2 hover-bg-gray-200 cursor-pointer whitespace-nowrap'>Log out</li>
                   </ul>
                </div>
            </div>
             :
            <button 
                onClick={()=> navigate('/login')}
                className='flex items-center text-gray-800 gap-2 border rounded-full border-gray-500 hover:bg-gray-100 py-2 px-6 transition-all '>
                    Login
                    <img src={assets.arrow_icon} alt="" />
            </button>
        }
    </div>
  )
}

export default Navbar
