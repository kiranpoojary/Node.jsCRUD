const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:"Requiered field"
    },
    userId:{
        type:String
    },
    password:{
        type:String
    },
    userType:{
        type:String

    }
})

const usermo=mongoose.model("users",userSchema)