import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';


//App Config

const dbConnect="mongodb+srv://ganeshnodejs:Akki1995@cluster0.lywnu.mongodb.net/tender_clone?retryWrites=true&w=majority";



const app=express();
const port=process.env.PORT || 8001;

//Middlewares

app.use(express.json())
app.use(Cors())

//DB config

mongoose.connect(dbConnect,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true

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