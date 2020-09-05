const express=require("express")
const mongoose=require("mongoose")
const router=express.Router();

const userModel=mongoose.model("users");

router.get("/",(req,res)=>{
    userModel.find({'userName':'Ramodaya'},'userName userId password userType',(err,docs)=>{
        if(!err)
        {
            res.render("allUsers",{data: docs})
        }else{
            res.send("error")
        }
    }).lean();
    
})

module.exports=router;