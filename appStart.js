const mongoose=require("./model/connection")
const express=require("express")
const handlebars=require("express-handlebars")
const path=require("path")
const bodyparser=require("body-parser")
const userController=require("./controllers/userData.controller")
const anotherController=require("./controllers/userAddAnother.controller")
const userAuthController=require("./controllers/loginregister.controller")

const app=express()


app.set("view engine","hbs")

app.engine("hbs",handlebars({
    extname:".hbs",
    defaultLayout:"mainlayout",
    layoutsDir:__dirname+"/views/layouts",
    helpers: require("./views/custom-helpers/mobilemart.helper").helpers,
    //helpers: require("./views/custom-helpers/mobilemart2.helper").helpers,   **adding two helper file
    

   
}));



app.set("/",path.join(__dirname,"/views"))


app.get("/",(req,res)=>{
    res.render("index.hbs",{});
});


app.use("/bootstrap",express.static(__dirname+"/node_modules/bootstrap/dist"))

app.use(express.static('public')); 

app.use(bodyparser.urlencoded({
    extended:true
}))

app.get("/addUsers",(req,res)=>{
    res.render("addUsers",{})
})

app.use("/users",userController)

app.use("/appiee",anotherController)

app.use("/user",userAuthController)



app.listen("3000",()=>{
    console.log("Server Started")
});