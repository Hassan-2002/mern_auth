import React from 'react'
import { assets } from '../assets/assets'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContextProvider'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
   const {backendUrl , setIsLoggedin , getUserData} = useContext(AppContext)
    const navigate = useNavigate()
   const [state, setState] = useState('Login')
   const [name, setName] = useState('')
   const [email ,  setEmail] = useState('')
   const [passsword , setPassword] = useState('')
   const onSubmitHandler = async (e, error) =>{
   
   try{
     e.preventDefault();
     if(state === 'Sign up'){
        axios.defaults.withCredentials = true    
        const {data} = await axios.post(backendUrl + '/api/auth/register' , {
            name : name,
            email : email,
            password : passsword,
           })
        if(data.success){
            setIsLoggedin(true);
            
            toast("User registered successfully")
            await getUserData()
            navigate('/')
        }else{
            toast.error(error.message)
        }
     }else{
            axios.defaults.withCredentials = true    
        const {data} = await axios.post(backendUrl + '/api/auth/login' , {
            email : email,
            password : passsword,
           })
        if(data.success){
            setIsLoggedin(true);
            toast("Logged in")
            await getUserData()
            navigate('/')
        }else{
            toast.error(data.message)
        }
     }
   }catch(data){
     toast.error(data.message)
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
        <h2 className='text-3xl text-center font-semibold text-white mb-4'>
            {state === 'Sign up' ? 'Create Account' : 'Login'}

        </h2>
        <p className='text-center text-sm mb-6'>
            {state === 'Sign up' ? 'Create your account' : 'Login to your account'}

        </p>

        <form onSubmit={onSubmitHandler}>
            {state === 'Sign up' &&
            <div className='flex items-center gap-3 w-full mb-4 px-5 py-2.5 bg-[#333A5C] rounded-full'>
                <img src={assets.person_icon} alt="" />
                <input 
                    onChange={e => setName(e.target.value)} 
                    type="text" placeholder='Full Name' required
                    className='bg-transparent outline-none'
                />
            </div>
            }
            
            <div className='flex items-center gap-3 w-full mb-4 px-5 py-2.5 bg-[#333A5C] rounded-full'>
                <img src={assets.mail_icon} alt="" />
                <input type="email" 
                onChange={e => setEmail(e.target.value)} 

                placeholder='email' required
                className='bg-transparent outline-none'
                />
            </div>
            <div className='flex items-center gap-3 w-full mb-4 px-5 py-2.5 bg-[#333A5C] rounded-full'>
                <img src={assets.lock_icon} alt="" />
                <input type="password" 
                onChange={e => setPassword(e.target.value)}
                placeholder='Password' required
                className='bg-transparent outline-none'
                />
            </div>
            {state === 'Login' &&  <p onClick={()=> navigate('/reset-password')} className='hover:text-blue-500 cursor-pointer mb-4'>Forgot password?</p>}

            <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>
                {state}
            </button>
        </form>



        {   state === 'Sign up' ? 
            <p className='text-gray-400 text-center  text-xs mt-4'
               onClick={()=>{setState('Login')}}
            >
                Already have an account?{' '} 
                <span className='text-blue-400  hover:cursor-pointer underline'>
                    Login here
                </span>
            </p>
            :
            <p className='text-gray-400 text-center  text-xs mt-4'
                onClick={()=>{setState('Sign up')}}
            >
                Dont have an account?{' '} 
                <span className='text-blue-400 hover:cursor-pointer underline'>
                    Sign up here
                </span>
            </p>
        }
        
      
      </div>
    </div>
  )
}

export default Login
