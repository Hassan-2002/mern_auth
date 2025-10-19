import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AppContext } from '../context/AppContextProvider';
import { toast } from 'react-toastify';
const EmailVerify = () => {
  const navigate  = useNavigate();
  const [otp, setOtp] = useState(null)
  const {backendUrl, setIsVerified} = useContext(AppContext)
  const onSubmit = async(e) =>{
    e.preventDefault()
    
    try{  
        const response = await axios.post(backendUrl + "/api/auth/verify-account", {withcredentials : true,
          enteredOtp : otp,
        } 
      )
      if(response.data.success){
        toast("Email verified");
        setIsVerified(true);
        navigate('/')
        return
      } else {   
        toast(response.data.message || "Verification failed");
      }
    
    }catch(error){
      console.log(error.message);
      toast(error.response?.data?.message || "Verification failed");
    }
      

  }
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm-px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
     <img src={assets.logo} 
           onClick={()=>navigate('/')}
           alt=""
           className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
           />

    <div className='bg-slate-900 p-10 rounded-lg shadow-large w-full sm:w-96 text-indigo-300 text-sm'>
      <h1 className='text-center text-xl text-white'>Enter OTP</h1>

       <form action="post" onSubmit={onSubmit}>
         <input type="number" name="" id="" onChange={(e)=>setOtp(e.target.value)} className='text-wrap:none'/>
         <button className=''>Submit</button>
       </form>
    
    </div>
     
    </div>
  )
}

export default EmailVerify
