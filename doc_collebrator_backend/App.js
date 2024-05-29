const express=require("express")
const cors=require("cors")
const { OAuth2Client }=require('google-auth-library');
const venv=require("dotenv")
const {connect,client}=require("./Dbconnection")
const {Databases,Collections}=require('./Dbcollections')
const app=express()
const databases=new Databases()
const collections=new Collections()
const oauth2Client=new OAuth2Client(process.env.CLIENTID,process.env.CLIENTSECRET)
app.use(express.json())
app.use(cors())
venv.config()

 app.post("/api/v.0.0/oauth/callback",async (req,res)=>{
    try{
        console.log(req.body.data)
        const accessToken=req.body.data.accessToken
        const ticket=await oauth2Client.verifyIdToken({
            idToken:accessToken,
            audience:process.env.CLIENTID
        })
        const payload=ticket.getPayload()
        console.log(payload)
        return res.send({
            "message":"request received successfully"
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
    // frist try to coneect to db
    try{
        console.log("Connecting to mongodb")
        await connect()
    }
    catch(e){
        console.log("Error Occured ",e)
        process.exit(1)
    }
})