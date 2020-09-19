const mongoConnection = require("mongoose")
mongoConnection.connect("mongodb://localhost:27017/indiamart", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log("Db connected")
    } else {
        console.log("Error while connectin db")
    }
})

//const u=require("./userData.model")
const indiaMartModel = require("./users.model")