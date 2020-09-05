const mongoose=require("./model/connection")
const express=require("express")
const handlebars=require("express-handlebars")
const path=require("path")
const bodyparser=require("body-parser")
const app=express()
const userController=require("./controllers/userData.controller")


app.set("view engine","hbs")

app.engine("hbs",handlebars({
    extname:"hbs",
    defaultLayout:"mainlayout",
    layoutsDir:__dirname+"/views/layouts"
}));

app.set("/",path.join(__dirname,"/views"))


app.get("/",(req,res)=>{
    res.render("index.hbs",{});
});


app.use(bodyparser.urlencoded({
    extended:true
}))

app.get("/addUsers",(req,res)=>{
    res.render("addUsers",{})
})

app.use("/users",userController)

app.listen("3000",()=>{
    console.log("Server Started")
});