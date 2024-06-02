const mongoose=require('mongoose')
const db='Docshare'

// connect ot database
const connectDb=()=>{
    return mongoose.connect(`mongodb://0.0.0.0:27017/${db}`,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("Connected to mongondb")
    })
    .catch((error)=>{
        console.log("Failed to connect Mongodb",error)
    })
}

module.exports=connectDb;
