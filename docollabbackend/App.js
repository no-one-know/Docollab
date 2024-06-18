const express=require("express")
const cors=require("cors")
const nodemailer=require("nodemailer")
const {v4:uuidv4}=require('uuid')
const { OAuth2Client }=require('google-auth-library');
const venv=require("dotenv")
const connectDb=require("./Dbconnection")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const WebSocket=require('ws')
const http=require('http')
const app=express()
const server=http.createServer(app)
const wss=new WebSocket.Server({server:server})
const oauth2Client=new OAuth2Client(process.env.CLIENTID,process.env.CLIENTSECRET)
const User=require('./models/User')
const port=process.env.PORT||4000
const {OpenAI}=require('openai');
const { time } = require("console");
const openai=new OpenAI({
    apiKey:process.env.OPENAI
})
app.use(express.json())
app.use(cors())
venv.config()

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      const questions=JSON.parse(message).questions
      questions.forEach(async (question,index) => {
        try{
            const response= await openai.chat.completions.create({
                messages:[{role:'user',content:question}],
                model:'gpt-3.5-turbo'
            })
            ws.send(JSON.stringify({"question":question,"answer":response.choices[0].message.content}))
        }
        catch(error){
            ws.send(JSON.stringify({"question":question,"answer":error}))
        }
      });
    });
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

const sendMail=async (email)=>{
    try{
        const transporter=nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth:{
                user:process.env.EMAIL_USER__,
                pass:process.env.EMAIL_PASS__
            }
        })
        const info=await transporter.sendMail({
            from:{
                name:"DocCollab",
                address:process.env.EMAIL_USER__,
            },
            to:email,
            subject:"Verify Email",
            html:"This is mail for testing"
        })
        return info
    }
    catch(error){
        console.log(error)
        return undefined
    }
}

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
        console.log("User info saved successfully")
        return savedUser
    }
    catch(error){
        console.log(error)
        return undefined
    }
}

const getAuthToken=(user)=>{
    try{
        const currentTime=new Date()
        const currentTimeStamp=currentTime.getTime()
        const cookiePayload={
            "name":user.name,
            "email":user.email,
            "picture":user.picture,
            "userId":user.userId,
            "createdAt":currentTimeStamp
        }
        return jwt.sign(cookiePayload,process.env.SERVERSECRET)
    }
    catch(error){
        console.log(error)
        return undefined
    }
}

const setCookie= (user)=>{
    try{
        const authToken=getAuthToken(user)
        const host="http://localhost:4000"
        return `__${host}-authToken=${authToken};SameSite=None;Secure;Path=/;Partitioned;HttpOnly;Max-Age=5184000`
    }
    catch(error){
        console.log(error)
        return undefined
    }
}

app.post("/api/v.0.0/oauth/callback",async (req,res)=>{
    try{
        const accessToken=req.body.accessToken
        const ticket=await oauth2Client.verifyIdToken({
            idToken:accessToken,
            audience:process.env.CLIENTID
        })
        const payload=ticket.getPayload()
        console.log(payload)
        let user=await findUserbyEmail(payload.email)
        if(user===undefined){
            user=await createNewUser(payload)
        }
        if(user===undefined){
            return res.send({
                "message":"Error saving user details",
                "userDetails":{}
            })
        }
        const cookie=setCookie(user)
        return res.status(200).header({
            'Set-Cookie':cookie
        }) 
        .send({
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
        res.status(500).send({
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

app.post("/api/v.0.0/signup",async (req,res)=>{
    try{
        const body=req.body
        const email=body.email
        // check if there exist already a email 
        const user= await User.findOne({'email':email})
        console.log(user)
        if(user) return res.send({
            "message":"user already exist with this email please login or user another email"
        })
        const info=await sendMail(email)
        return res.send({"info":info})
    }
    catch(error){
        res.send({
            'message':"error occured while signUp",
            "error":`${error}`
        })
    }
})

app.post("/api/v.0.0/setpassword",(req,res)=>{
    try{
        data=req.body
        password=data.password
        confirmPassword=data.confirmPassword
        if(password!=confirmPassword){
            return res.status(400).send({"message":"password and confirmPassword is not same"})
        }
        // save the password
        return res.send({
            "message":"password reset successfully, login to continue"
        })
    }
    catch(error){
        console.log(error)
        res.send({
            "message":"error occured while resetting password",
            "error":`${error}`
        })
    }
})

server.listen(port,async ()=>{
    console.log("App is running on port ", port)
    try{
        console.log("Connecting to mongodb")
        await connectDb()
        console.log("Connection successful")
    }
    catch(error){
        console.log("Error Occured ",error)
        process.exit(1)
    }
})