const { sleep } = require("deasync");
const deasync = require("deasync");
const express = require("express");
const router = express.Router();
const formidable = require("formidable");
var fs = require("fs");
const mongoose = require("mongoose")
const path = require("path")
const multer = require("multer");
const { use } = require("./loginregister.controller");
mongoose.set('useFindAndModify', false);
const mobileModel = new mongoose.model("mobiles")
const brandModel = new mongoose.model("brands")
var mobile = new mobileModel()

router.get("/", (req, res) => {
  res.render("admin/indexAdmin", { title: "Add Product", saved: false, notSaved: false })

});


router.post('/', (req, res) => {
  var cat, brand, model
  var allDis = []
  var colorArray = []
  var imgFileName
  var imageCount = 0
  var savePath
  var rootFolder


  var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      cat = req.body.cat
      brand = req.body.brand
      model = req.body.model
      console.log("catbrand " + cat + brand);
      modelDirName = model.split(" ").join("")
      rootFolder = require("path").resolve(__dirname, "..");
      savePath = rootFolder + "/public/images/" + cat + "/" + brand + "/" + modelDirName;
      console.log("Saveeee " + savePath);
      callback(null, savePath)
    },
    filename: function (req, file, callback) {
      ++imageCount;
      imgFileName = model.split(" ").join("")
      callback(null, imgFileName + '-' + imageCount + path.extname(file.originalname))

    }
  })


  var upload = multer({
    storage: storage
  }).any('images')
  upload(req, res, function (err) {
    if (!err) {
      mobile.mobileDetails.category = req.body.cat
      mobile.mobileDetails.brand = req.body.brand
      mobile.mobileDetails.model = req.body.model
      mobile.mobileDetails.stock = req.body.stock

      mobile.discountDetails.price = req.body.price

      temp = (req.body.dn1 != '' && req.body.dr1 != 0) ? allDis.push({ name: req.body.dn1, rate: req.body.dr1 }) : "false"
      temp = (req.body.dn2 != '' && req.body.dr2 != 0) ? allDis.push({ name: req.body.dn2, rate: req.body.dr2 }) : "false"
      temp = (req.body.dn3 != '' && req.body.dr3 != 0) ? allDis.push({ name: req.body.dn3, rate: req.body.dr3 }) : "false"
      temp = (req.body.dn4 != '' && req.body.dr4 != 0) ? allDis.push({ name: req.body.dn4, rate: req.body.dr4 }) : "false"

      mobile.discountDetails.discounts = allDis

      mobile.memoryDetails.RAM = req.body.ram
      mobile.memoryDetails.ROM = req.body.rom
      mobile.memoryDetails.expandable = req.body.expand

      mobile.cameraDetails.rear = req.body.rear
      mobile.cameraDetails.front = req.body.front

      mobile.displayDetails.disType = req.body.disType
      mobile.displayDetails.size = req.body.disSize

      mobile.batteryDetails.batType = req.body.bType
      mobile.batteryDetails.capacity = req.body.bCap

      temp = (req.body.color1 != '') ? colorArray.push(req.body.color1) : "false"
      temp = (req.body.color2 != '') ? colorArray.push(req.body.color2) : "false"
      temp = (req.body.color3 != '') ? colorArray.push(req.body.color3) : "false"
      temp = (req.body.color4 != '') ? colorArray.push(req.body.color4) : "false"



      mobile.colorDetails = colorArray

      if (req.body.availFP == "NO") {
        mobile.fingerPrintDetails.avail = "NO"
        mobile.fingerPrintDetails.position = "NO"
        mobile.fingerPrintDetails.onscreen = "NO"

      } else {
        mobile.fingerPrintDetails.avail = req.body.availFP
        mobile.fingerPrintDetails.position = req.body.fpPosition
        mobile.fingerPrintDetails.onscreen = req.body.fpOnScreen
      }

      mobile.processorDetails.name = req.body.processorName
      mobile.imageCount = imageCount

      mobileModel.findOneAndUpdate({ mobile: { mobileDetails: { category: req.body.cat, brand: req.body.brand } } }, { mobile }, { new: true, upsert: true, strict: false }, (err, docs) => {
        if (!err) {
          res.render("admin/indexAdmin", { title: "Add Product", saved: true })
        } else {
          console.log(err);
          res.render("admin/indexAdmin", { title: "Add Product", notSaved: true })
        }
      });
    }
    else {
      console.log(err);
    }
  })
});


router.get("/addBrand", (req, res) => {
  res.render("admin/addBrandModel", { title: "Add New Brand/Model" })
});



router.post("/addBrand", (req, res) => {
  var brand = new brandModel();
  var cat = req.body.cat;
  var brandName = req.body.newBrand;
  var modelName = req.body.modelName;
  var modelArray = []
  brandName = brandName.toUpperCase()
  modelName = modelName.toUpperCase()
  modelName = brandName + " " + modelName
  modelDirName = modelName.split(" ").join("")
  console.log("cat :" + cat + brandName);
  brandModel.countDocuments({ brandCategory: cat, brandName: brandName }, (err, brandCount) => {
    if (!err && brandCount == 0) {
      //if brand not exist
      modelArray.push(modelName)
      brand.brandCategory = cat
      brand.brandName = brandName
      brand.brandModels = modelArray
      brand.save((err, docs) => {
        if (!err) {
          createDir(cat, brandName, modelDirName).then(function (data) {
            res.render("admin/indexAdmin", { title: "Add Product", saved: true, notSaved: false })
          })
        } else {
          res.render("admin/indexAdmin", { title: "Add Product", saved: false, notSaved: true })
        }
      })
    } else {
      brandModel.findOneAndUpdate({ brandCategory: cat, brandName: brandName }, { $push: { brandModels: modelName } }, (err, docs) => {
        if (!err) {
          createDir(cat, brandName, modelDirName).then(function (data) {
            res.render("admin/indexAdmin", { title: "Add Product", saved: true, notSaved: false })
          })
        } else {
          res.render("admin/indexAdmin", { title: "Add Product", saved: false, notSaved: true })
        }
      })
    }
  })
})



function createDir(cat, brand, model) {
  return new Promise(function (resolve, reject) {
    var rootFolder = require("path").resolve(__dirname, "..");
    var savePath = rootFolder + "/public/images/" + cat + "/" + brand + "/" + model + "/";
    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath, { recursive: true });
      resolve(console.log("Directory Created"))
    } else {
      resolve(console.log("Directory already exist "))
    }
  })
}

module.exports = router;

