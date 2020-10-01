const express = require("express")
const router = express.Router();

const mongoose = require("mongoose")
const brandModel = mongoose.model("brands")





router.get("/", (req, res) => {
    console.log("IN GET");

    brandModel.find({}, (err, docs) => {
        if (!err) {
            res.render("../views/admin/", { brands: docs })
        } else {
            console.log(err);
            res.render("../views/admin/")
        }
    }).lean();
})




router.post("/search", (req, res) => {
    var inputBrand = req.query.brand
    var data = []
    var data2 = []
    var model

    brandModel.find({ brandName: inputBrand }, { _id: 0, brandModels: 1 }, (err, docs) => {
        if (!err) {
            docs.forEach(element => {
                element.brandModels.forEach(modelName => {
                    console.log("pushed " + modelName);
                    data.push(modelName)
                })
                console.log(data);
            });
            res.end(JSON.stringify(data));

        } else {

            console.log(err);
        }
    })

})






// router.get("/search", (req, res) => {
//     console.log("IN GET Search");

//     var data = []
//     for (i = 0; i < 7; i++) {
//         data.push(i);
//     }
//     res.end(JSON.stringify(data));

// })


module.exports = router