//Hathway   1171953375

//IBM Talent Hunt
https://www.google.com/url?q=https://u8676524.ct.sendgrid.net/ls/click?upn%3DrR57OuuzpFmyvCwaZ-2BNNfaZBSjEPVhodB5U6KyophwOeikaXV61MCea1IPrkyKPcvOGVyrVffro7F8CaSwcxU-2FG32kBdcku9oWiLBiWSFx1WrdZnKZLI3tITMkrEtKqrl4V6wvj95y6ohaOgtYs1GCmd1NAzwI1n5sNUF-2FE16FfNVKQjnUKq6qpLDVmzb1sF1cfhpvJ-2BaLGAkmLc3ov1jNaBaLrgDR88Wop-2BxL8ILJ67WaliToW4xiRiP0qLXRG5qiQz_fYSCb2FMPruQ8WQ-2FBCkp9k1O8MoceibnoYLX0KVdivC8IY3EFbYcO9HzDF-2FIH59fbM5S4F-2BqV91de49pPaE20u0ccTqgOq2Bo503YNAI4MlVLdGejgIGh0Wktw3oRaKVZzQgNjUO9XzVfiH9wrGTXHsP-2F-2BrkQBXBqCTIEt6N2TFswPxJ50nPYv8eDMlW3O22UND9EVVnRMMjkIGRIa0GEuR9GmcZbe162yAexMfqt90-2BQOwEn1Gf-2F1SGvNtN2lbDcYZTXaO3GWB10LCcCXfV5jrK62hCu2Fxd02U9VveC-2B6pRvvnYiaODgpkP6QG1NdvB8NNSnASzekSOyQ1RF2IbXnfA69-2BVDk-2B7RPIANYqfm372nYVmChgOm4QKblHkOGugH8dcY0jJHK9JgKt1tTXJVBWjrBqWAJ5aFozNalIaXQ-3D&source=gmail&ust=1600259170270000&usg=AFQjCNHQ_Hh_LBnjUQFioSneMYlIxQ1Kpw




const express = require("express");
const router = express.Router();
const formidable = require("formidable");
var fs = require("fs");

router.get("/", (req, res) => {
    console.log("hoo");
});


router.post("/", (req, res) => {

    var brand
    var savePath;
    console.log(req.body);
    new formidable.IncomingForm().parse(req)


        .on('field', (name, value) => {
            if (name == "brand") {
                brand = value;
                var rootFolder = require("path").resolve(__dirname, "..");
                savePath = rootFolder + "/public/images/" + brand + "/";
                if (!fs.existsSync(savePath)) {
                    fs.mkdirSync(savePath);
                }
            } else {
                //not brand attribute
            }
        })

    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on("fileBegin", function (fields, file) {
        file.path = savePath + file.name;
        console.log(savePath);
    });

});


module.exports = router;







//switch
switch (name) {
    case "cat":
        category = value
        product.productDetails.category = value
        break;
    case "brand":
        brand = value
        product.productDetails.brand = value;
        break;
    case "model":
        model = value
        product.productDetails.model = value;
        break;
    case "price":
        product.discountDetails.price = value;
        break;
    case "dn1":
        disName1 = value;
        break;
    case "dr1":
        disRate1 = value;
        temp = (disName1 != '' && disRate1 != 0) ? allDis.push({ name: disName1, rate: disRate1 }) : false;
        break;
    case "dn2":
        disName2 = value;
        break;
    case "dr2":
        disRate1 = value;
        temp = (disName2 != '' && disRate2 != 0) ? allDis.push({ name: disName2, rate: disRate2 }) : false;
        break;
    case "dn3":
        disName3 = value;
        break;
    case "dr3":
        disRate3 = value;
        temp = (disName3 != '' && disRate3 != 0) ? allDis.push({ name: disName3, rate: disRate3 }) : false;
        break;

    case "dn4":
        disName4 = value;
        break;
    case "dr4":
        disRate4 = value;
        temp = (disName4 != '' && disRate4 != 0) ? allDis.push({ name: disName4, rate: disRate4 }) : false;
        break;
    case "ram":
        product.memoryDetails.RAM = value;
        break;
    case "rom":
        product.memoryDetails.ROM = value;
        break;
    case "expand":
        product.memoryDetails.expand = value;
        break;

    case "rear":
        product.cameraDetails.rear = value;
        break;
    case "front":
        product.cameraDetails.front = value;
        break;
    case "disType":
        product.displayDetails.disType = value;
        break;
    case "disSize":
        product.cameraDetails.seze = value;
        break;
    case "bType":
        product.batteryDetails.batType = value;
        break;
    case "bCap":
        product.batteryDetails.capacity = value;
        break;
    case "color1":
        temp = (value != '') ? colorArray.push(value) : "false"
        break;
    case "color2":
        temp = (value != '') ? colorArray.push(value) : "false"
        break;
    case "color3":
        temp = (value != '') ? colorArray.push(value) : "false"
        break;
    case "color4":
        temp = (value != '') ? colorArray.push(value) : "false"
        break;
    case "availFP":
        product.fingerPrintDetails.avail = value
        break;
    case "fpPosition":
        product.fingerPrintDetails.position = value
        break;
    case "fpOnScreen":
        product.fingerPrintDetails.onscreen = value
        break;

    case "processorName":
        product.processorDetails.name = value
        break;

}













const express = require("express");
const router = express.Router();
const formidable = require("formidable");
var fs = require("fs");

router.get("/", (req, res) => {
    console.log("hoo");
});


router.post("/", (req, res) => {
    var formData = new formidable.IncomingForm();
    formData.parse(req, function (err, fields, files) {
        console.log(fields.brand);
    })


});


module.exports = router;















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








//add product post

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
    var processorName
    var savePath
    var rootFolder
    var form = new formidable.IncomingForm(req);

    form.parse(req, deasync(function (err, fields, files) {
        form.on("fileBegin", function (fields, file) {
            file.path = __dirname + file.name;
            console.log("ssss");
        });

        cat = fields.cat
        brand = fields.brand
        model = fields.model

        rootFolder = require("path").resolve(__dirname, "..");
        savePath = rootFolder + "/public/images/" + brand + "/" + model + "/ ";
        console.log(savePath);





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


        //get brand and models required in bellow render pages
        brandModel.find((err, docs) => {
            if (!err) {
                saveddocs = docs
            }
        }).lean();

        product.save((err, docs) => {
            if (!err) {
                res.render("admin/indexAdmin", { title: "Add Product", saved: true, brands: saveddocs })

            } else {
                res.render("admin/indexAdmin", { title: "Add Product", notSaved: true, brands: saveddocs })
            }
        });

    }))
});








//productCrud.contorller


const deasync = require("deasync");
const express = require("express");
const router = express.Router();
const formidable = require("formidable");
var fs = require("fs");
const mongoose = require("mongoose")
const { resolve } = require("path");
const { stringify } = require("querystring");

const productModel = new mongoose.model("products")
const brandModel = new mongoose.model("brands")

var saveddocs

router.get("/", (req, res) => {
    brandModel.find((err, docs) => {
        if (!err) {
            res.render("admin/indexAdmin", { title: "Add Product", saved: false, notSaved: false, brands: docs })
        }
    }).lean();

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


        //get brand and models required in bellow render pages
        brandModel.find((err, docs) => {
            if (!err) {
                saveddocs = docs
            }
        }).lean();

        product.save((err, docs) => {
            if (!err) {
                res.render("admin/indexAdmin", { title: "Add Product", saved: true, brands: saveddocs })

            } else {
                res.render("admin/indexAdmin", { title: "Add Product", notSaved: true, brands: saveddocs })
            }
        });

    }))
});




router.get("/addBrand", (req, res) => {
    brandModel.find((err, docs) => {
        if (!err) {
            res.render("admin/addBrandModel", { title: "Add New Brand/Model", brands: docs })
        }
    }).lean();

});



router.post("/addBrand", (req, res) => {
    var brandName = req.body.newBrand;
    var modelName = req.body.modelName;
    var modelArray = []
    brandName = brandName.toUpperCase()
    modelName = modelName.toUpperCase()
    modelName = brandName + " " + modelName

    brandModel.countDocuments({ brandName: brandName }, (err, brandCount) => {
        if (!err && brandCount == 0) {  //if brand not exist
            modelArray.push(modelName)
            var brand = new brandModel();
            brand.brandName = brandName;
            brand.brandModels = modelArray

            brand.save((err, docs) => {
                if (!err) {
                    console.log("Saved to db   " + docs);

                    createDir(brandName, modelName).then(function (data) {
                        console.log("created Dir");
                        brandModel.find((err, docs) => {
                            if (!err) {
                                res.render("admin/indexAdmin", { title: "Add Product", saved: true, notSaved: false, brands: docs })
                            }
                        }).lean();

                    })
                } else {
                    brandModel.find((err, docs) => {
                        if (!err) {
                            res.render("admin/indexAdmin", { title: "Add Product", saved: false, notSaved: true, brands: docs })
                        }
                    }).lean();

                }
            })
        } else {
            //add only model
        }

    })

})



function createDir(brand, model) {
    return new Promise(function (resolve, reject) {

        var rootFolder = require("path").resolve(__dirname, "..");
        var savePath = rootFolder + "/public/images/Mobiles/" + brand + "/" + model + "/";
        console.log(savePath);
        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath, { recursive: true });
            resolve(console.log("Now Created"))
        } else {
            resolve(console.log("already exist directory"))
        }
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


