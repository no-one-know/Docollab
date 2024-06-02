const express=require("express")
const cors=require("cors")
const {v4:uuidv4}=require('uuid')
const { OAuth2Client }=require('google-auth-library');
const venv=require("dotenv")
const connectDb=require("./Dbconnection")
const bcrypt=require('bcrypt')
const app=express()
const oauth2Client=new OAuth2Client(process.env.CLIENTID,process.env.CLIENTSECRET)
const User=require('./models/User')
app.use(express.json())
app.use(cors())
venv.config()

const findUserbyEmail=async (email)=>{
    try{
        const user= await User.findOne({email:email})
        if(user){
            return user
        }
        else{
            return undefined
        }
    }
    catch(error){
        console.log(error)
        return undefined
    }
}

const createNewUser=async (payload)=>{
    try{
        const newUser= new User({
            userId:uuidv4(),
            email:payload.email,
            picture:payload.picture,
            name:payload.name
        })
        const savedUser=await newUser.save()
        console.log("User info saved success fully")
        return savedUser
    }
    catch(error){
        console.log(error)
        return undefined
    }
}

app.post("/api/v.0.0/oauth/callback",async (req,res)=>{
    try{
        const accessToken=req.body.data.accessToken
        const ticket=await oauth2Client.verifyIdToken({
            idToken:accessToken,
            audience:process.env.CLIENTID
        })
        const payload=ticket.getPayload()
        console.log(payload)
        user=await findUserbyEmail(payload.email)
        if(user===undefined){
            user=await createNewUser(payload)
        }
        if(user===undefined){
            return res.send({
                "message":"Error saving user details",
                "userDetails":{}
            })
        }
        return res.send({
            "message":"request processed successfully",
            "userDetails":{
                "name":payload.name,
                "email":payload.email,
                "picture":payload.picture
            }
        })
    }
    catch(error){
        console.log(error)
        res.send({
            "message":"error occured while parsing the access token",
            "error":`${error}`
        })
    }
})

app.post("/api/v.0.0/signin",(req,res)=>{
    try{
        email=req.body.data.email
        password=req.body.data.password
        // check if there exist already a email 
        doc=client.db(databases.docShare).collection(collections.user).find({'email':email})
        console.log(doc)
        if(doc) return res.send({
            "message":"user already exist with this email please login or user another email"
        })
        return res.send(req.body)
    }
    catch(error){
        res.send({
            'message':"error occured while signUp",
            "error":`${error}`
        })
    }
})

app.post("/api/v.0.0/signup",(req,res)=>{
    try{
        body=req.body
        email=body.email
        // check if there exist already a email 
        doc=client.db(databases.docShare).collection(collections.user).find({'email':email})
        console.log(doc)
        if(doc) return res.send({
            "message":"user already exist with this email please login or user another email"
        })
        return res.send(req.body)
    }
    catch(error){
        res.send({
            'message':"error occured while signUp",
            "error":`${error}`
        })
    }
})

const port=process.env.PORT||3000
app.listen(port,async ()=>{
    console.log("App is running on port ", port)
    try{
        console.log("Connecting to mongodb")
        await connectDb
        console.log("Connection successful")
    }
    catch(error){
        console.log("Error Occured ",error)
        process.exit(1)
    }
})