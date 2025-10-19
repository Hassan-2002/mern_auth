import { useEffect, useState, useCallback } from "react";
import { AppContext } from "./AppContextProvider";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContextProvider = (props) =>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(null)
    const [isVerified, setIsVerified] = useState(false)
    
    
    const getUserData = useCallback(async () =>{
        try{
            const response = await axios.get(backendUrl+ '/user-details', {withCredentials : true})
            response.data ? setIsLoggedin(true) : setIsLoggedin(false);
            response.data.isVerified ? setIsVerified(true) : setIsVerified(false)
            response.data.success ? setUserData(response.data.userData) : toast.error(response.message)
            
        }catch{
            console.log("no user data")
        }
        
    }, [backendUrl]);
    useEffect(()=>{
          getUserData()
    },[getUserData])
    const value ={
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    isVerified,
    setIsVerified,
   }
    return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
   )


}