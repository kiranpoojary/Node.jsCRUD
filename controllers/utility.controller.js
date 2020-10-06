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




router.post("/searchBrands", (req, res) => {
    var inputCat = req.query.cat
    var placeHolder = req.query.needPlaceholder
    var data = []
    console.log(placeHolder);

    if (placeHolder) {
        data.push("Select A Brand")
    } else {
        data.push("Select existing Brand/add New")
        data.push("Add New Brand")
    }


    brandModel.find({ brandCategory: inputCat }, { _id: 0, brandName: 1 }, (err, docs) => {
        if (!err) {
            docs.forEach(br => {
                data.push(br.brandName);
            })
            res.end(JSON.stringify(data));
        } else {
            console.log(err);
        }
    })

})




router.post("/searchModel", (req, res) => {

    var inputBrand = req.query.brand
    var inputCat = req.query.category
    console.log(inputBrand + inputCat);
    var data = []
    brandModel.find({ brandCategory: inputCat, brandName: inputBrand }, { _id: 0, brandModels: 1 }, (err, docs) => {
        if (!err) {
            docs.forEach(element => {
                element.brandModels.forEach(modelName => {
                    data.push(modelName)
                })
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