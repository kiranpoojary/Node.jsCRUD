const mongoConnection=require("mongoose")
mongoConnection.connect("mongodb://localhost:27017/mydb",{useNewUrlParser: true , useUnifiedTopology: true },(err)=>{
    if(!err)
    {
        console.log("Db connected")
    }else
    {
        console.log("Error while connectin db")
    }
})

const userModel=require("./userData.model")

