const express=require("express")
const mongoose=require("mongoose")
const router=express.Router();

const userModel=mongoose.model("users");


router.get("/showKiran",(req,res)=>{
    userModel.find({'userName':'Kiran Poojary'},'userName userId userType',(err,docs)=>{
        if(!err)
        {
            res.render("allUsers",{data: docs})
        }else{
            res.send("error")
        }
    }).lean();
    
})


router.get("/showAll",(req,res)=>{
    userModel.find({},(err,docs)=>{
        if(!err)
        {
            res.render("allUsers",{data: docs})
        }else{
            res.send("error")
        }
    }).lean();
    
})




router.get("/add",(req,res)=>{
    res.render("addUsers",{});
})


router.post("/add",(req,res)=>{
    var user=new userModel();
    user.userName=req.body.userName;
    user.userId=req.body.userId;
    user.password=req.body.userPassword;
    user.userType=req.body.userType;
    user.save((err,docs)=>{

        if(!err)
        {
            res.redirect("/users/showAll")

        }
        else{
            console.log("Error whileadding user")

        }
    });
})

module.exports=router;