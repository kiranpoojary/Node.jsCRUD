const deasync = require("deasync");
const express = require("express");
const router = express.Router();
const formidable = require("formidable");
var fs = require("fs");
const mongoose = require("mongoose")
const { resolve } = require("path");
const { stringify } = require("querystring");

const productModel = new mongoose.model("products")

router.get("/", (req, res) => {
  res.render("admin/indexAdmin", { saved: false, notSaved: false })
});


router.post("/", (req, res) => {
  var cat, brand, model
  var price
  var allDis = []
  var disName1, disName2, disName3, disName4
  var disRate1, disRate2, disRate3, disRate4
  var ram, rom, expand
  var front, rear
  var dType, dSize
  var bType, bCapacity
  var color1, color2, color3, color4
  var colorArray = []
  var fAvail, fPositiion, fOnScreen
  var processorName, confirmed
  var savePath
  var rootFolder
  var form = new formidable.IncomingForm(req);

  form.parse(req, deasync(function (err, fields, files) {

    cat = fields.cat
    brand = fields.brand
    model = fields.model

    price = fields.price
    disName1 = fields.dn1
    disName2 = fields.dn2
    disName3 = fields.dn3
    disName4 = fields.dn4
    disRate1 = fields.dr1
    disRate2 = fields.dr2
    disRate3 = fields.dr3
    disRate4 = fields.dr4



    var dis1 = { name: disName1, rate: disRate1 };
    var dis2 = { name: disName2, rate: disRate2 };
    var dis3 = { name: disName3, rate: disRate3 };
    var dis4 = { name: disName4, rate: disRate4 };


    temp = (disName1 != '' && disRate1 != 0) ? allDis.push(dis1) : "false"
    temp = (disName2 != '' && disRate2 != 0) ? allDis.push(dis2) : "false"
    temp = (disName3 != '' && disRate3 != 0) ? allDis.push(dis3) : "false"
    temp = (disName4 != '' && disRate4 != 0) ? allDis.push(dis4) : "false"


    ram = fields.ram
    rom = fields.rom
    expand = fields.expand
    front = fields.rear
    rear = fields.front
    dType = fields.disType
    dSize = fields.disSize
    bType = fields.bType
    bCapacity = fields.bCap
    color1 = fields.color1
    color2 = fields.color2
    color3 = fields.color3
    color4 = fields.color4


    temp = (color1 != '') ? colorArray.push(color1) : "false"
    temp = (color2 != '') ? colorArray.push(color2) : "false"
    temp = (color3 != '') ? colorArray.push(color3) : "false"
    temp = (color4 != '') ? colorArray.push(color4) : "false"

    fAvail = fields.availFP
    fPositiion = fields.fpPosition
    fOnScreen = fields.fpOnScreen
    processorName = fields.processorName
    confirmed = fields.confirmed
    const product = new productModel();

    product.productDetails.category = cat;
    product.productDetails.brand = brand;
    product.productDetails.model = model;

    product.discountDetails.price = price;
    product.discountDetails.discounts = allDis

    product.memoryDetails.RAM = ram
    product.memoryDetails.ROM = rom
    product.memoryDetails.expandable = expand

    product.cameraDetails.rear = rear
    product.cameraDetails.front = front

    product.displayDetails.disType = dType
    product.displayDetails.size = dSize

    product.batteryDetails.batType = bType
    product.batteryDetails.capacity = bCapacity

    product.colorDetails = colorArray;

    product.fingerPrintDetails.avail = fAvail
    product.fingerPrintDetails.position = fPositiion
    product.fingerPrintDetails.onscreen = fOnScreen

    product.processorDetails.name = processorName

    //console.log(disName1 + disName2 + disName3 + disName4 + disRate1 + disRate2 + disRate3 + disRate4);
    // console.log(price + cat + model + brand + ram + rom + expand + front + rear + dType + dSize + bType + bCapacity + colorArray + fAvail + fPositiion + fOnScreen + processorName + confirmed);


    product.save((err, docs) => {
      if (!err) {
        console.log(docs);
        res.render("admin/indexAdmin", { saved: true })

      } else {

        res.render("admin/indexAdmin", { notSaved: true })
      }
    });





    // files.path = __dirname + files.name;
    // rootFolder = require("path").resolve(__dirname, "..");
    // savePath = rootFolder + "/public/images/" + brand + "/" + model + "/";
    // console.log(savePath);
    // createDir(savePath).then(function (data) {
    //   console.log(savePath);
    //   console.log("save file is remaining");
    //   saveFile(req, res, savePath).then(function (data) {
    //     console.log("Done saving file");
    //     console.log(model + brand);
    //   })
    // })



  }))
});



function createDir(savePath) {
  return new Promise(function (resolve, reject) {
    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath, { recursive: true });
      resolve(console.log("dir created"))
    }
    resolve(console.log("dir exist"))

  })
}



function saveFile(req, res, savePath) {
  return new Promise(function (resolve, reject) {

    //write save file snippet
    console.log("in save File Function " + savePath);
    resolve(console.log("sssss"))
  })
}

module.exports = router;








/*


//FILE Upload Pending

const deasync = require("deasync");
const express = require("express");
const router = express.Router();
const formidable = require("formidable");
var fs = require("fs");
const { resolve } = require("path");

router.get("/", (req, res) => {
  console.log("hoo");
});


router.post("/", (req, res) => {

  var brand
  var model
  var savePath
  var rootFolder
  var form = new formidable.IncomingForm(req);
  form.parse(req, deasync(function (err, fields, files) {
    brand = fields.brand
    model = fields.model
    console.log(model);
    files.path = __dirname + files.name;
    rootFolder = require("path").resolve(__dirname, "..");
    savePath = rootFolder + "/public/images/" + brand + "/" + model + "/";
    console.log(savePath);
    createDir(savePath).then(function (data) {
      console.log(savePath);
      console.log("save file is remaining");
    })
  }))
});



function createDir(savePath) {
  return new Promise(function (resolve, reject) {
    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath, { recursive: true });
      resolve(console.log("dir created"))
    }
    resolve(console.log("dir exist"))

  })
}


module.exports = router;




*/