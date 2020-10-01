const { sleep } = require("deasync");
const deasync = require("deasync");
const express = require("express");
const router = express.Router();
const formidable = require("formidable");
var fs = require("fs");
const mongoose = require("mongoose")
const path = require("path")
const multer = require("multer")
mongoose.set('useFindAndModify', false);

const productModel = new mongoose.model("products")
const brandModel = new mongoose.model("brands")
var product = new productModel()
var saveddocs

router.get("/", (req, res) => {
  brandModel.find((err, docs) => {
    if (!err) {
      res.render("admin/indexAdmin", { title: "Add Product", saved: false, notSaved: false, brands: docs })
    }
  }).lean();

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
      modelDirName = model.split(" ").join("")
      rootFolder = require("path").resolve(__dirname, "..");
      savePath = rootFolder + "/public/images/" + cat + "/" + brand + "/" + modelDirName;
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
      product.productDetails.category = req.body.cat
      product.productDetails.brand = req.body.brand
      product.productDetails.model = req.body.model
      product.productDetails.stock = req.body.stock

      product.discountDetails.price = req.body.price

      temp = (req.body.dn1 != '' && req.body.dr1 != 0) ? allDis.push({ name: req.body.dn1, rate: req.body.dr1 }) : "false"
      temp = (req.body.dn2 != '' && req.body.dr2 != 0) ? allDis.push({ name: req.body.dn2, rate: req.body.dr2 }) : "false"
      temp = (req.body.dn3 != '' && req.body.dr3 != 0) ? allDis.push({ name: req.body.dn3, rate: req.body.dr3 }) : "false"
      temp = (req.body.dn4 != '' && req.body.dr4 != 0) ? allDis.push({ name: req.body.dn4, rate: req.body.dr4 }) : "false"

      product.discountDetails.discounts = allDis

      product.memoryDetails.RAM = req.body.ram
      product.memoryDetails.ROM = req.body.rom
      product.memoryDetails.expandable = req.body.expand

      product.cameraDetails.rear = req.body.rear
      product.cameraDetails.front = req.body.front

      product.displayDetails.disType = req.body.disType
      product.displayDetails.size = req.body.disSize

      product.batteryDetails.batType = req.body.bType
      product.batteryDetails.capacity = req.body.bCap

      temp = (req.body.color1 != '') ? colorArray.push(req.body.color1) : "false"
      temp = (req.body.color2 != '') ? colorArray.push(req.body.color2) : "false"
      temp = (req.body.color3 != '') ? colorArray.push(req.body.color3) : "false"
      temp = (req.body.color4 != '') ? colorArray.push(req.body.color4) : "false"



      product.colorDetails = colorArray

      if (req.body.availFP == "NO") {
        product.fingerPrintDetails.avail = "NO"
        product.fingerPrintDetails.position = "NO"
        product.fingerPrintDetails.onscreen = "NO"

      } else {
        product.fingerPrintDetails.avail = req.body.availFP
        product.fingerPrintDetails.position = req.body.fpPosition
        product.fingerPrintDetails.onscreen = req.body.fpOnScreen
      }


      product.processorDetails.name = req.body.processorName

      product.imageCount = imageCount



      //get brand and models required in bellow render pages
      brandModel.find((err, docs) => {
        if (!err) {
          saveddocs = docs
        } else {
          console.log(err);
        }
      }).lean();

      productModel.findOneAndUpdate({ model: req.body.model }, { product }, { new: true, upsert: true, strict: false }, (err, docs) => {
        if (!err) {
          res.render("admin/indexAdmin", { title: "Add Product", saved: true, brands: saveddocs })
        } else {
          console.log(err);
          res.render("admin/indexAdmin", { title: "Add Product", notSaved: true, brands: saveddocs })
        }
      });
    }
    else {
      console.log(err);
    }
  })
});


router.get("/addBrand", (req, res) => {
  brandModel.find((err, docs) => {
    if (!err) {
      res.render("admin/addBrandModel", { title: "Add New Brand/Model", brands: docs })
    } else {
      console.log(err);
    }
  }).lean();

});



router.post("/addBrand", (req, res) => {
  var brand = new brandModel();
  var brandName = req.body.newBrand;
  var modelName = req.body.modelName;
  var modelArray = []
  brandName = brandName.toUpperCase()
  modelName = modelName.toUpperCase()
  modelName = brandName + " " + modelName
  modelDirName = modelName.split(" ").join("")
  brandModel.countDocuments({ brandName: brandName }, (err, brandCount) => {
    if (!err && brandCount == 0) {  //if brand not exist
      modelArray.push(modelName)
      brand.brandName = brandName;
      brand.brandModels = modelArray
      brand.save((err, docs) => {
        if (!err) {
          createDir(brandName, modelDirName).then(function (data) {
            brandModel.find((err, docs) => {
              if (!err) {
                res.render("admin/indexAdmin", { title: "Add Product", saved: true, notSaved: false, brands: docs })
              }
            }).lean();
          })
        } else {
          brandModel.find((err, docs) => {
            if (!err) {
              res.render("admin/indexAdmin", { title: "Add Product", saved: false, notSaved: true, brands: saveddocs })
            }
          }).lean();
        }
      })
    } else {
      brandModel.findOneAndUpdate({ brandName: brandName }, { $push: { brandModels: modelName } }, (err, docs) => {
        if (!err) {
          createDir(brandName, modelDirName).then(function (data) {
            brandModel.find((err, docs) => {
              if (!err) {
                res.render("admin/indexAdmin", { title: "Add Product", saved: true, notSaved: false, brands: docs })

              }
            }).lean();
          })
        } else {
          brandModel.find((err, docs) => {
            if (!err) {
              res.render("admin/indexAdmin", { title: "Add Product", saved: false, notSaved: true, brands: saveddocs })

            }
          }).lean();
        }
      })

    }

  })

})



function createDir(brand, model) {
  return new Promise(function (resolve, reject) {

    var rootFolder = require("path").resolve(__dirname, "..");
    var savePath = rootFolder + "/public/images/MOBILE/" + brand + "/" + model + "/";
    console.log(savePath);
    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath, { recursive: true });
      resolve(console.log("Now Created"))
    } else {
      resolve(console.log("already exist directory"))
    }
  })
}


module.exports = router;

