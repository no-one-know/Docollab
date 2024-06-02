const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    userId:{
        type:String,required:true,unique:true
    },
    name:{
        type:String
    },
    picture:{
        type:String
    },
    email:{
        type:String,required:true,unique:true
    },
    password:{
        type:String
    }
})

const User=new mongoose.model('User',userSchema)

module.exports=User;