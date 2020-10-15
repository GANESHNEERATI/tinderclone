import express from 'express';
import mongoose from 'mongoose';

import Cors from 'cors';
import dotenv from 'dotenv'

import SignUp from './Routes/SignUp.js'
import Posts from './Posts.js'

//App Config
dotenv.config();
const app=express();
const port=process.env.PORT || 8001;
//const dbConnect="mongodb+srv://admin:J1vXj24K3V0lynBE@cluster0.h93yd.mongodb.net/tender-clone1?retryWrites=true&w=majority";


//Middlewares

app.use(express.json())
app.use(Cors())

//DB config

mongoose.connect(process.env.DB_CONNECT,{
  useNewUrlParser:true,
  useUnifiedTopology: true
 

},
()=>console.log("connected to db")
)


//Router Middleware

app.use('/api/',SignUp)
app.use('/posts/',Posts)


//API Endpoints

app.get('/',(req,res)=>res.status(200).send("Hello clever programers"));



//Listeners

app.listen(port,()=>{
    console.log(`listing on localhost${port}`)
})