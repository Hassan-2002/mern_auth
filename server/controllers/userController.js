import userModel from '../models/userModel.js';


export const getUserData= async(req,res )=>{
    try{
        const userId = req.userId
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(401).json({success : false, message : 'user not found'})
        }

        res.status(200).json({
            success : true,
            userData : {
                name : user.name,
                isAccountVerified : user.isAccountVerified,
            }
        })


    }catch(error){
        res.status(400).json({success : false, message : error.message })
    }
}