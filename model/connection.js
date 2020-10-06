const mongoConnection = require("mongoose")
mongoConnection.connect("mongodb://localhost:27017/indiamart", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log("Db connected")
    } else {
        console.log("Error while connecting db")
    }
})


const userindiaMart = require("./users.model")
const mobileindiaMart = require("./product.model")
const brandindiaMart = require("./brand.model")