import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodeMailer.js';

export const register = async (req,res) => {
    const {name, email, password} = req?.body;
    console.log(name, email ,password)
    if (!name || !email || !password ){
            
        return res.json({succes:false, message : 'missing details'}) 
    }
    try{
        const existingUser = await userModel.findOne({email}) 
        if (existingUser){
           return res.status(401).json({success:false, message: 'email already exists'})
        }
        const hashedPassword = await bcrypt.hash(password, 15)
        const user = new userModel({
            name : name,
            email : email,
            password : hashedPassword
        })
        await user.save()
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : '7d'})
        res.cookie('token',token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 24 * 1000
        })
        const mailOptions = {
            from : 'abdullahibrahimhassan123@gmail.com',
            to : 'abdullah.softwaredev@gmail.com',
            subject : 'Welcome to mern auth',
            text : `Welcome to the website. Your account has been created using the email ${req.body.email}`
        }
       transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});

        return res.status(200).json({success : true, message : 'Successfully created user'})

    }catch(error){
            return res.status(401).json({success: false, message : error})
    }
    
};

export const login =  async(req,res) =>{
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(404).json({success: false, message : 'details missing'})
    }
    try{
        const user = await userModel.findOne({email : email})
        if(!user){
            return res.status(404).json({success: false, message : 'no email found'})

        }
        const isPasswordValid = await bcrypt.compare(password, user.password)     
        if(!isPasswordValid){
            return res.status(401).json({success: false,message : 'incorrect password'})
         }
        const token = jwt.sign({id : user._id},process.env.JWT_SECRET, { expiresIn : '7d'})
        res.cookie('token',token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({success: true, message : 'login successful'})
    }catch(error){
        res.status(400).json({message : error.message})
    }
};

export const logout = async(req, res) => {
     try{
        console.log("logout endpoint is hit")
        res.clearCookie('token', {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })
        return res.status(200).json({success : true , message : "Logged Out "})
     }catch(error){
        return res.status(402).json({succes:false, message : "Could not log out"})
     }
}

export const sendVerifyOtp = async (req, res) => {
    try {
        const  userId  = req.userId;
        
        console.log(`${userId} - this is the user's ID in the controller`);

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: 'User already verified' });
        }

        const otp = String(Math.floor(10000 + Math.random() * 90000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        await user.save();

        const mailOptions = {
            from: 'abdullahibrahimhassan123@gmail.com',
            to: 'abdullah.softwaredev@gmail.com',
            subject: 'Account verification OTP',
            text: `Your OTP for registration is ${otp}`,
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return res.status(500).json({ success: false, message: `Failed to send OTP: ${error.message}` });
            } else {
                return res.status(200).json({ success: true, message: 'OTP sent successfully' });
            }
        });
    } catch (error) {
        console.error('Error in sendVerifyOtp:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const verifyEmail = async (req,res) =>{
   try{ 
        const userId = req.userId;
        const {enteredOtp} = req.body;
        const user = await userModel.findById(userId)
        if(!userId || !enteredOtp){
                    res.status(418).json({success : false, message : 'Details missing'})
        }
        if(enteredOtp !== user.verifyOtp){
             return res.status(401).json({status : false, message : 'Invalid otp'})
    
        }
    
   
        if (Date.now() > user.verifyOtpExpireAt){
        return res.status(408).json({status : false, message : 'OTP expired'})
        }
        user.isAccountVerified = true
        user.save()
        return res.status(200).json({success : true , message : 'Email verified'})    
  
    }catch(error){
   
    }
}

export const resetPassword = async(req,res) => {
     try{
        const {email} = req.body
        const user = await userModel.findOne({email})
        if(!user){
                return res.status(401).json({success : false, message : 'user not found'})
        }
        const otp = String(Math.floor(10000 + Math.random() * 90000));
        
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 24*60*60*1000;
        
        await user.save();
    

        const mailOptions = {
            from  : 'abdullahibrahimhassan123@gmail.com',
            to : 'abdullah.softwaredev@gmail.com',
            subject : 'Password Rest OTP',
            text : `OTP for password reset  ${otp} 
            Please do not share this otp with anyone
            `}

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return res.status(500).json({ success: false, message: `Failed to send OTP: ${error.message}` });
            } else {
                return res.status(200).json({ success: true, message: 'OTP sent successfully' });
            }
        });
    }catch(error){
        
        return res.status(401).json({success : false, message : 'error', err : error.message})

    }
}


export const verifyResetOtp = async(req,res) =>{
    const {email, otp, newPassword } = req.body
    if(!email || !otp || !newPassword) {
        return res.status(400).json({success : false, message : 'Invalid request'})
    }
    try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).json({success : false , message : 'User not found'});

        }
        if(user.resetOtp !== String(otp) || user.resetOtp === ''){
            return res.status(400).json({success : false , message : 'Invalid otp'})
        }
        
        else{
            if(user.resetOtpExpireAt < Date.now())
            {
                return res.status(400).json({success : false, message : 'otp expired'})
            }
            const hashedPassword = bcrypt.hash(password ,15)
            user.password = hashedPassword
            user.resetOtp = '';
            user.resetOtpExpireAt = 0;
            await user.save();
            res.status(200).json({success : true, message : 'password reset successfully'})

        }
    }catch(error){
        res.status(400).json({succes : false, message : error.message})
    }
}