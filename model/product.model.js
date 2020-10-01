const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productDetails: {
        category: String,
        brand: String,
        model: String,
        price: Number,
        stock: Number
    },
    discountDetails: {
        price: Number,
        discounts: [{ name: String, rate: Number }]
    },
    memoryDetails: {
        RAM: String,
        ROM: String,
        expandable: String
    },
    cameraDetails: {
        rear: String,
        front: String
    },
    displayDetails: {
        disType: String,
        size: String
    },
    batteryDetails: {
        batType: String,
        capacity: String
    },
    colorDetails: Array
    ,
    fingerPrintDetails: {
        avail: String,
        position: String,
        onscreen: String

    },
    processorDetails: {
        name: String,
    },
    imageCount: Number
})

mongoose.model("products", productSchema)