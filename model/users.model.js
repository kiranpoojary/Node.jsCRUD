const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        max:20,
        min:3,
        required:[true,"Please enter firstName"]

    },
    lastName:{
        type:String,
        max:20,
        required:[true,"Please enter lastName"]
    },
    email:{
        type:String,
        max:40,
        min:5,
        required:[true,"Please enter EmailID"]
    },
    mobile:{
        type:String,
        max:10,
        min:10,
        required:[true,"Please enter Mobile Number"]
    },
    password:{
        type:String,
        max:16,
        min:6,
        required:[true,"Please enter password"]
    },
    secQ:{
        type:String,
        max:40,
        required:[true,"Please enter secQ"]
    },
    secA:{
        type:String,
        max:30,
        min:3,
        required:[true,"Please enter secA"]
    }
})


const testSchema=new mongoose.Schema({
    name:String,
    pass:String
})

mongoose.model("tests",testSchema);
mongoose.model("users",userSchema);