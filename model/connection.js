const mongoConnection = require("mongoose")
mongoConnection.connect("mongodb://localhost:27017/indiamart", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log("Db connected")
    } else {
        console.log("Error while connectin db")
    }
})

//const u=require("./userData.model")
const userindiaMart = require("./users.model")
const productindiaMartModel = require("./product.model")
const brandindiaMart = require("./brand.model")