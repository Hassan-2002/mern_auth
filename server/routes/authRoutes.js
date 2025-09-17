import express from 'express';
import { login, logout, register, sendVerifyOtp, verifyEmail, resetPassword, verifyResetOtp } from '../controllers/authController.js';
import  userAuth  from '../middleware/userAuth.js';

const authRoutes = express.Router();


authRoutes.post('/login', login);
authRoutes.post('/register', register);
authRoutes.post('/logout' , logout)
authRoutes.post('/send-otp', userAuth, sendVerifyOtp);
authRoutes.post('/verify-account', userAuth, verifyEmail)
authRoutes.post('/reset-password-otp', resetPassword)
authRoutes.post('/reset-password', verifyResetOtp)
export default authRoutes;