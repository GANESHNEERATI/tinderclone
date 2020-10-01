import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';
import dotenv from 'dotenv'

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
 

},
()=>console.log("connected to db")
)

//API Endpoints

app.get('/',(req,res)=>res.status(200).send("Hello clever programers"));
app.post('/tinder/cards',(req,res)=>{

    const dbCard=req.body;
    Cards.create(dbCard,(err,data)=>{

        if(err)
        {

            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards',(req,res)=>{
   
    Cards.find((err,data)=>{

        if(err)
        {

            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })



})


//Listeners

app.listen(port,()=>{
    console.log(`listing on localhost${port}`)
})