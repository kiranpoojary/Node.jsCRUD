const { sleep } = require("deasync");
const deasync = require("deasync");
const express = require("express");
const router = express.Router();
const formidable = require("formidable");
var fs = require("fs");
const path = require("path")
const { resolve } = require("path");



var form

router.get("/", (req, res) => {
  console.log("hoo");
});


router.post("/", (req, res) => {

  var brand
  var model
  var savePath
  var rootFolder = require("path").resolve(__dirname, "..");
  form = new formidable.IncomingForm().parse(req);
  form.on('fileBegin', function (name, file) {
    file.path = "C:/Users/KIRAN/Desktop/Node.jsCRUD/public/images/temp/" + file.name;
  });

  form.parse(req, deasync(function (err, fields, files) {
    brand = fields.brand
    model = fields.model
    console.log(model);
    savePath = rootFolder + "/public/images/" + brand + "/" + model + "/";
    console.log(savePath + "    " + __dirname);


    fs.copyFileSync(__dirname, savePath);
    // createDir(savePath).then(function (data) {
    //   if (fs.existsSync(savePath)) {
    //     console.log(savePath + " exist");
    //   }
    //   console.log("Save Path is " + savePath);
    //   console.log("save file is remaining")

    //   form.parse(req);
    //   form.on('fileBegin', function (name, file) {
    //     file.path = "C:/Users/KIRAN/Desktop/Node.jsCRUD/public/images/Apple/K6 Power/" + file.name;
    //   });




    //   console.log("file saved");
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


module.exports = router;