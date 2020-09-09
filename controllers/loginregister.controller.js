const express=require("express")
const router=express.Router();
const mongoose=require("mongoose");
const { db } = require("../model/mongoQueries.txt");
const usersModel=new mongoose.model("users");
const testModel=new mongoose.model("tests");


router.get("/login",(req,res)=>{

        console.log("page displayed")
        res.render("../views/users/registration",{"firstGet": 1 ,"title":"Login/Register"});
})


router.post("/login/logData",(req,res)=>{
    
    
    var userID=req.body.userID
    var password=req.body.password
    usersModel.countDocuments({email:userID,password: password}, function(err, c) {
        if(c==1)
        {
            res.render("../views/users/home")
        }else{
            
            res.render("../views/users/registration",{"firstGet": 0,"title":"Login/Register"})
        }
   });


    
})


router.post("/login/regData",(req,res)=>{

    const users=new usersModel();
    users.firstName=req.body.fName
    users.lastName=req.body.lName
    users.email=req.body.email
    users.mobile=req.body.mobile
    users.password=req.body.psw
    users.secQ=req.body.secQ
    users.secA=req.body.secA
    users.save((err,docs)=>{
        if(!err)
        {
            console.log("Inserted   "+docs)
        }else
        {
            console.log("Error!! Not Inserted   "+err)
        }

    })

    
   
   
    //consusers.og(fName+" "+lName+" "+email+" "+mobile+" "+password+" "+cpassword+" "+secQ+" "+secA)
    


    res.render("../views/users/registration");
})


module.exports=router;