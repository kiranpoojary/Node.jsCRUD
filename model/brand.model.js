const mongoose = require("mongoose")

const brandSchema = new mongoose.Schema({

    brandName: String,
    brandModels: Array


})

const brand = mongoose.model("brands", brandSchema)
