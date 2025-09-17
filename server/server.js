import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js';
import db from './config/mongodb.js'
import cookieParser from 'cookie-parser';


dotenv.config({path : './.env'})
const whitelist = ['http://localhost:5173']; 

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // If the origin is in the whitelist, or if the origin is not defined (for same-origin requests or non-browser clients), allow it.
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // This is crucial for allowing cookies and authentication headers
};
const app = express()
const port = process.env.PORT 



app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/user-details", userRouter)

app.get('/', (req,res)=>{
    
    res.end("hellloo")
})
try{
    db()
    console.log("Connected to db")
}catch(error){
    console.log(error)
}
app.listen(port,(res)=>{
 console.log("server is running on", port)
})