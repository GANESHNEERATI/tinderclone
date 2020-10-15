
import jwt from 'jsonwebtoken'
import UserModel from '../Models/User.js'
const auth=(req,res,next)=>{

    const{authorization}=req.headers
   //if  acces does not have token
    if(!authorization)
    {

       return  res.status(401).json({error:"you must logged in first"})

    }
  //if user have token
    const token=authorization.replace("Bearer","")
    //verify token that given to use

    jwt.verify(token,process.env.SEC_KEY,(err,payload)=>{

        if(err)
        {
         return    res.status(401).json({err:"you must have a valid token"})
        }

        const {_id}=payload
        UserModel.findById(_id).then(userdata =>{

            req.user=userdata
            next()
            
        })
        
        

    })
  
}

export default auth;